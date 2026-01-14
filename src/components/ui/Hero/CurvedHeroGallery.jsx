"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const IMAGES = [
  "https://picsum.photos/id/1011/600/900",
  "https://picsum.photos/id/1015/600/900",
  "https://picsum.photos/id/1021/600/900",
  "https://picsum.photos/id/1025/600/900",
  "https://picsum.photos/id/1031/600/900",
  "https://picsum.photos/id/1035/600/900",
  "https://picsum.photos/id/1041/600/900",
  "https://picsum.photos/id/1045/600/900",
  "https://picsum.photos/id/1051/600/900",
];

export default function CurvedHeroGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current;
      const track = trackRef.current;

      const itemWidth = 264 + 30; // width + gap
      const totalWidth = itemWidth * items.length;

      // duplicate content for seamless loop
      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // curve illusion
  gsap.set(containerRef.current, {
  perspective: 1200,
});

gsap.ticker.add(() => {
  const containerBox = containerRef.current.getBoundingClientRect();
  const centerX = containerBox.left + containerBox.width / 2;

  items.forEach((el) => {
    if (!el) return;

    const box = el.getBoundingClientRect();
    const elCenter = box.left + box.width / 2;

    const distance = elCenter - centerX;
    const normalized = Math.max(
      -1,
      Math.min(distance / (containerBox.width / 2), 1)
    );

    // 🎯 Reference-level arc math
    const arcY = Math.pow(Math.abs(normalized), 1.8) * 140;
    const rotateY = normalized * -35;
    const scale = 1 - Math.abs(normalized) * 0.22;
    const opacity = 1 - Math.abs(normalized) * 0.35;

    gsap.set(el, {
      y: arcY,
      rotateY,
      scale,
      opacity,
      transformOrigin: "center center",
    });
  });
});

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hero Text */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center">
        <h1 className="text-yellow-400 text-5xl md:text-7xl font-bold tracking-wide">
          STRATEGIC
          <br />
          STORYTELLERS
        </h1>
      </div>

      {/* Gallery */}
      <div
        ref={containerRef}
        className="absolute bottom-[8%] w-full overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-[30px] will-change-transform"
        >
          {[...IMAGES, ...IMAGES].map((src, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="w-[264px] shrink-0"
            >
              <div className="relative w-full h-[380px] overflow-hidden rounded-md">
                <Image
                  src={src}
                  alt="Gallery image"
                  fill
                  className="object-cover"
                  sizes="264px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
