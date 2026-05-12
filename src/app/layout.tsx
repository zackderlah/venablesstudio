import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venables Studio",
  description: "A Melbourne based digital design studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#f4f4f4] text-[#2a2a2a] font-sans">
        {children}
      </body>
    </html>
  );
}
