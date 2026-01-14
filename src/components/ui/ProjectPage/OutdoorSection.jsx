"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import PillerAnimation from "@/components/animation/PillerAnimation"
import SectionTitle from "@/components/common/Headers/SectionTitle"
import Container from "@/components/common/layout/Container"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Outdoor LED Screen – Dubai, UAE",
    desc: "Morem ipsum dolor sit amet...",
    image: "/assets/images/test.png",
  },
  {
    title: "Outdoor LED Screen – Dubai, UAE",
    desc: "Morem ipsum dolor sit amet...",
    image: "/assets/images/test.png",
  },
  {
    title: "Outdoor LED Screen – Dubai, UAE",
    desc: "Morem ipsum dolor sit amet...",
    image: "/assets/images/test.png",
  },
  {
    title: "Outdoor LED Screen – Dubai, UAE",
    desc: "Morem ipsum dolor sit amet...",
    image: "/assets/images/test.png",
  },
]

export default function OutdoorSection() {
  const cardsRef = useRef([])

 useEffect(() => {
  cardsRef.current.forEach((card, i) => {
    const fromX = i % 2 === 0 ? -150 : 150

    gsap.fromTo(
      card,
      {
        x: fromX,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    )
  })
}, [])


  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      <PillerAnimation />
      <Container>
        <div className="w-full flex flex-col justify-center px-6">

          <div className="flex justify-center mb-12">
            <SectionTitle title="Outdoor" />
          </div>

          <div className="space-y-6 max-w-6xl mx-auto w-full">
            {projects.map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="relative rounded-xl border-2 border-dashed border-[#70C879] bg-black"
              >
                <div className="flex flex-col md:flex-row md:h-[340px] p-4 md:px-8 rounded-xl overflow-hidden">
                  <div className="w-full md:w-1/2 py-6 text-white flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="relative w-full h-[200px] lg:h-[250px] xl:h-[300px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
