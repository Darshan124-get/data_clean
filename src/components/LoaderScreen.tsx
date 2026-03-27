import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("SYSTEM BOOT SEQUENCE");

  useEffect(() => {
    // Smoothly animate progress 0 -> 100 over 2.5 seconds
    const duration = 2500;
    const startTime = performance.now();
    
    const animateOptions = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Cyberpunk linear blocky progression look
      setProgress(Math.floor(t * 100));
      
      if (t < 1) {
        requestAnimationFrame(animateOptions);
      } else {
        setGlitchText("ACCESS GRANTED");
      }
    };
    
    requestAnimationFrame(animateOptions);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] text-white loader-screen scanline"
      initial={{ x: 0 }}
      exit={{ 
        x: "-100%", // Slide off screen aggressively
        transition: { duration: 0.5, ease: "anticipate" }
      }}
    >
      <div className="flex flex-col items-center w-80 relative z-10">
        <motion.div 
          className="flex justify-between w-full mb-2 font-display uppercase tracking-widest text-neon-yellow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm glitch-text" data-text={glitchText}>{glitchText}</span>
          <span className="text-sm neon-glow-cyan text-neon-cyan">V 2.0.77</span>
        </motion.div>

        {/* Cyberpunk Progress Container */}
        <div className="w-full h-8 bg-black border-2 border-neon-cyan p-1 flex relative overflow-hidden group">
          {/* Background grid slightly visible inside the loader */}
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          
          <motion.div
            className="h-full bg-neon-yellow relative flex items-center justify-end pr-2 overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Pattern overlay on the loading bar */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)] opacity-50"></div>
            <span className="text-black font-bold text-xs relative z-10 tracking-tighter">{progress}%</span>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="w-full flex justify-between mt-2 text-[10px] text-neon-magenta font-mono">
          <span>SECURE_CONN_ESTABLISHED</span>
          <span>INIT_HYPE_PROTOCOL</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoaderScreen;
