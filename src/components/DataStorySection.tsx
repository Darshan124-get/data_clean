import { motion } from "framer-motion";
import { FileX, Trash2, FileCheck, Sparkles, Database, HardDrive } from "lucide-react";

const DataStorySection = () => {
  const messyIcons = [FileX, Database, HardDrive, FileX, Database];
  const cleanIcons = [FileCheck, Sparkles, FileCheck, Sparkles, FileCheck];

  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4 overflow-hidden bg-black/50 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="font-display text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.5em] text-neon-magenta mb-8 md:mb-12 font-bold uppercase glitch-text"
        data-text="THE_TRANSFORMATION"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        THE_TRANSFORMATION
      </motion.p>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Messy data */}
        <motion.div
          className="cyber-panel neon-border-magenta p-4 md:p-8 flex flex-col items-center gap-4 min-w-[180px] md:min-w-[200px]"
          initial={{ x: -100, opacity: 0, rotate: -3 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-neon-magenta"></div>
          <p className="font-mono text-sm tracking-[0.2em] text-neon-magenta">CORRUPTED_DATA</p>
          <div className="grid grid-cols-3 gap-3">
            {messyIcons.map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, Math.random() * 8 - 4, 0],
                  y: [0, Math.random() * 8 - 4, 0],
                  opacity: [0.5, 1, 0.3],
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                className="bg-black border border-neon-magenta/50 p-2"
              >
                <Icon className="w-6 h-6 text-neon-magenta animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow / sweep */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <div className="p-3 border-2 border-neon-yellow rounded-full bg-black">
            <Trash2 className="w-8 h-8 text-neon-yellow neon-glow-yellow" />
          </div>
          <motion.div
            className="w-24 h-[3px] bg-gradient-to-r from-neon-magenta via-neon-yellow to-neon-cyan"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
          <motion.p
            className="font-mono text-xs tracking-[0.3em] text-neon-yellow blink-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
            transition={{ delay: 2, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            CLEANING_PROTOCOL
          </motion.p>
        </motion.div>

        {/* Clean data */}
        <motion.div
          className="cyber-panel neon-border-cyan p-4 md:p-8 flex flex-col items-center gap-4 min-w-[180px] md:min-w-[200px]"
          initial={{ x: 100, opacity: 0, rotate: 3 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 2.2, type: "spring", stiffness: 100 }}
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-neon-cyan"></div>
          <p className="font-mono text-sm tracking-[0.2em] text-neon-cyan">OPTIMIZED_DATA</p>
          <div className="grid grid-cols-3 gap-3">
            {cleanIcons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 + i * 0.1 }}
                className="bg-black border border-neon-cyan overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-neon-cyan/20 group-hover:bg-neon-cyan/40 transition-colors"></div>
                <Icon className="w-8 h-8 text-neon-cyan relative z-10 p-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DataStorySection;
