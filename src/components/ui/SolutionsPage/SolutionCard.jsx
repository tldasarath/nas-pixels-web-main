"use client";
import { forwardRef } from "react";
import Image from "next/image";

const SolutionCard = forwardRef(function SolutionCard({ data, index }, ref) {
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-10 items-center 
      border-2 border-dashed border-[#70C879] hover:border-solid
      rounded-2xl p-8 shadow-xl overflow-hidden transition-all duration-300"
    >
      {/* TEXT */}
      <div className={`${isEven ? "order-1" : "order-2"} space-y-4`}>
        <h3 className="text-2xl font-bold">{data.title}</h3>
        <p className="text-sm text-white/60">{data.subtitle}</p>
        <p className="text-white/80 leading-relaxed">{data.text}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {data.features.map((f, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full border border-[#70C879]/40"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div
        className={`${isEven ? "order-2" : "order-1"} relative w-full h-[260px] rounded-xl overflow-hidden`}
      >
        <Image src={data.image} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
    </div>
  );
});

export default SolutionCard;
