"use client";

import FlipText from "@/components/animation/FlipText";
import { useId } from "react";
import { Zen_Dots } from "next/font/google";
const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});
export default function SectionTitle({
  title = "",
  // offset = {
  //   base: "-left-[10%]",
  //   md: "-left-[0%]",
  // },
  className = "",
  ClrGradet1 = "#000",
  ClrGradet2 = "#70C879",

}) {
  const gradientId = useId();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Title */}
 <h2
  className={`${zenDots.className} inline-block text-3xl md:text-4xl xl:text-[2.625rem] font-semibold py-1 rounded-full`}
>
  <FlipText word={title} />
</h2>



      {/* Decorative Ring */}
      <div
        className={`
          relative
          -left-[10%]
          md:-left-[5%]
          lg:-left-[3%]
          flex items-center justify-center
          w-11 h-11
          md:w-12 md:h-12
          lg:w-[54px] lg:h-[54px]
          rounded-full
          flex-shrink-0
        `}
      >
        <svg
          className="absolute inset-0 w-full h-full rotate-40 transition-all duration-300"
          viewBox="0 0 52 52"
          style={{ opacity: 0.9 }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={ClrGradet1} stopOpacity="1" />
              <stop offset="100%" stopColor={ClrGradet2} stopOpacity="1" />
            </linearGradient>
          </defs>

          <circle
            cx="20"
            cy="26"
            r="25"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            strokeDasharray="78.5 30.5"
            strokeDashoffset="22.25"
          />
        </svg>
      </div>
    </div>
  );
}
