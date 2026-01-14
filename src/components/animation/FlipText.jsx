"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "./useInView";

export default function FlipText({ word }) {
  const [ref, inView] = useInView();
  const tl = useRef(null);

  useLayoutEffect(() => {
    const letters = ref.current.querySelectorAll(".flip-letter");

    tl.current = gsap.timeline({ paused: true });
    tl.current.fromTo(
      letters,
      { rotateX: -90, opacity: 0 },
      {
        rotateX: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    return () => tl.current?.kill();
  }, []);

  useLayoutEffect(() => {
    if (!tl.current) return;
    inView ? tl.current.play() : tl.current.reverse();
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-wrap">
      {word.split(" ").map((w, i) => (
        <span key={i} className="flex mr-2">
          {w.split("").map((char, j) => (
            <span key={j} className="flip-letter inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
