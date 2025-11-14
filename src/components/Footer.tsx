"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-8 px-4 bg-dark-300 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center"
      >
        <p className="text-sm text-gray-500 italic">&copy; 2025 ninja_5000</p>
      </motion.div>
    </footer>
  );
}
