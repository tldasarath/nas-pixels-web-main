"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ModernButton } from "./common/Button/ModernButton";

export default function NotFoundPage() {
  const router = useRouter();
  const screen404Ref = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated glow effect
      gsap.to(glowRef.current, {
        boxShadow: "0 0 60px rgba(0, 255, 120, 0.6), 0 0 100px rgba(0, 255, 120, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 404 text flicker animation
      gsap.fromTo(
        screen404Ref.current,
        { opacity: 0.8 },
        {
          opacity: 1,
          duration: 0.1,
          repeat: -1,
          repeatDelay: 0.3,
          ease: "steps(1)",
        }
      );

      // Text fade in
      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out",
      });

      // Button hover animation setup
      const button = document.querySelector(".home-button");
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
  
      <div
        ref={glowRef}
        className="relative rounded-3xl mb-8 md:mb-12 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl overflow-hidden"
        style={{
          boxShadow: "0 0 40px rgba(0, 255, 120, 0.4), 0 0 80px rgba(0, 255, 120, 0.2)",
        }}
      >
        {/* 404 Image */}
        <img
          ref={screen404Ref}
          src="/assets/images/404-error.png"
          alt="404 - Page Not Found"
          className="w-full h-auto object-contain"
          style={{
            filter: "drop-shadow(0 0 20px rgba(0, 255, 120, 0.5))",
          }}
        />

  
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(transparent 50%, rgba(0, 255, 120, 0.03) 50%)",
            backgroundSize: "100% 4px",
            animation: "scanline 8s linear infinite",
          }}
        />
      </div>

   
      <div ref={textRef} className="text-center space-y-3 md:space-y-4 mb-8 md:mb-10 max-w-lg px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Oops! Page Not Found!
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
          We're sorry, the page you requested could not be found Please go back to homepage
        </p>
        {/* <p className="text-sm sm:text-base md:text-lg text-gray-400">
        
        </p> */}
      </div>

{/* 
      <button
        onClick={handleGoHome}
        className="home-button group relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#00ff78] text-black font-semibold rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-[#00dd66] shadow-lg hover:shadow-[0_0_20px_rgba(0,255,120,0.5)]"
      >
        <span>Back to Home</span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button> */}
      <ModernButton onClick={handleGoHome} text="Back to Home"/>

      {/* CSS Animation for scanline */}
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}