"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FadeIn from "./FadeIn";

type Work = {
  id: number;
  title: string;
  category: string;
  gradient: string;
  gallery: string[]; // Gradients or colors for placeholders
};

const WORKS: Work[] = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Digital Design · Web Development",
    gradient: "from-[#d4d4d4] to-[#e8e8e8]",
    gallery: [
      "from-zinc-800 to-zinc-900",
      "from-zinc-700 to-zinc-800",
      "from-zinc-600 to-zinc-700",
      "from-zinc-500 to-zinc-600",
      "from-zinc-400 to-zinc-500",
    ],
  },
  {
    id: 2,
    title: "Beta System",
    category: "Strategy · Brand Identity",
    gradient: "from-[#cbd5e1] to-[#e8e8e8]",
    gallery: [
      "from-slate-800 to-slate-900",
      "from-slate-700 to-slate-800",
      "from-slate-600 to-slate-700",
      "from-slate-500 to-slate-600",
    ],
  },
  {
    id: 3,
    title: "Gamma Studio",
    category: "E-Commerce · Art Direction",
    gradient: "from-[#e2e8f0] to-[#e8e8e8]",
    gallery: [
      "from-gray-800 to-gray-900",
      "from-gray-700 to-gray-800",
      "from-gray-600 to-gray-700",
      "from-gray-500 to-gray-600",
    ],
  },
  {
    id: 4,
    title: "Delta Platform",
    category: "UX/UI Design · Strategy",
    gradient: "from-[#f1f5f9] to-[#e8e8e8]",
    gallery: [
      "from-neutral-800 to-neutral-900",
      "from-neutral-700 to-neutral-800",
      "from-neutral-600 to-neutral-700",
      "from-neutral-500 to-neutral-600",
    ],
  },
];

export default function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (selectedWork && carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [selectedWork]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedWork]);

  return (
    <>
      <section id="work" className="px-6 md:px-12 pb-24 md:pb-40 overflow-hidden -mt-12 md:-mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {WORKS.map((work, index) => (
            <FadeIn key={work.id} delay={index * 0.1}>
              <div
                className="group cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div className="relative aspect-[4/3] bg-[#e8e8e8] overflow-hidden mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${work.gradient} transition-transform duration-1000 group-hover:scale-105`}
                  />
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-wide text-[#2a2a2a]/60 mb-2">
                  {work.category}
                </div>
                <h3 className="text-lg md:text-xl uppercase tracking-[-0.02em]">
                  {work.title}
                </h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedWork && (
          <>
            {/* Backdrop to close when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/20 cursor-default"
              onClick={() => setSelectedWork(null)}
            />

            {/* Popup Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 top-16 md:top-24 z-[100] bg-[#121212] text-[#f4f4f4] flex flex-col border-t border-[#f4f4f4]/10 shadow-2xl"
            >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-12">
              <div>
                <h2 className="text-2xl md:text-4xl uppercase tracking-[-0.02em] mb-2">
                  {selectedWork.title}
                </h2>
                <div className="text-[10px] md:text-[11px] uppercase tracking-wide text-[#f4f4f4]/60">
                  {selectedWork.category}
                </div>
              </div>
              <button
                onClick={() => setSelectedWork(null)}
                className="p-4 hover:opacity-50 transition-opacity cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Draggable Gallery */}
            <div className="flex-1 overflow-hidden flex flex-col justify-center pb-12">
              <div className="px-6 md:px-12 mb-6 text-[10px] md:text-[11px] uppercase tracking-wide text-[#f4f4f4]/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f4f4f4]/40 animate-pulse" />
                Drag to explore
              </div>
              
              <motion.div
                ref={carouselRef}
                className="cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-12"
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ right: 0, left: -carouselWidth }}
                  className="flex gap-6 md:gap-12"
                >
                  {selectedWork.gallery.map((gradient, index) => (
                    <motion.div
                      key={index}
                      className="min-w-[80vw] md:min-w-[60vw] aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                      {/* Placeholder for actual content */}
                      <div className="absolute inset-0 flex items-center justify-center text-[#f4f4f4]/20 text-4xl font-light">
                        {index % 2 === 0 ? "Screenshot" : "GIF"} {index + 1}
                      </div>
                    </motion.div>
                  ))}
                  {/* Spacer at the end to allow scrolling past the last item slightly */}
                  <div className="min-w-[6vw] md:min-w-[12vw]" />
                </motion.div>
              </motion.div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
