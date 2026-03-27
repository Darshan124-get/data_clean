import { motion } from "framer-motion";

interface HeroIntroProps {
  onComplete: () => void;
}

const HeroIntro = ({ onComplete }: HeroIntroProps) => {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={() => {
        // handled by parent timer
      }}
    >
      <div className="text-center space-y-8 relative">
        {/* Abstract geometric background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] border-y text-neon-cyan/20 pointer-events-none -rotate-6"></div>

        {/* Line 1 */}
        <motion.h2
          className="font-display text-xl md:text-4xl lg:text-5xl tracking-wider md:tracking-widest text-white uppercase bg-black px-4 py-2 border-l-4 border-neon-yellow inline-block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        >
          <motion.span
            animate={{
              color: ["#ffffff", "var(--neon-yellow)", "#ffffff"],
            }}
            transition={{ duration: 0.2, delay: 1, repeat: 5, repeatType: "reverse" }}
          >
            SYSTEM_OVERRIDE_INIT
          </motion.span>
        </motion.h2>

        <br />

        {/* Line 2 */}
        <motion.h2
          className="font-display text-lg md:text-3xl lg:text-4xl tracking-wider md:tracking-widest text-neon-cyan neon-glow-cyan uppercase bg-black/60 px-4 md:px-6 py-2 inline-block border border-neon-cyan px-4"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 2 }}
          style={{ transformOrigin: "center" }}
        >
          SOMETHING BIG IS COMING...
        </motion.h2>

        <br />

        {/* Line 3 */}
        <motion.h1
          className="font-display text-3xl md:text-6xl lg:text-8xl tracking-wider md:tracking-widest font-black text-neon-magenta neon-glow-magenta uppercase mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [0.8, 1.05, 1],
          }}
          transition={{ duration: 0.8, delay: 3.5, type: "spring", stiffness: 200 }}
        >
          <motion.span
            className="glitch-text block"
            data-text="ARE YOU READY?"
            animate={{ x: [0, -4, 4, -2, 2, 0] }}
            transition={{ duration: 0.2, delay: 4.2, repeat: 3 }}
          >
            ARE YOU READY?
          </motion.span>
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default HeroIntro;
