'use client';

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function CurvedHeroArc() {
  const swiperRef = useRef(null);

  const images = [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594738957602-a4a53e2e9d6a?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=400&fit=crop',
  ];

  return (
    <div className="relative w-full h-screen bg-yellow-400 overflow-hidden flex items-center justify-center">
      {/* Scroll Gallery Container */}
      <div
        className="scroll-gallery-container relative w-full h-full flex items-center justify-center"
        style={{
          transform: 'translate(0%, 10%)',
        }}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, FreeMode]}
          spaceBetween={30}
          slidesPerView="auto"
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          className="curved-swiper w-full"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            background: 'transparent',
          }}
        >
          {/* Duplicate images for seamless loop */}
          {[...images, ...images].map((image, index) => (
            <SwiperSlide
              key={index}
              className="gallery-slide"
              style={{
                width: '264px',
                height: '400px',
                marginRight: '30px',
                flex: '0 0 264px',
              }}
            >
              <div
                className="image-container"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--current-bg-color, rgba(0,0,0,0.1))',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
                }}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Edge Fade Overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-yellow-400 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-yellow-400 to-transparent pointer-events-none z-10" />
    </div>
  );
}