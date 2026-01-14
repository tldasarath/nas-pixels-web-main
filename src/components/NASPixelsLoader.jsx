"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NASPixelsLoader() {
  const nLetterRef = useRef(null);
  const pLetterRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      // Initial state
      gsap.set([nLetterRef.current, pLetterRef.current], {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // Animate N letter drawing
      tl.to(nLetterRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

      // Animate P letter drawing
      tl.to(pLetterRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.3);

      // Fill the letters
      tl.to([nLetterRef.current, pLetterRef.current], {
        fill: "#70C879",
        duration: 0.6,
        ease: "power2.out",
      }, 1.8);

      // Glow effect
      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }, 2);

      // Fade in text
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 2.2);

      // Pulse effect
      tl.to([nLetterRef.current, pLetterRef.current], {
        scale: 1.05,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        transformOrigin: "center center",
      }, 3);

      // Hold
      tl.to({}, { duration: 0.5 });

      // Fade out
      tl.to([nLetterRef.current, pLetterRef.current, textRef.current, glowRef.current], {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#70C879 1px, transparent 1px), linear-gradient(90deg, #70C879 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(112, 200, 121, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Logo SVG */}
      <div className="relative z-10">
        <svg
          width="280"
          height="160"
          viewBox="0 0 280 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          {/* N Letter */}
          <path
            ref={nLetterRef}
            d="M 20 120 L 20 40 L 60 90 L 100 40 L 100 80"
            stroke="#70C879"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'fill 0.6s ease' }}
          />

          {/* P Letter - Upper part */}
          <path
            ref={pLetterRef}
            d="M 120 40 L 180 40 L 220 50 C 250 55 260 65 260 85 C 260 105 250 115 220 120 L 180 125 L 140 125 L 140 75"
            stroke="#70C879"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'fill 0.6s ease' }}
          />
        </svg>

        {/* Text */}
        <div ref={textRef} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#70C879] tracking-wider mb-2">
            NAS PIXELS
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#70C879] animate-pulse" />
            <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase">
              Loading...
            </p>
            <div className="w-2 h-2 rounded-full bg-[#70C879] animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#70C879] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}