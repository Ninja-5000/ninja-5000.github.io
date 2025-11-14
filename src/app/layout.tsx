import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Carmelo Canavan - Full-Stack Developer Portfolio",
  description:
    "Full-stack developer fascinated by Robotics and AI. Proficient in Python, React, and Node.js.",
  icons: {
    icon: "/images/pizza-pfp.webp",
  },
  openGraph: {
    title: "Carmelo Canavan",
    description: "A web profile and portfolio",
    images: ["/images/pizza-pfp.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat antialiased">{children}</body>
    </html>
  );
}
