"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isRandomAnimating, setIsRandomAnimating] = useState(false);

  useEffect(() => {
    // Randomly trigger the animation every 2-4 seconds
    const triggerRandomAnimation = () => {
      if (!isHovered) {
        setIsRandomAnimating(true);
      }
      const nextDelay = Math.random() * 2000 + 2000;
      setTimeout(triggerRandomAnimation, nextDelay);
    };

    const timeoutId = setTimeout(triggerRandomAnimation, Math.random() * 2000 + 1000);
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  useEffect(() => {
    if (isHovered || isRandomAnimating) {
      let iteration = 0;
      const maxIterations = 10;
      
      const interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < (iteration / maxIterations) * text.length) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          if (isRandomAnimating) {
            setIsRandomAnimating(false);
          }
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isHovered, isRandomAnimating, text]);

  return (
    <span
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
