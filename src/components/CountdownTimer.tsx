import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-03-30T00:00:00").getTime();

const CountdownTimer = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, TARGET - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINS", value: time.minutes },
    { label: "SECS", value: time.seconds },
  ];

  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4 bg-[#050508]/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="font-display text-xl md:text-4xl tracking-[0.2em] md:tracking-[0.5em] text-neon-magenta mb-8 md:mb-12 font-bold uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        T-MINUS
      </motion.h2>

      <div className="flex gap-1 md:gap-6">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className="relative bg-black border-2 border-neon-cyan flex flex-col items-center p-2 md:p-8 min-w-[70px] md:min-w-[120px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
          >
            {/* Caution stripes on top edge */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#00F0FF,#00F0FF_5px,#000_5px,#000_10px)]"></div>
            
            <motion.span
              key={u.value}
              className="font-display text-3xl md:text-7xl font-black text-neon-cyan neon-glow-cyan mt-2"
              initial={{ opacity: 0.5, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {String(u.value).padStart(2, "0")}
            </motion.span>

            <span className="font-mono text-[10px] md:text-sm tracking-[0.3em] text-white mt-4 uppercase">
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 border-l-4 border-neon-yellow pl-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="font-mono text-sm md:text-lg tracking-widest text-neon-yellow uppercase">
          TARGET_DATE: 30_MAR_2026
        </p>
        <p className="font-mono text-xs text-gray-500 mt-1 uppercase">
          // SYSTEM INITIALIZATION SCHEDULED
        </p>
      </motion.div>
    </motion.section>
  );
};

export default CountdownTimer;
