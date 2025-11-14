"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const coords = useRef({ x: 0, y: 0 });
  const circleCoords = useRef<{ x: number; y: number }[]>(
    Array(17)
      .fill(null)
      .map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        circle.style.left = `${x - 13}px`;
        circle.style.top = `${y - 13}px`;

        const scale =
          (circlesRef.current.length - index) / circlesRef.current.length;
        circle.style.transform = `scale(${scale})`;

        circleCoords.current[index] = { x, y };

        const nextCircle =
          circleCoords.current[index + 1] || circleCoords.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    const handleMouseEnter = () => {
      circlesRef.current.forEach((circle) => {
        if (circle) {
          circle.style.width = "33px";
          circle.style.height = "33px";
        }
      });
    };

    const handleMouseLeave = () => {
      circlesRef.current.forEach((circle) => {
        if (circle) {
          circle.style.width = "26px";
          circle.style.height = "26px";
        }
      });
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-9998 hidden md:block"
    >
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) circlesRef.current[i] = el;
          }}
          className="circle absolute w-7 h-7 bg-blue-700/40 rounded-full transition-[width,height] duration-200"
          style={{
            mixBlendMode: "screen",
          }}
          data-x="0"
          data-y="0"
        />
      ))}
    </div>
  );
}
