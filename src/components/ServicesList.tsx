"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const SERVICES = [
  {
    id: "001.",
    title: "STRATEGY &\nBRANDING",
    desc: "We define your digital identity. From market research to brand positioning, we build a solid foundation that ensures your message resonates with the right audience.",
    tags: ["RESEARCH", "POSITIONING", "IDENTITY"],
    details: [
      "Customer & Market Research",
      "Brand Positioning & Architecture",
      "Brand Identity Design",
      "Target Audience Discovery"
    ]
  },
  {
    id: "002.",
    title: "UX/UI\nDESIGN",
    desc: "Crafting intuitive and engaging user journeys. We design beautiful interfaces focused on usability, accessibility, and creating seamless interactions across all devices.",
    tags: ["WIREFRAMING", "PROTOTYPING", "INTERFACE"],
    details: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing & Prototyping",
      "Interaction Design"
    ]
  },
  {
    id: "003.",
    title: "WEB\nDEVELOPMENT",
    desc: "Bringing designs to life with modern, robust tech stacks. We build fast, scalable, and secure websites tailored to your specific business requirements.",
    tags: ["FRONTEND", "BACKEND", "CMS"],
    details: [
      "React / Next.js Development",
      "CMS Implementation",
      "WebGL / 3D Development",
      "E-commerce Solutions"
    ]
  },
  {
    id: "004.",
    title: "HOSTING &\nSUPPORT",
    desc: "Providing secure, reliable, and lightning-fast hosting solutions. We offer ongoing maintenance to keep your digital platform running smoothly.",
    tags: ["MAINTENANCE", "SECURITY", "UPTIME"],
    details: [
      "Continuous Deployment",
      "Security Patching",
      "Infrastructure Management",
      "Uptime Monitoring"
    ]
  },
  {
    id: "005.",
    title: "SEO &\nPERFORMANCE",
    desc: "Ensuring your site is fast, accessible, and visible. We optimize your digital presence to rank higher in search engines and deliver lightning-fast load times for maximum conversion.",
    tags: ["OPTIMISATION", "ANALYTICS", "SPEED"],
    details: [
      "SEO Copy Analysis",
      "Thematic Keyword Research",
      "Cross-device Testing",
      "Performance Optimisation"
    ]
  }
];

export default function ServicesList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col border-t border-[#2a2a2a]/20 mb-16 md:mb-24">
      {SERVICES.map((service, index) => {
        const isExpanded = expandedId === service.id;

        return (
          <FadeIn key={service.id} delay={index * 0.1}>
            <div 
              className={`group flex flex-col py-10 md:py-14 border-b border-[#2a2a2a]/20 transition-colors duration-300 px-6 md:px-12 -mx-6 md:-mx-12 cursor-pointer ${isExpanded ? 'bg-[#2a2a2a] text-[#f4f4f4]' : 'hover:bg-[#2a2a2a] hover:text-[#f4f4f4]'}`}
              onClick={() => setExpandedId(isExpanded ? null : service.id)}
            >
              <div className="flex flex-col md:flex-row items-start md:items-stretch gap-8 md:gap-0">
                {/* Number */}
                <div className="text-[10px] md:text-[11px] font-mono opacity-50 shrink-0 md:w-24 pt-2">
                  {service.id}
                </div>
                
                {/* Title */}
                <div className="w-full md:w-[35%] shrink-0 pr-8">
                  <h3 className="text-3xl md:text-4xl lg:text-[40px] uppercase tracking-[-0.02em] leading-[1.1] whitespace-pre-line font-medium">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description & Tags */}
                <div className="w-full md:w-[40%] flex flex-col gap-6 pr-8">
                  <p className="text-sm md:text-base leading-relaxed font-medium opacity-90">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className={`border px-2 py-1 text-[9px] uppercase tracking-widest transition-colors duration-300 font-mono ${isExpanded ? 'border-[#f4f4f4]/40' : 'border-[#2a2a2a]/20 group-hover:border-[#f4f4f4]/40'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Plus Icon & Action */}
                <div className="w-full md:flex-1 flex justify-between md:justify-end items-start pt-2">
                  {/* Plus/Minus Icon (visible on hover or when expanded) */}
                  <div className={`hidden md:flex flex-1 justify-center transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="w-6 h-6 relative">
                      <div className="absolute inset-0 m-auto w-full h-[1px] bg-[#f4f4f4]"></div>
                      {!isExpanded && <div className="absolute inset-0 m-auto h-full w-[1px] bg-[#f4f4f4]"></div>}
                    </div>
                  </div>
                  
                  {/* Action Text */}
                  <div className="text-[9px] uppercase tracking-widest opacity-50 font-mono text-right flex flex-col items-end">
                    <span>REQ. SPECS</span>
                    <span className={`transition-opacity duration-300 mt-1 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {isExpanded ? '[ ACTIVE ]' : '[ INIT ]'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-12 md:pt-16 pb-4 flex flex-col md:flex-row gap-8 md:gap-0">
                      <div className="hidden md:block md:w-24 shrink-0"></div>
                      <div className="w-full md:w-[35%] shrink-0 pr-8">
                        <h4 className="text-sm uppercase tracking-widest opacity-50 font-mono mb-6">Capabilities</h4>
                        <ul className="flex flex-col gap-3">
                          {service.details.map((detail, i) => (
                            <li key={i} className="text-lg md:text-xl font-sans tracking-tight flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-[#f4f4f4] rounded-full opacity-50"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
