"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  const [hideScrollbar, setHideScrollbar] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      setHideScrollbar(true);
    } else {
      setTimeout(() => {
        document.body.style.overflow = "unset";
        setHideScrollbar(false);
      }, 800);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
          className="fixed inset-0 z-99999 pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black"
          />

          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
