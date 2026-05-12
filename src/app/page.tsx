import WorksSection from "@/components/WorksSection";
import AnimatedButton from "@/components/AnimatedButton";
import HeroTitle from "@/components/HeroTitle";
import FadeIn from "@/components/FadeIn";
import ScrambleText from "@/components/ScrambleText";
import ServicesList from "@/components/ServicesList";
import VoidAesthetic from "@/components/VoidAesthetic";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[#2a2a2a] selection:text-[#f4f4f4]">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 flex justify-between items-center text-[10px] md:text-[11px] uppercase tracking-wide font-normal z-50 mix-blend-multiply text-[#2a2a2a]">
        <div>
          <Link href="/">Venables<sup className="text-[8px] ml-[1px]">®</sup></Link>
        </div>
        <nav className="hidden md:flex gap-16">
          <Link href="/#work" className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href="/#about" className="hover:opacity-50 transition-opacity">About</Link>
          <Link href="/#services" className="hover:opacity-50 transition-opacity">Services</Link>
          <Link href="/#contact" className="hover:opacity-50 transition-opacity">Contact</Link>
        </nav>
        <MobileMenu />
      </header>

      {/* Hero Section */}
      <section className="pt-40 md:pt-48 px-6 md:px-12 pb-24 w-full">
        <HeroTitle />
        
        <FadeIn delay={0.5}>
          <div className="mt-12 md:mt-16 text-[10px] md:text-[11px] uppercase tracking-wide leading-relaxed flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div>
              <p>Designed to engage</p>
              <p>Built to connect</p>
            </div>
            <AnimatedButton href="#contact">
              Let&apos;s Talk
            </AnimatedButton>
          </div>
        </FadeIn>
      </section>

      {/* Works Section */}
      <WorksSection />

      {/* About Section */}
      <section id="about" className="px-6 md:px-12 py-24 md:py-40 relative overflow-hidden">
        {/* Background 3D Shape */}
        <div className="absolute top-0 left-0 w-full md:w-1/2 h-full z-0 pointer-events-none opacity-60">
          <VoidAesthetic />
        </div>

        <div className="relative z-10">
          <FadeIn>
            <h2 className="text-[10vw] md:text-[8vw] leading-[0.8] tracking-[-0.03em] uppercase mb-16 md:mb-24">
              <ScrambleText text="ABOUT" />
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <FadeIn delay={0.1}>
            <h3 className="text-2xl md:text-4xl lg:text-[40px] leading-[1.1] tracking-[-0.02em] uppercase max-w-2xl">
              A MELBOURNE BASED DIGITAL STUDIO CRAFTING IMMERSIVE EXPERIENCES FOR AMBITIOUS BRANDS.
            </h3>
            </FadeIn>
            
            <FadeIn delay={0.2} className="md:pl-0">
              <div className="bg-[#f4f4f4] p-6 -mx-6 rounded-2xl md:bg-transparent md:p-0 md:mx-0">
                <p className="text-sm md:text-base leading-relaxed text-[#2a2a2a]/90 mb-10 max-w-lg font-sans">
                  We engineer digital experiences that <span className="font-semibold text-[#2a2a2a]">command attention and drive results</span>. By fusing <span className="font-semibold text-[#2a2a2a]">strategic branding</span> with <span className="font-semibold text-[#2a2a2a]">cutting-edge web development</span>, we craft immersive platforms tailored for forward-thinking brands. Our collaborative approach ensures every project not only looks extraordinary but delivers <span className="font-semibold text-[#2a2a2a]">flawless technical performance</span>, ultimately <span className="font-semibold text-[#2a2a2a]">increasing bookings</span> and transforming how audiences interact with your business online.
                </p>
                <AnimatedButton href="#contact">
                  Let&apos;s Talk
                </AnimatedButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 md:px-12 py-24 md:py-40 overflow-hidden">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <h2 className="text-[10vw] md:text-[8vw] leading-[0.8] tracking-[-0.03em] uppercase">
              <ScrambleText text="SERVICES" />
            </h2>
          </div>
        </FadeIn>
        
        <ServicesList />

      </section>

      {/* Contact / Footer Section */}
      <section id="contact" className="px-6 md:px-12 pt-24 md:pt-40 pb-8 flex flex-col justify-between min-h-[80vh] overflow-hidden">
        <FadeIn>
          <div>
            <h2 className="text-[14vw] md:text-[12vw] leading-[0.8] tracking-[-0.04em] uppercase">
              <ScrambleText text="CONTACT" />
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-24 md:mt-40 mb-32">
          <FadeIn delay={0.1}>
            <h3 className="text-xl md:text-3xl leading-[1.1] tracking-[-0.02em] uppercase mb-10 max-w-sm">
              WE WOULD LOVE TO HEAR FROM YOU. LET&apos;S WORK — TOGETHER.
            </h3>
            <AnimatedButton href="#contact">
              Contact Us
            </AnimatedButton>
          </FadeIn>

          <FadeIn delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-[10px] md:text-[11px] uppercase tracking-wide font-normal leading-relaxed">
            <div>
              <div className="text-[#2a2a2a]/50 mb-2">Business Enquiries</div>
              <a href="mailto:hello@venables.studio" className="block hover:opacity-60 transition-opacity mb-1">hello@venables.studio</a>
              <div>+61 3 9000 0000</div>

              <div className="mt-12 text-[#2a2a2a]/50 mb-2">Business Hours</div>
              <div className="mb-1">Monday to Friday</div>
              <div className="mb-1">09:00 AM - 05:00 PM</div>
              <div>AEST - {new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne", hour: "2-digit", minute: "2-digit", hour12: false })}</div>
            </div>
            <div>
              <div className="text-[#2a2a2a]/50 mb-2">Location</div>
              <div className="mb-1">Melbourne, VIC</div>
              <div>Australia</div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <FadeIn delay={0.3} direction="none">
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] uppercase tracking-wide pt-6 gap-6 w-full">
            <div className="w-full md:w-auto text-left">VENABLES<sup className="text-[8px] ml-[1px]">®</sup> ©{new Date().getFullYear()}</div>
            <div className="flex gap-8 md:gap-16 w-full md:w-auto justify-start md:justify-center">
              <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a>
              <a href="#" className="hover:opacity-50 transition-opacity">Twitter</a>
            </div>
            <a href="#" className="w-full md:w-auto text-left md:text-right hover:opacity-50 transition-opacity bg-[#2a2a2a] text-[#f4f4f4] px-4 py-2 hover:bg-black md:bg-transparent md:text-[#2a2a2a] md:p-0 md:hover:bg-transparent">Back to Top</a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
