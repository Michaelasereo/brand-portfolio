"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`body, body * { cursor: none !important; }`}</style>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        initial={{ opacity: 0 }}
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ x: { duration: 0 }, y: { duration: 0 } }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="size-3 rounded-full" style={{ backgroundColor: '#F4F4E1' }} />
      </motion.div>
    </>
  );
}
