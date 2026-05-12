"use client";

import { useState, useEffect } from "react";
import AnimatedWord from "./AnimatedWord";

export default function HeroTitle() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Start the random animation cycle
    const interval = setInterval(() => {
      // Pick a random word index (0 to 7)
      const randomIndex = Math.floor(Math.random() * 8);
      setActiveIndex(randomIndex);

      // Reset it back to normal after 1.5 seconds (gives it time to animate in and stay briefly)
      setTimeout(() => {
        setActiveIndex(null);
      }, 1500);
    }, 3000); // Trigger a new random word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] leading-[0.85] tracking-[-0.03em] uppercase w-full">
      <AnimatedWord text="ELEVATING" forceHover={activeIndex === 0} />{" "}
      <AnimatedWord text="DIGITAL" forceHover={activeIndex === 1} />
      <br />
      <AnimatedWord text="EXPERIENCES" forceHover={activeIndex === 2} />{" "}
      <AnimatedWord text="THROUGH" forceHover={activeIndex === 3} />
      <br />
      <AnimatedWord text="BOLD" forceHover={activeIndex === 4} />{" "}
      <AnimatedWord text="DESIGN" forceHover={activeIndex === 5} />
      <br />
      <AnimatedWord text="&" forceHover={activeIndex === 6} />{" "}
      <AnimatedWord text="INNOVATION" forceHover={activeIndex === 7} />
    </h1>
  );
}
