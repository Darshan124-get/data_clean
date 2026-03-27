import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508); // Dark Cyberpunk sky
    scene.fog = new THREE.FogExp2(0x050508, 0.05); // Fog to hide the grid edge

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Camera low to the ground for dramatic perspective
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff003c, 5, 100);
    pointLight.position.set(0, 10, -10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00f0ff, 5, 100);
    pointLight2.position.set(15, 5, 10);
    scene.add(pointLight2);

    // --- Cyberpunk Grid Floor ---
    const gridGeometry = new THREE.PlaneGeometry(200, 200, 100, 100);
    
    // Displace the grid vertices to create a terrain/mountain effect
    const gridVertices = gridGeometry.attributes.position.array;
    for (let i = 0; i < gridVertices.length; i += 3) {
      // Leave the center flat, raise the edges
      const x = gridVertices[i];
      const y = gridVertices[i + 1]; // PlaneGeometry is created on XY plane, then we rotate it
      const distance = Math.sqrt(x * x + y * y);
      if (distance > 10) {
        gridVertices[i + 2] = Math.random() * (distance - 10) * 0.2; // Z is the height before rotation
      }
    }
    gridGeometry.computeVertexNormals();

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Cyber cyan
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2; // Flat on the floor
    gridMesh.position.y = -2;
    scene.add(gridMesh);

    // --- Floating Wireframe Data Blocks ---
    const shapes: THREE.Mesh[] = [];
    const blockGeo = new THREE.BoxGeometry(2, 6, 2);
    const blockMat = new THREE.MeshBasicMaterial({
      color: 0xfcee0a, // Neon Yellow
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Create random floating structures like distant cyber-city buildings
    for (let i = 0; i < 20; i++) {
      const block = new THREE.Mesh(blockGeo, blockMat);
      block.position.x = (Math.random() - 0.5) * 60;
      block.position.z = (Math.random() - 0.5) * 60 - 20;
      block.position.y = (Math.random() * 5) - 2;
      
      const scale = Math.random() * 2 + 0.5;
      block.scale.set(1, scale, 1);
      
      scene.add(block);
      shapes.push(block);
    }

    // --- Digital Rain / Cyber Particles ---
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 100; // x
      particlePositions[i * 3 + 1] = Math.random() * 50;      // y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    // Alternating colors for particles (magenta, cyan)
    const particleColors = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color(0xff003c); // magenta
    const color2 = new THREE.Color(0x00f0ff); // cyan
    for(let i = 0; i < particleCount; i++) {
        const c = Math.random() > 0.5 ? color1 : color2;
        particleColors[i*3] = c.r;
        particleColors[i*3+1] = c.g;
        particleColors[i*3+2] = c.b;
    }
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Animation Loop ---
    let animationId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.005;
      mouseY = (event.clientY - windowHalfY) * 0.005;
    };
    document.addEventListener("mousemove", onDocumentMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.002;

      // Camera react to mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (5 - mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 5, -10); // Look slightly upward toward horizon

      // Moving the grid towards the camera for an endless forward motion
      gridMesh.position.z = (time * 5) % 4; // 4 is the grid segment size roughly
      
      // Floating blocks subtle animation
      shapes.forEach((shape, i) => {
          shape.position.y += Math.sin(time * 5 + i) * 0.01;
      });

      // Digital rain falling
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
          positions[i] -= 0.1; // Fall down speed
          if (positions[i] < -2) {
              positions[i] = 50; // Reset at top
          }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      
      gridGeometry.dispose();
      gridMaterial.dispose();
      blockGeo.dispose();
      blockMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
