import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import LoaderScreen from "@/components/LoaderScreen";
import HeroIntro from "@/components/HeroIntro";
import TitleReveal from "@/components/TitleReveal";
import DataStorySection from "@/components/DataStorySection";
import SystemParameters from "@/components/SystemParameters";
import CountdownTimer from "@/components/CountdownTimer";
import FinalHype from "@/components/FinalHype";
import AudioManager from "@/components/AudioManager";

type Phase = "pre-enter" | "loader" | "hero" | "title" | "story" | "specs" | "countdown" | "finale";

const TIMINGS: Record<Phase, number> = {
  "pre-enter": 0, // Stays until clicked
  loader: 3000,
  hero: 5500,
  title: 3500,
  story: 4500,
  specs: 5000,
  countdown: 5000,
  finale: 13000, // 3s reveal + 10s wait
};

const SEQUENCE: Phase[] = ["pre-enter", "loader", "hero", "title", "story", "specs", "countdown", "finale"];

const Index = () => {
  const [phase, setPhase] = useState<Phase>("pre-enter");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const duration = TIMINGS[phase];
    if (duration === 0) return; // finale stays

    const timer = setTimeout(() => {
      const idx = SEQUENCE.indexOf(phase);
      if (idx < SEQUENCE.length - 1) {
        setPhase(SEQUENCE[idx + 1]);
      } else {
        setPhase(SEQUENCE[0]);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [phase, isPlaying]);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Global background */}
      <ParticleBackground />
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsla(346, 100%, 50%, 0.05)), radial-gradient(circle at 50% 50%, hsla(184, 100%, 50%, 0.05) 0%, transparent 80%)",
        }}
      />

      <AudioManager play={phase !== "pre-enter" && isPlaying} />

      {/* Play/Pause Control (only visible during experience) */}
      {phase !== "pre-enter" && phase !== "finale" && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={togglePlayback}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 border border-neon-cyan/50 text-neon-cyan font-mono text-xs uppercase group hover:border-white transition-colors"
        >
          <div className="relative w-3 h-3">
            {isPlaying ? (
              <div className="flex gap-[2px] items-center h-full">
                <div className="w-[3px] h-full bg-neon-cyan animate-pulse"></div>
                <div className="w-[3px] h-full bg-neon-cyan animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-neon-cyan border-b-[6px] border-b-transparent"></div>
            )}
          </div>
          <span className="group-hover:text-white transition-colors">
            {isPlaying ? "PHASE_LIVE" : "SEQUENCE_PAUSED"}
          </span>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-neon-cyan"></div>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {phase === "pre-enter" && (
          <motion.div 
            key="pre-enter"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black scanline"
            exit={{ opacity: 0, scale: 2, transition: { duration: 0.8, ease: "circIn" } }}
          >
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center z-10"
            >
              <h2 className="font-display text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.5em] text-neon-cyan mb-8 uppercase animate-pulse">
                // AUTHENTICATION_REQUIRED
              </h2>
              <button 
                onClick={() => setPhase("loader")}
                className="group relative px-12 py-5 font-display text-lg tracking-[0.3em] text-black bg-neon-yellow hover:bg-white transition-all duration-300 cyber-panel uppercase font-bold"
              >
                <span className="relative z-10 glitch-text" data-text="ENTER_EXPERIENCE">ENTER_EXPERIENCE</span>
                {/* Decorative bits on button */}
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neon-cyan group-hover:scale-150 transition-transform"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neon-magenta group-hover:scale-150 transition-transform"></div>
              </button>
              <p className="mt-8 font-mono text-[10px] text-gray-500 tracking-widest uppercase opacity-50">
                AUTHORIZED_ACCESS_ONLY // V_2.0.77
              </p>
            </motion.div>
          </motion.div>
        )}
        {phase === "loader" && <LoaderScreen key="loader" />}
        {phase === "hero" && <HeroIntro key="hero" onComplete={() => {}} />}
        {phase === "title" && <TitleReveal key="title" />}
        {phase === "story" && <DataStorySection key="story" />}
        {phase === "specs" && <SystemParameters key="specs" />}
        {phase === "countdown" && <CountdownTimer key="countdown" />}
        {phase === "finale" && <FinalHype key="finale" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
