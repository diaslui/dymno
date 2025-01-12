"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoaderProps {
  loaderText: string;
  showLogo?: boolean;
}

export default function Loader({
  loaderText = "",
  showLogo = true,
}: LoaderProps) {
  return (
    <div className="fixed inset-0 bg-indigo-700 flex flex-col gap-4 items-center justify-center z-20 transition-opacity duration-300">
      {showLogo && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/assets/img/w-dylogo.svg"
            alt="Logo"
            width={220}
            height={220}
          />
        </motion.div>
      )}
      {loaderText && <div className="text-white text-xl">{loaderText}</div>}
    </div>
  );
}
