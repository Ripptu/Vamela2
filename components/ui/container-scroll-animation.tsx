import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    // Mobile: Start smaller (0.85) but grow slightly larger than 1 (1.05) to feel immersive/in-your-face
    return isMobile ? [0.85, 1.05] : [1.05, 1];
  };

  // 1. Phone enters from bottom
  const translateContainer = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  // 2. Rotate from flat to upright
  const rotateX = useTransform(scrollYProgress, [0.1, 0.6], [45, 0]);
  
  // 3. Scale up slightly
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 overflow-hidden"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative flex flex-col items-center justify-center"
        style={{
          perspective: "1000px", // Reduced perspective for mobile so it doesn't look too distorted
        }}
      >
        <Header translate={translateContainer} titleComponent={titleComponent} />
        
        <Iphone15Pro 
            rotateX={rotateX} 
            scale={scale} 
            translate={translateContainer} 
        >
            {children}
        </Iphone15Pro>

      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center mb-8 md:mb-16 relative z-50 px-4"
    >
      {titleComponent}
    </motion.div>
  );
};

interface IphoneProps {
    rotateX: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children?: React.ReactNode;
}

const Iphone15Pro = ({ rotateX, scale, translate, children }: IphoneProps) => {
    return (
        <motion.div
            style={{
                scale,
                y: translate,
                rotateX: rotateX,
                transformStyle: "preserve-3d",
            }}
            // Adjusted Mobile Width to be wider (w-[90vw]) for better readability of chat
            className="relative w-[90vw] md:w-[380px] h-[650px] md:h-[780px] flex flex-col items-center select-none touch-none"
        >
            {/* ==================== PHONE BODY (Titanium Frame) ==================== */}
            <div 
                className="relative w-full h-full bg-[#1c1c1e] rounded-[45px] md:rounded-[55px] shadow-[0_50px_100px_rgba(0,0,0,0.5),inset_0_0_0_2px_rgba(255,255,255,0.1)] p-3 md:p-4 z-20"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Side Buttons (Volume/Power) - positioned absolute relative to frame */}
                <div className="absolute top-32 -left-[2px] w-[3px] h-10 bg-[#333] rounded-l-md" /> {/* Volume Up */}
                <div className="absolute top-44 -left-[2px] w-[3px] h-10 bg-[#333] rounded-l-md" /> {/* Volume Down */}
                <div className="absolute top-40 -right-[2px] w-[3px] h-16 bg-[#222] rounded-r-md" /> {/* Power */}

                {/* Inner Black Bezel */}
                <div className="relative w-full h-full bg-black rounded-[38px] md:rounded-[48px] overflow-hidden border-[6px] border-black shadow-inner">
                    
                    {/* DYNAMIC ISLAND */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-7 bg-black z-50 rounded-full flex justify-center items-center">
                         {/* Camera Lens Reflection */}
                         <div className="absolute right-3 w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                    </div>

                    {/* Glossy Screen Reflection (Glass) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-white/[0.02] z-40 pointer-events-none rounded-[38px] md:rounded-[48px]" />

                    {/* Actual Content */}
                    <div className="w-full h-full relative z-30 bg-[#0b141a] overflow-hidden rounded-[32px] md:rounded-[42px]">
                        {children}
                    </div>
                </div>

                {/* Outer Frame Shine (Titanium Look) */}
                <div className="absolute inset-0 rounded-[45px] md:rounded-[55px] ring-1 ring-white/10 pointer-events-none z-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Thickness/Depth of the phone (Sides) */}
            <div 
                className="absolute inset-0 bg-[#2a2a2a] rounded-[45px] md:rounded-[55px]" 
                style={{ 
                    transform: "translateZ(-15px)", 
                    width: "100%", 
                    height: "100%" 
                }} 
            />

        </motion.div>
    )
}