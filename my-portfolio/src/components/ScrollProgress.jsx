import { motion as Motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(52, 211, 153, 0.95) 0%, rgba(110, 231, 183, 0.95) 50%, rgba(251, 191, 36, 0.85) 100%)",
        boxShadow: "0 0 12px rgba(52, 211, 153, 0.5)",
      }}
    />
  );
};

export default ScrollProgress;
