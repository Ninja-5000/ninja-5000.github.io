"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, X, RefreshCcw, CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

const messages = [
  "We looked everywhere, even behind the div.",
  "This URL is purely theoretical.",
  "The server shrugged.",
  "It's gone. Like, really gone.",
  "No page here, but you still look fantastic today.",
  "Looks like this link missed the memo.",
  "You found empty space. Comfortable, isn't it?",
  "We're as confused as you are.",
  "This page is hiding, try whistling.",
  "This path leads nowhere.",
  "The pixels you are looking for are in another castle.",
];

const getMessageForUrl = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const hash = segments.reduce((acc, seg) => acc + seg.charCodeAt(0), 0);
  const randomOffset = Math.floor(Math.random() * (messages.length / 2));
  const finalIndex = (hash + randomOffset) % messages.length;
  return messages[finalIndex];
};

function ZipCircle({ size = 220 }: { size?: number }) {
  const controls = useAnimation();
  const prev = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let mounted = true;

    const getRandomPos = (w: number, h: number) => {
      const padding = size;

      return {
        x: Math.random() * (w - padding * 2) + padding / 2,
        y: Math.random() * (h - padding * 2) + padding / 2,
      };
    };

    const getFarNextPos = (current: { x: number; y: number }) => {
      if (typeof window === "undefined") return { x: 0, y: 0 };
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDistance = Math.min(w, h) * 0.4;

      let next;
      let dist;
      let attempts = 0;

      do {
        next = getRandomPos(w, h);
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        attempts++;
      } while (dist < minDistance && attempts < 10);

      return next;
    };

    (async () => {
      if (typeof window !== "undefined") {
        const start = getRandomPos(window.innerWidth, window.innerHeight);
        prev.current = start;
        await controls.start({
          x: start.x,
          y: start.y,
          scaleX: 1,
          scaleY: 1,
          transition: { duration: 0 },
        });
      }

      while (mounted) {
        const next = getFarNextPos(prev.current);

        const dx = next.x - prev.current.x;
        const dy = next.y - prev.current.y;
        const isHorizontal = Math.abs(dx) > Math.abs(dy);

        await controls.start({
          x: next.x,
          y: next.y,
          scaleX: isHorizontal ? 1.5 : 0.6,
          scaleY: isHorizontal ? 0.6 : 1.5,
          transition: {
            duration: 0.4,
            ease: "easeInOut",
          },
        });

        // landing wobble
        await controls.start({
          scaleX: 1,
          scaleY: 1,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 12,
          },
        });

        await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

        prev.current = next;
      }
    })();

    return () => {
      mounted = false;
    };
  }, [controls, size]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={controls}
        className="absolute top-0 left-0 rounded-full blur-xl"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), rgba(99,102,241,0.04) 40%), radial-gradient(circle at 70% 70%, rgba(139,92,246,0.08), rgba(59,130,246,0.02) 40%)",
        }}
      />
    </div>
  );
}
export default function NotFound() {
  const [message, setMessage] = useState("");
  const [showMiniGame, setShowMiniGame] = useState(false);

  useEffect(() => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/unknown";
    setMessage(getMessageForUrl(pathname));
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 relative">
        <ZipCircle size={260} />
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/8 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <div className="mb-6">
            <h1 className="select-none text-[160px] md:text-[260px] leading-[0.8] font-extrabold bg-clip-text text-transparent bg-linear-to-b from-black to-blue-600 drop-shadow-[0_0_30px_rgba(99,102,241,0.12)] animate-blink">
              <span>4</span>
              <span
                className="mx-6 relative hover:border-transparent hover:border-20 transition-all cursor-pointer"
                onClick={() => setShowMiniGame(true)}
              >
                0
              </span>
              <span>4</span>
            </h1>
          </div>

          {/* Dynamic message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">
              Page Not Found
            </p>
            <p className="text-xl text-gray-400 min-h-9">{`${message}`}</p>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-4"
          >
            <Link href="/">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.03 },
                  // tap: { scale:  },
                }}
                className="interactive glass px-8 py-3 rounded-lg font-medium text-white transition-all flex items-center gap-2 justify-center"
              >
                <motion.span
                  variants={{
                    hover: { x: -5 },
                    tap: { x: 0 },
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.span>
                Return to Base
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (typeof window !== "undefined") window.history.back();
              }}
              className="interactive glass glass-hover px-8 py-3 rounded-lg font-medium text-white transition-all"
            >
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
        {showMiniGame && (
          <MinigameModal onClose={() => setShowMiniGame(false)} />
        )}
      </div>
    </>
  );
}

const MinigameModal = ({ onClose }: { onClose: () => void }) => {
  const [grid, setGrid] = useState<number[]>(Array(16).fill(0));
  const [targetIndex, setTargetIndex] = useState(0);
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setTargetIndex(Math.floor(Math.random() * 16));
  }, []);

  const handleTileClick = (index: number) => {
    if (found) return;
    setAttempts((p) => p + 1);

    if (index === targetIndex) {
      setFound(true);
    } else {
      const newGrid = [...grid];
      newGrid[index] = -1;
      setGrid(newGrid);
    }
  };

  const resetGame = () => {
    setGrid(Array(16).fill(0));
    setTargetIndex(Math.floor(Math.random() * 16));
    setFound(false);
    setAttempts(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/60 backdrop-blur-sm"
    >
      <div className="bg-[#111] border border-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-white mb-1">
            {found
              ? `You found it in ${attempts} ${
                  attempts === 1 ? "click" : "clicks"
                }`
              : "Find the Missing Page"}
          </h3>
          <p className="text-sm text-gray-400">
            {found
              ? `But it's still a 404.`
              : "The page is hiding in one of these blocks."}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {grid.map((status, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTileClick(i)}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-colors
                ${
                  status === -1
                    ? "bg-red-500/20 text-red-500 border border-red-500/30 cursor-default"
                    : ""
                }
                ${found && i === targetIndex ? "bg-green-500 text-black" : ""}
                ${
                  status === 0 && (!found || i !== targetIndex)
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : ""
                }
              `}
            >
              {status === -1 && "404"}
              {found && i === targetIndex && "HERE"}
              {status === 0 && (!found || i !== targetIndex) && (
                <CircleQuestionMark className="w-6 h-6 opacity-20" />
              )}
            </motion.button>
          ))}
        </div>

        {found && (
          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200"
            >
              <RefreshCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
