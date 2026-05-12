"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button 
        onClick={toggleMenu}
        className="md:hidden hover:opacity-50 transition-opacity z-[60] relative uppercase"
      >
        {isOpen ? "CLOSE -" : "MENU +"}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[55] bg-[#f4f4f4] flex flex-col justify-center items-center px-6"
            >
              <button 
                onClick={closeMenu}
                className="absolute top-6 right-6 p-2 hover:opacity-50 transition-opacity"
              >
                <X size={24} />
              </button>

              <nav className="flex flex-col items-center gap-8 text-4xl uppercase tracking-[-0.02em]">
                <Link href="/#work" onClick={closeMenu} className="hover:opacity-50 transition-opacity">Work</Link>
                <Link href="/#about" onClick={closeMenu} className="hover:opacity-50 transition-opacity">About</Link>
                <Link href="/#services" onClick={closeMenu} className="hover:opacity-50 transition-opacity">Services</Link>
                <Link href="/#contact" onClick={closeMenu} className="hover:opacity-50 transition-opacity">Contact</Link>
              </nav>
              
              <div className="absolute bottom-12 text-[10px] uppercase tracking-wide opacity-50 flex flex-col items-center gap-4">
                <a href="mailto:hello@venables.studio" className="hover:opacity-100 transition-opacity">hello@venables.studio</a>
                <div className="flex gap-6">
                  <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}