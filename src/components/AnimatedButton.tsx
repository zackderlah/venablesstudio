"use client";

import { motion } from "framer-motion";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedButton({ href, children, className = "" }: AnimatedButtonProps) {
  return (
    <motion.a
      href={href}
      className={`relative overflow-hidden inline-flex items-center justify-center text-[10px] md:text-[11px] uppercase tracking-widest px-6 py-3 rounded-full font-medium cursor-pointer ${className}`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={{
        initial: { backgroundColor: "#2a2a2a", color: "#f4f4f4", scale: 1 },
        hover: { backgroundColor: "#e0deda", color: "#2a2a2a", scale: 1.05 },
        tap: { scale: 0.95 }
      }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        variants={{
          initial: { width: 0, opacity: 0, marginRight: 0 },
          hover: { width: 10, opacity: 1, marginRight: 10 }
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="flex items-center justify-center overflow-hidden shrink-0"
      >
        <div className="w-[10px] h-[10px] bg-[#2a2a2a] rounded-full shrink-0" />
      </motion.div>
      <span className="whitespace-nowrap">
        {children}
      </span>
    </motion.a>
  );
}
