import { motion } from "framer-motion";

const TitleReveal = () => {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Flash effect */}
      <motion.div
        className="absolute inset-0 bg-neon-yellow/30 mix-blend-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Cyber glitch lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-2 bg-neon-magenta/40"
          style={{ top: `${10 + i * 12}%`, clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
          initial={{ scaleX: 1, opacity: 0.8, x: i % 2 === 0 ? "100%" : "-100%" }}
          animate={{ scaleX: 0, opacity: 0, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: "circOut" }}
        />
      ))}

      {/* Main title block */}
      <motion.div className="relative bg-black/80 px-12 py-8 border-4 border-neon-yellow cyber-panel">
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-9xl font-black tracking-[0.1em] text-center text-white"
          initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <span className="block glitch-text neon-glow-yellow" data-text="DATA">
            DATA
          </span>
          <span className="block glitch-text text-neon-cyan mt-2" data-text="CLEAN-UP" style={{ WebkitTextStroke: "2px black" }}>
            CLEAN-UP
          </span>
        </motion.h1>

        {/* Diagonal caution stripes behind text inside the box */}
        <div className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(45deg,#000,#000_10px,rgba(252,238,10,0.1)_10px,rgba(252,238,10,0.1)_20px)] pointer-events-none"></div>

      </motion.div>

      {/* Subtitle tag */}
      <motion.div
        className="mt-6 bg-neon-magenta px-4 py-1"
        initial={{ opacity: 0, y: -20, scaleY: 0 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <p className="font-mono text-xl md:text-2xl font-bold tracking-[0.5em] text-white">
          SCRUB THE NOISE
        </p>
      </motion.div>
    </motion.section>
  );
};

export default TitleReveal;
