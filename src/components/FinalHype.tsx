import { motion } from "framer-motion";

const FinalHype = () => {
  const lines = [
    { text: "GET READY...", delay: 0.3, className: "text-white text-3xl md:text-5xl lg:text-6xl" },
    { text: "TO CLEAN THE DATA", delay: 1.5, className: "text-neon-cyan neon-glow-cyan text-2xl md:text-4xl lg:text-5xl" },
    { text: "SYSTEM_ONLINE", delay: 3, className: "text-neon-magenta neon-glow-magenta text-4xl md:text-6xl lg:text-8xl font-black glitch-text" },
  ];

  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4 gap-6 md:gap-8 bg-black/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glitch overlay line passing across the screen */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-8 bg-neon-magenta/20 z-[-1]"
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {lines.map((line, i) => (
        <motion.h2
          key={i}
          className={`font-display tracking-[0.15em] text-center uppercase ${line.className}`}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: line.delay }}
          data-text={line.text}
        >
          <motion.span
            className="block"
            animate={{ x: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.2, delay: line.delay + 0.6, repeat: 3 }}
          >
            {line.text}
          </motion.span>
        </motion.h2>
      ))}

      {/* Pulsing intense glow behind the final text */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsla(346, 100%, 50%, 0.15) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.section>
  );
};

export default FinalHype;
