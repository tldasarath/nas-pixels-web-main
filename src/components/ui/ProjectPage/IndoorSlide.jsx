"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { slides as fallbackSlides } from "@/data/projects";
import { fetchProjects } from "@/api/api.js";

export default function IndoorSlider() {
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const [slides, setSlides] = useState(fallbackSlides); // 👈 fallback default
  const [isLoading, setIsLoading] = useState(true);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const activeSlider = useRef(null);

  /* ============================
     FETCH PROJECTS (API → FALLBACK)
  ============================ */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchProjects();

        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Normalize API data to slider format
          const normalized = res.data.map((item) => ({
            id: item._id,
            img: item.image,
            title: item.title,
            desc: item.excerpt,
          }));

          setSlides(normalized);
        } else {
          // API success but empty → fallback
          setSlides(fallbackSlides);
        }
      } catch (err) {
        // API failed → fallback
        console.warn("Projects API failed, using fallback data");
        setSlides(fallbackSlides);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  /* ============================
     AUTO SCROLL
  ============================ */
  useEffect(() => {
    if (!slider1.current || !slider2.current) return;

    const s1 = slider1.current;
    const s2 = slider2.current;

    const speed = 0.6;
    let raf;

    const width1 = s1.scrollWidth / 3;
    const width2 = s2.scrollWidth / 3;

    s1.scrollLeft = width1;
    s2.scrollLeft = width2;

    const animate = () => {
      if (!isDragging.current) {
        s1.scrollLeft += speed;
        s2.scrollLeft -= speed;
      }

      if (s1.scrollLeft >= width1 * 2) s1.scrollLeft -= width1;
      if (s1.scrollLeft <= 0) s1.scrollLeft += width1;

      if (s2.scrollLeft <= 0) s2.scrollLeft += width2;
      if (s2.scrollLeft >= width2 * 2) s2.scrollLeft -= width2;

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [slides]); // 👈 re-init when slides change

  /* ============================
     DRAG HANDLERS
  ============================ */
  const startDrag = (e, slider) => {
    isDragging.current = true;
    activeSlider.current = slider;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeft.current = slider.scrollLeft;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;
    activeSlider.current.scrollLeft = scrollLeft.current - walk;
  };

  /* ============================
     UI
  ============================ */
  return (
    <section className="w-full py-10 md:py-20 overflow-hidden max-w-[100rem] mx-auto">
      {/* TOP SLIDER */}
      <div
        ref={slider1}
        className="w-full overflow-x-scroll scrollbar-hide cursor-grab"
        onMouseDown={(e) => startDrag(e, slider1.current)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={onDrag}
        onTouchStart={(e) => startDrag(e, slider1.current)}
        onTouchEnd={stopDrag}
        onTouchMove={onDrag}
      >
        <div className="flex w-max">
          {[...slides, ...slides, ...slides].map((item, i) => (
            <SlideCard key={`top-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* BOTTOM SLIDER */}
      <div
        ref={slider2}
        className="w-full overflow-x-scroll scrollbar-hide cursor-grab mt-12"
        onMouseDown={(e) => startDrag(e, slider2.current)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={onDrag}
        onTouchStart={(e) => startDrag(e, slider2.current)}
        onTouchEnd={stopDrag}
        onTouchMove={onDrag}
      >
        <div className="flex w-max">
          {[...slides, ...slides, ...slides].map((item, i) => (
            <SlideCard key={`bottom-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   SLIDE CARD
============================ */
function SlideCard({ item }) {
  return (
    <div className="w-[400px] lg:w-[600px] mx-6 flex-shrink-0 backdrop-blur-lg rounded-2xl p-6">
      <div className="mb-4 flex justify-center">
        <div className="relative w-full rounded-xl p-4 border-2 border-dashed border-[#70C879] aspect-[16/9]">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 600px"
            className="object-cover p-2 md:p-3 rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold">{item.title}</h3>
      <p className="text-base md:text-lg leading-relaxed font-medium">
        {item.desc}
      </p>
    </div>
  );
}
