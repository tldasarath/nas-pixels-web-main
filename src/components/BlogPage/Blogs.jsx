"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "../common/layout/Container";
import PillerAnimation from "../animation/PillerAnimation";
import { blogs as fallbackBlogs } from "@/data/blogs";
import { fetchBlogs } from "@/api/api.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ITEMS_PER_PAGE = 6;
const PAGINATION_COLOR = "#70C879";

export default function BlogPage() {
  const sectionRef = useRef(null);

  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FETCH BLOGS (API → FALLBACK)
  ========================= */
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetchBlogs();

        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const normalized = res.data.map((blog) => ({
            id: blog._id,
            title: blog.title,
            desc: blog.excerpt,
            img: blog.image,
            slug: blog.url ,
          }));

          setBlogs(normalized);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch {
        setBlogs(fallbackBlogs);
      } finally {
        setIsReady(true);
      }
    };

    loadBlogs();
  }, []);

  /* =========================
     PAGINATION LOGIC
  ========================= */
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =========================
     SCROLL TO TOP ON PAGE CHANGE
  ========================= */
  const scrollToTop = () => {
    const top = sectionRef.current?.offsetTop ?? 0;

    window.scrollTo({
      top: top - 20,
      behavior: "smooth",
    });
  };

  /* =========================
     GSAP ANIMATION
  ========================= */
  useEffect(() => {
    if (!isReady) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const cards = gsap.utils.toArray(".blog-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, [isReady, currentPage]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-10 md:py-20 px-4"
    >
      <PillerAnimation />

      <Container>
        <div className="max-w-7xl mx-auto space-y-16">

          {/* ================= BLOG GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {paginatedBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="blog-card group rounded-xl overflow-hidden bg-[#16572D]
                hover:shadow-[0_0_30px_rgba(0,255,120,0.3)] transition"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover
                    group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">
                    {blog.title}
                  </h2>
                  <p className="text-sm">{blog.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12 flex-wrap">

              {/* Previous */}
              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => p - 1);
                  scrollToTop();
                }}
              >
                Prev
              </PaginationButton>

              {/* Pages */}
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationButton
                  key={i}
                  active={currentPage === i + 1}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    scrollToTop();
                  }}
                >
                  {i + 1}
                </PaginationButton>
              ))}

              {/* Next */}
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => p + 1);
                  scrollToTop();
                }}
              >
                Next
              </PaginationButton>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================
   PAGINATION BUTTON
========================= */
function PaginationButton({ children, active, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg border-2 border-dashed
        transition-all duration-300
        ${
          active
            ? "bg-[#70C879] text-black"
            : "hover:bg-[#70C879]/20"
        }
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
      style={{ borderColor: "#70C879" }}
    >
      {children}
    </button>
  );
}
