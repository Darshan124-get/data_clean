import { motion } from "framer-motion";
import { Building2, Users, Calendar, MapPin, GraduationCap } from "lucide-react";

const cards = [
  { icon: Building2, label: "ORGANIZED BY", value: "Department of Computer Applications", color: "cyan" as const },
  { icon: Users, label: "CLUB", value: "V-Avishkar Club", color: "magenta" as const },
  { icon: Calendar, label: "DATE", value: "31 March 2026", color: "yellow" as const },
  { icon: MapPin, label: "LOCATION", value: "Computer Lab, VVFGC", color: "cyan" as const },
  { icon: GraduationCap, label: "Participants", value: "BCA II Semester Students", color: "magenta" as const },
];

const borderClass = {
  cyan: "neon-border-cyan",
  magenta: "neon-border-magenta",
  yellow: "neon-border-yellow",
};

const textClass = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  yellow: "text-neon-yellow",
};

const EventDetails = () => {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-start sm:justify-center px-4 overflow-y-auto pt-16 pb-24 sm:py-20 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
      
      <motion.h2
        className="font-display text-xl md:text-5xl tracking-[0.15em] md:tracking-[0.3em] text-white mb-4 md:mb-12 font-bold uppercase glitch-text shrink-0"
        data-text="SYSTEM_PARAMETERS"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        SYSTEM_PARAMETERS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className={`cyber-panel ${borderClass[card.color]} p-5 md:p-6 flex flex-row md:flex-col items-center text-left md:text-center gap-3 md:gap-4 cursor-default transition-all duration-300 hover:-translate-y-2 hover:bg-black group relative`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            {/* Scanline effect on hover inside the card */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="w-full h-1 bg-white/20 scanline"></div>
            </div>

            <card.icon className={`w-6 h-6 md:w-10 md:h-10 shrink-0 ${textClass[card.color]} group-hover:scale-110 transition-transform`} />
            
            <div className="min-w-0 flex-1 md:flex-none">
              <p className="font-mono text-[9px] md:text-xs tracking-[0.3em] text-gray-400 mb-0.5 md:mb-1">{card.label}</p>
              <p className={`font-display text-xs sm:text-sm md:text-base tracking-widest font-bold uppercase ${textClass[card.color]} break-words`}>
                {card.value}
              </p>
            </div>
            
            <div className={`absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-neon-${card.color}`}></div>
            <div className={`absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 bg-neon-${card.color}`}></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EventDetails;
