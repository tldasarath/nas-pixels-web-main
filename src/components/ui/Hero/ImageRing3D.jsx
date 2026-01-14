"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zen_Dots } from "next/font/google";

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});

const DEPTH = 800;

const defaultImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/id/${i + 32}/600/400/`
);

const isVideo = (url = "") => url.endsWith(".mp4") || url.endsWith(".webm");

export default function ImageRing3D({ images = defaultImages }) {
  const IMAGE_COUNT = images.length;
  const ROTATION_STEP = 360 / IMAGE_COUNT;

  const ringRef = useRef(null);
  const imgsRef = useRef([]);
  const titlesRef = useRef([]);
  const xPos = useRef(0);
  const autoRotateTween = useRef(null);

  /* ================= TITLES ================= */
  const titles = [
    [
      "Transform Visual Communication",
      "with Enterprise-Grade LED Display Solutions",
    ],
    ["Power Your Brand Presence", "with High-Impact LED Experiences"],
    ["Enterprise LED Systems", "Engineered for Performance & Scale"],
  ];

  useEffect(() => {
    const ring = ringRef.current;
    const imgs = imgsRef.current;

    /* ================= TITLE LOOP ANIMATION ================= */
    const tl = gsap.timeline({ repeat: -1 });

    titlesRef.current.forEach((titleEl, index) => {
      // Enter from right
      tl.fromTo(
        titleEl,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        }
      )
        // Stay visible
        .to({}, { duration: 2 })
        // Exit to left
        .to(titleEl, {
          x: -120,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        });
    });

    /* ================= RING INIT ================= */
    gsap.set(ring, {
      rotationY: 180,
      transformStyle: "preserve-3d",
      cursor: "grab",
    });

    gsap.set(imgs, {
      rotateY: (i) => i * -ROTATION_STEP,
      transformOrigin: `50% 50% ${DEPTH}px`,
      z: -DEPTH,
      backfaceVisibility: "hidden",
    });

    autoRotateTween.current = gsap.to(ring, {
      rotationY: "-=360",
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    gsap.from(imgs, {
      y: 200,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
    });

    /* ================= DRAG ================= */
    const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const dragStart = (e) => {
      xPos.current = getClientX(e);
      autoRotateTween.current.pause();
      gsap.set(ring, { cursor: "grabbing" });
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag);
    };

    const drag = (e) => {
      const delta = getClientX(e) - xPos.current;
      xPos.current = getClientX(e);

      gsap.to(ring, {
        rotationY: `-=${delta}`,
        duration: 0.3,
      });
    };

    const dragEnd = () => {
      autoRotateTween.current.resume();
      gsap.set(ring, { cursor: "grab" });
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
    };

    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);

    return () => {
      tl.kill();
      autoRotateTween.current?.kill();
      window.removeEventListener("mousedown", dragStart);
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("touchstart", dragStart);
      window.removeEventListener("touchend", dragEnd);
    };
  }, []);

  /* ================= JSX ================= */
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* HERO TITLES */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center min-h-[45vh] px-4 text-center">
        {titles.map(([line1, line2], i) => (
          <h1
            key={i}
            ref={(el) => (titlesRef.current[i] = el)}
            className={`${zenDots.className} absolute text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl opacity-0`}
          >
            <span className="block">{line1}</span>
            <span className="block mt-2">{line2}</span>
          </h1>
        ))}
      </div>

      {/* 3D RING */}
      <div
        className="absolute inset-x-0 bottom-[18%] h-[50vh]"
        style={{ perspective: "2000px" }}
      >
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 w-full h-full"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => (imgsRef.current[i] = el)}
              className="absolute left-1/2 top-1/2 w-[450px] md:w-[500px] h-[300px] md:h-[350px] -ml-[250px] -mt-[175px] rounded-xl overflow-hidden"
            >
              {isVideo(src) ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <img
                  src={src}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
