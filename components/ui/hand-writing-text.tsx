"use client";

import { motion } from "motion/react";
import React from "react";

interface HandWrittenTitleProps {
    title?: string;
    subtitle?: string;
    onClick?: () => void;
    className?: string;
}

export function HandWrittenTitle({
    title = "Hand Written",
    subtitle,
    onClick,
    className = "",
}: HandWrittenTitleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <motion.div 
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-full max-w-[300px] md:max-w-[350px] mx-auto py-8 md:py-12 cursor-pointer group ${className}`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 600"
                    initial="hidden"
                    animate="visible"
                    className="w-full h-full text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-125 origin-center"
                >
                    <motion.path
                        d="M 950 90 
                           C 1250 300, 1050 480, 600 520
                           C 250 520, 150 480, 150 300
                           C 150 120, 350 80, 600 80
                           C 850 80, 950 180, 950 180"
                        fill="none"
                        strokeWidth="15"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center pt-2 md:pt-4">
                <motion.h1
                    className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase flex items-center gap-2 group-hover:text-orange-500 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        className="text-sm md:text-base font-serif italic text-white/60 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}