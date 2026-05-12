"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedWord({ text, forceHover = false }: { text: string; forceHover?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const active = isHovered || forceHover;

  return (
    <span
      className="relative inline-flex overflow-hidden cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default text */}
      <span className="flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 0 }}
            animate={{ y: active ? "-100%" : 0 }}
            transition={{ duration: 0.4, delay: i * 0.02, ease: [0.76, 0, 0.24, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      
      {/* Hover text (lighter color) */}
      <span className="absolute top-0 left-0 flex text-[#a0a0a0]">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: active ? 0 : "100%" }}
            transition={{ duration: 0.4, delay: i * 0.02, ease: [0.76, 0, 0.24, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
