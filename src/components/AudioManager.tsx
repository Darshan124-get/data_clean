import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioManagerProps {
  play: boolean;
}

const AudioManager = ({ play }: AudioManagerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (play && !isMuted) {
        // Reset to start when transitioning from stopped to playing
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Autoplay blocked or audio failed to load:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [play, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/as.mp3"
        loop
      />
      
      {/* Sound Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md cursor-pointer"
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </>
  );
};

export default AudioManager;
