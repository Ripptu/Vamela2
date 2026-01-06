import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, ArrowRight } from "lucide-react"

// Real Project Data
const projects = [
  {
    title: "Thomas Rott",
    category: "Handwerk & Service",
    image: "https://higgsfield.ai/_next/image?url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2F29db4c14-6cb2-4895-8060-5ba48c7082e4.png&w=1080&q=75",
    url: "https://thomasrott.de"
  },
  {
    title: "Push MMA",
    category: "Sports & Community",
    image: "https://higgsfield.ai/_next/image?url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fd7b360e0-a8de-4f19-9ae9-5b7678e10796.png&w=1080&q=75",
    url: "https://pushmma.netlify.app"
  },
  {
    title: "Barber Moosburg",
    category: "Lifestyle",
    image: "https://higgsfield.ai/_next/image?url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2F66216d36-d005-40de-af00-06f0f9ddc245.png&w=1080&q=75",
    url: "https://barbermoosburg.netlify.app"
  },
  {
    title: "Kleeberger Sanierung",
    category: "Construction",
    image: "https://higgsfield.ai/_next/image?url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2F94316c16-a657-43c4-a7cd-8840d782ed32.png&w=1080&q=75",
    url: "https://kleeb.netlify.app"
  }
];

interface Card {
  id: number
  projectIndex: number
}

const initialCards: Card[] = [
  { id: 1, projectIndex: 0 },
  { id: 2, projectIndex: 1 },
  { id: 3, projectIndex: 2 },
]

const positionStyles = [
  { scale: 1, y: 0, zIndex: 3, opacity: 1 },
  { scale: 0.95, y: -25, zIndex: 2, opacity: 0.6 },
  { scale: 0.9, y: -50, zIndex: 1, opacity: 0.3 },
]

function CardContent({ projectIndex }: { projectIndex: number }) {
  const data = projects[projectIndex]

  return (
    <div className="flex w-full flex-col p-4 md:p-5">
      {/* Image Container - Height adapts to image aspect ratio */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 group">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          draggable={false}
          className="w-full h-auto select-none object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      
      {/* Footer Info */}
      <div className="flex w-full items-end justify-between gap-2 mt-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest">{data.category}</span>
          <span className="truncate text-xl md:text-2xl font-serif text-white">{data.title}</span>
        </div>
        <a 
            href={data.url} 
            target="_blank"
            rel="noreferrer" 
            className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 cursor-pointer select-none items-center justify-center rounded-full bg-white text-black hover:bg-orange-500 hover:text-white transition-all hover:scale-110 shadow-lg active:scale-95"
            aria-label="Visit Website"
        >
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      </div>
    </div>
  )
}

interface AnimatedCardProps {
  card: Card
  index: number
  isAnimating: boolean
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  card,
  index,
  isAnimating,
}) => {
  const style = positionStyles[index] || positionStyles[2];
  
  // Custom exit animation for the top card
  const exitAnimation = {
    y: 100,
    opacity: 0,
    scale: 1.05,
    rotateX: -5,
    transition: { duration: 0.35, ease: "easeIn" as const }
  };

  // Entry animation for the new back card
  const enterAnimation = {
    y: -60,
    opacity: 0,
    scale: 0.85,
  };

  return (
    <motion.div
      key={card.id}
      initial={index === 2 ? enterAnimation : false}
      animate={{ 
          scale: style.scale, 
          y: style.y,
          opacity: style.opacity,
          zIndex: style.zIndex 
      }}
      exit={index === 0 ? exitAnimation : undefined}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
        mass: 1
      }}
      // Dynamic Aspect Ratios: removed fixed aspect classes to let content drive height
      className="absolute bottom-0 w-[90vw] max-w-[450px] md:w-[75vw] md:max-w-[900px] origin-bottom"
    >
      <div className="w-full h-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#141414] shadow-2xl backdrop-blur-md">
        <CardContent projectIndex={card.projectIndex} />
      </div>
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true)

    // Calculate next project index cyclically
    const lastCard = cards[cards.length - 1];
    const nextProjectIndex = (lastCard.projectIndex + 1) % projects.length;

    // Remove first card, add new card at end
    setTimeout(() => {
        setCards((prev) => [
            ...prev.slice(1), 
            { id: nextId, projectIndex: nextProjectIndex }
        ]);
        setNextId((prev) => prev + 1);
        setIsAnimating(false);
    }, 150); // Small delay to allow exit animation to start visually
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* 
         Container Height Adjustment: 
         - Increased height to accommodate potentially taller aspect ratios
         - Mobile: 420px (was 380px)
         - Desktop: 700px (was 600px)
      */}
      <div className="relative h-[420px] md:h-[700px] w-full flex justify-center items-end overflow-visible px-4">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => (
            <AnimatedCard 
                key={card.id} 
                card={card} 
                index={index} 
                isAnimating={isAnimating} 
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Control */}
      <div className="relative z-10 mt-6 md:mt-8 flex w-full items-center justify-center">
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="group flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.05] px-8 font-sans font-medium text-white transition-all hover:bg-white/10 hover:border-orange-500/50 disabled:opacity-50"
        >
          <span>Nächstes Projekt</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}