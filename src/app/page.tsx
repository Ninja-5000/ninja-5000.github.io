"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Socials from "@/components/Socials";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  if (typeof window !== "undefined") {
    // Use both methods for better compatibility
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={loading} />
      <CustomCursor />
      <main className="relative min-h-screen">
        <Header />
        <Socials />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
