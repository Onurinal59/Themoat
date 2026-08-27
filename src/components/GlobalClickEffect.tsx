import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const GlobalClickEffect: React.FC = () => {
  const [clicks, setClicks] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger ripple if the click is on a highly interactive native element where it might be distracting
      // (Optional constraint, but global is fine for the requested "wow" effect)
      
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setClicks((prev) => [...prev, newClick]);
      
      // Clean up after animation duration
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <React.Fragment key={click.id}>
            {/* Primary expanding ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8, borderWidth: '3px' }}
              animate={{ scale: 3, opacity: 0, borderWidth: '0px' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] dark:border-indigo-400 dark:shadow-[0_0_15px_rgba(129,140,248,0.6)]"
              style={{
                left: click.x - 15,
                top: click.y - 15,
                width: 30,
                height: 30,
              }}
            />
            {/* Secondary delayed soft ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.5, borderWidth: '2px' }}
              animate={{ scale: 5, opacity: 0, borderWidth: '0px' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="absolute rounded-full border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
              style={{
                left: click.x - 15,
                top: click.y - 15,
                width: 30,
                height: 30,
              }}
            />
            {/* Core spark flash */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
              style={{
                left: click.x - 4,
                top: click.y - 4,
                width: 8,
                height: 8,
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
