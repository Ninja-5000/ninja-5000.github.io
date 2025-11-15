"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const socials = [
  {
    name: "Discord",
    handle: "ninja_5000#0",
    url: "http://discord.gg/u7dqJf88SX",
    color: "from-indigo-600 to-blue-600",
    icon: <img src="/images/discord-mark-white.svg" alt="Discord logo" />,
  },
  {
    name: "GitHub",
    handle: "Ninja-5000",
    url: "https://github.com/Ninja-5000",
    color: "from-gray-700 to-gray-900",
    icon: <img src="/images/github-mark-white.svg" alt="GitHub logo" />,
  },
  {
    name: "X (Twitter)",
    handle: "@CarmeloCan745",
    url: "https://twitter.com/CarmeloCan745",
    color: "from-black to-gray-800",
    icon: <img src="/images/x-logo.svg" className="h-30" alt="X logo" />,
  },
  {
    name: "Mastodon",
    handle: "@ninja_5000@mastodon.social",
    url: "https://mastodon.social/@ninja_5000",
    color: "from-purple-900 to-indigo-900",
    icon: <img src="/images/mastodon-white-text.svg" alt="Mastodon logo" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Socials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="socials"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase tracking-wider text-glow"
        >
          Socials
        </motion.h2>

        {/* Status Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap shrink-0 items-center justify-center gap-5 mb-15"
        >
          <Image
            src="https://api.statusbadges.me/badge/status/707170199861854209?style=for-the-badge"
            alt="status"
            width={150}
            height={40}
            className="w-auto h-7"
            unoptimized
          />
          <Image
            src="https://api.statusbadges.me/badge/vscode/707170199861854209?style=for-the-badge"
            alt="vscode"
            width={150}
            height={40}
            className="w-auto h-7"
            unoptimized
          />
          <Image
            src="https://api.statusbadges.me/badge/playing/707170199861854209?style=for-the-badge"
            alt="playing"
            width={150}
            height={40}
            className="w-auto h-7"
            unoptimized
          />
          <a
            href="https://api.statusbadges.me/openspotify/707170199861854209"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://api.statusbadges.me/badge/spotify/707170199861854209?style=for-the-badge"
              alt="spotify"
              width={150}
              height={40}
              className="w-auto h-7"
              unoptimized
            />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              whileTap={{ y: 0 }}
              className={`glass glass-hover rounded-2xl p-8 py-18 flex flex-col items-center justify-center text-center group relative overflow-hidden transition-all duration-300`}
              style={{ willChange: "transform" }}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="mb-4 text-white/90 group-hover:text-white transition-colors">
                  {social.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 uppercase tracking-wide">
                  {social.name}
                </h3>
                <p className="text-sm text-gray-400 italic">{social.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
