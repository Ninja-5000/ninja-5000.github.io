"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { describe } from "node:test";

const projects = [
  {
    name: "My Web Profile",
    description: "What you're seeing right now.",
    url: "#",
    image: null,
    icon: <Globe className="w-12 h-12" />,
    color: "from-orange-600 to-red-600",
  },
  {
    name: "Ender Dragon",
    description:
      "An interactive Ender Dragon that listens and responds to you. Features flapping wings, moving mouth, ambient sounds, and live transcription of the conversation. Powered by Gemini.",
    url: "/Ender-Dragon",
    preview: "/images/ender-dragon-preview.webp",
    color: "from-black to-purple-600",
  },
  {
    name: "N.A.V.I.A.C.",
    description:
      "A sophisticated Discord AI chatbot, with a strong, witty personality.",
    url: "naviac/index.html",
    image: "/images/nav-pfp.webp",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "A.V.I.A.C.",
    description:
      "A nonsensical AI chatbot using Markov Chains and advanced NLP strategies.",
    url: "https://discord.com/oauth2/authorize?client_id=1270309745265475614",
    image: "/images/aviac-pfp.webp",
    color: "from-green-600 to-emerald-600",
  },
  {
    name: "CrossChat",
    description:
      "A Discord-to-Discord cross communication bot that enables you to chat with other Discord servers from your own.",
    url: "https://discord.com/oauth2/authorize?client_id=1303986285765070879",
    image: "/images/crosschat-pfp.webp",
    color: "from-gray-600 to-blue-600",
  },
  {
    name: "Joshua from TWEWY",
    description:
      "(2022) A weak LLM with a personality based on the character Joshua from the game The World Ends With You \u2014 fine-tuned on Microsoft's DialoGPT-medium.",
    url: "https://discord.com/oauth2/authorize?client_id=946021874339565598",
    image: "/images/joshua-pfp.webp",
    color: "from-purple-600 to-pink-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
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
          Showcase
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={project.url}
              target={project.url.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              whileTap={{ y: 0 }}
              className="glass glass-hover rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center group relative overflow-hidden transition-all duration-300"
              style={{ willChange: "transform" }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              />

              <div className="relative z-10 w-full">
                {project.preview ? (
                  <div className="absolute inset-0 -mt-10 -mx-8 md:-mx-10">
                    <div className="relative h-42 w-full">
                      <Image
                        src={project.preview}
                        alt={`${project.name} preview`}
                        fill
                        className="object-cover rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900" />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 flex items-center justify-center">
                    {project.image ? (
                      <div className="relative w-20 h-20 md:w-24 md:h-24">
                        <Image
                          src={project.image}
                          alt={`${project.name} logo`}
                          fill
                          className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="text-white/90 group-hover:text-white transition-colors">
                        {project.icon}
                      </div>
                    )}
                  </div>
                )}

                <div className={project.preview ? "mt-40" : ""}>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 uppercase tracking-wide">
                    {project.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 italic leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-6 h-6 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
