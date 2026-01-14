"use client"
import React from "react";
import Link from "next/link";
import { ModernButton } from "../../common/Button/ModernButton";
import Container from "../../common/Layout/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/common/Headers/SectionTitle";

const AboutSection = () => {
  const router = useRouter()
  return (
    <section className="w-full  py-10 md:py-20  flex items-center">
      <Container>
        <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="">
            <div className="flex items-center gap-3">
              <SectionTitle title="About Us" />
            </div>

            <p className=" text-lg md:text-xl  font-medium leading-relaxed  py-4">
              We specialize in providing high-quality commercial display solutions designed for modern businesses. From LED walls and digital signage to professional-grade monitors and control room displays, we supply reliable, high-performance screens built to deliver clarity, durability, and visual impact.

            </p>
            <p className=" text-lg md:text-xl  font-medium leading-relaxed mb-8 ">
              With a focus on certified products, expert technical support, and efficient installation, we help businesses create powerful visual environments that support communication, branding, and operations. Our goal is simple — to provide the right display technology that works flawlessly in every space.

            </p>

            {/* <Link
            href="/about"
            className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition"
          >
            More About Us
            <span className="text-lg">→</span>
          </Link> */}
            <ModernButton text="Learn Our Story" onClick={() => router.push("#our-story")} />
          </div>

          {/* Right Image/Card */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-lg h-[300px] relative rounded-xl overflow-hidden 
                  shadow-[0_0_30px_rgba(34,197,94,0.6)] 
                  hover:shadow-[0_0_45px_rgba(34,197,94,0.8)] 
                  transition-shadow duration-300">
              <Image
                src="/assets/images/mission_vision/about.png"
                alt="Hero image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>


        </div>
      </Container>
    </section >
  );
};

export default AboutSection;
