import React, { useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Cpu } from "lucide-react";

const PARTICLE_COUNT = 40;

const Particle = () => {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomY = useMemo(() => Math.random() * 100, []);
  const randomDelay = useMemo(() => Math.random() * 5, []);
  const randomDuration = useMemo(() => 15 + Math.random() * 25, []);
  const randomSize = useMemo(() => 1 + Math.random() * 2, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
        x: [`${randomX}%`, `${randomX + (Math.random() * 10 - 5)}%`],
        y: [`${randomY}%`, `${randomY + (Math.random() * 10 - 5)}%`],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
      className="absolute bg-emerald-400/30 rounded-full blur-[1px]"
      style={{ width: randomSize, height: randomSize }}
    />
  );
};

export default function AiTile() {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
      className="group rounded-none bg-neutral-900/20 border-0 backdrop-blur-3xl overflow-hidden"
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Animation Core */}
      <div className="relative h-full w-full flex items-center justify-center z-10" style={{ transform: "translateZ(100px)" }}>
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-48 h-48 md:w-64 md:h-64"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 0.8, 0.6].map((scale, i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute border border-white/10 rounded-full"
                style={{
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  borderStyle: i === 0 ? "dashed" : "solid",
                  opacity: 1 - i * 0.3,
                }}
              />
            ))}

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-full h-full border border-emerald-500/40 rounded-full"
                />
              )}
            </AnimatePresence>

            <motion.div
              className="absolute w-24 h-24 bg-gradient-to-br from-emerald-400 via-emerald-500 to-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_80px_rgba(52,211,153,0.4)] overflow-hidden"
              style={{ transform: "rotate(45deg) translateZ(50px)" }}
            >
              <Cpu className="w-10 h-10 text-white relative z-10" style={{ transform: "rotate(-45deg)" }} />
              <motion.div
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-1/2 bg-white/20 blur-2xl -rotate-45"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mouse Glow */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([mx, my]) =>
              `radial-gradient(circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(52,211,153,0.12), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}
