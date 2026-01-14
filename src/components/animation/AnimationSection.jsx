import { useEffect, useRef, useState } from "react";

export function AnimatedSection({ id, title, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`
        scroll-mt-28 space-y-4
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <h2 className="text-xl md:text-2xl font-semibold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}