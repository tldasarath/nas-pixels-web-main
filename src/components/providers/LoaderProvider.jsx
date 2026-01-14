"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoLoader from "@/components/loader/LogoLoader";

export default function LoaderProvider({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <LogoLoader />}
      {children}
    </>
  );
}
