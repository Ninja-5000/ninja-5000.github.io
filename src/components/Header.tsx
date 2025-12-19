"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import TypeIt from "typeit-react";

export default function Header() {
  const [showBigText, setShowBigText] = useState(false);
  const [showSmallText, setShowSmallText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBigText(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSocials = () => {
    document.getElementById("socials")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.065]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="relative z-10 mb-10 -mt-10"
      >
        <div className="relative">
          <Image
            src="/images/pizza-pfp.webp"
            alt="Carmelo Canavan"
            width={150}
            height={150}
            className="rounded-3xl animate-glow"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center max-w-4xl z-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-glow min-h-4">
          {showBigText && (
            <TypeIt
              options={{
                speed: 25,
                waitUntilVisible: true,
                cursor: true,
                cursorChar: "_",
              }}
              getBeforeInit={(instance) => {
                instance.type("Hey there, my name is Carmelo Canavan.");
                instance.exec(() => {
                  setShowSmallText(true);
                });
                return instance;
              }}
              getAfterInit={(instance) => {
                const cursor = document.querySelector(".ti-cursor");
                if (cursor instanceof HTMLElement) {
                  cursor.style.display = "none";
                }
                return instance;
              }}
            />
          )}
        </h1>

        <div className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed -mt-3.5 font-light">
          {showSmallText && (
            <TypeIt
              options={{
                speed: 15,
                waitUntilVisible: true,
                cursor: true,
                cursorChar: "_",
              }}
              getBeforeInit={(instance) => {
                instance
                  .type(
                    "<br/>I'm a full-stack developer who's fascinated by Robotics and AI."
                  )
                  .type(
                    "<br/>Proficient in Python, React, and dabbling in Node.js."
                  )
                  .type(
                    "<br/>Check out my socials and some of my projects below."
                  );
                return instance;
              }}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute bottom-12 z-10 cursor-pointer interactive"
        onClick={scrollToSocials}
      >
        <ChevronDown className="w-12 h-12 text-gray-400 animate-bounce" />
      </motion.div>
    </header>
  );
}
