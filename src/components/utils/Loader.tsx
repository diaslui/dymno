"use client";

import React, { useEffect } from "react";
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
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-indigo-700 flex flex-col items-center justify-center z-20 transition-opacity duration-300">
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
            {loaderText && <div className="text-white mt-12 text-xl">{loaderText}</div>}
            {loaderText && <div className="text-white mt-2 text-xl font-light">Isso pode demorar um pouco</div>}
        </div>
    );
}
