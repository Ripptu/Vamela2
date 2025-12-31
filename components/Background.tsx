import React, { useEffect, useState, useMemo } from 'react';

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
}

export const Background: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to range -1 to 1 for gentle parallax
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Shooting Star Logic
  useEffect(() => {
    const spawnStar = () => {
      const id = Date.now();
      const newStar = {
        id,
        top: Math.random() * 40, // Only in top 40% of screen
        left: Math.random() * 50 + 50, // Right half
        delay: 0,
      };
      
      setShootingStars(prev => [...prev, newStar]);

      // Remove after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, 2000);
    };

    // Random interval for shooting stars
    const loop = () => {
      const timeout = Math.random() * 5000 + 4000; // Relaxed interval (4-9s)
      setTimeout(() => {
        spawnStar();
        loop();
      }, timeout);
    };

    loop();
  }, []);

  // Generate static stars once
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 1, // Small, subtle stars
      opacity: Math.random() * 0.5 + 0.2,
      animationDelay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0a0a0a]">
      
      {/* Removed static top gradient to ensure clear starry header */}

      {/* Stars Layer with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute w-[120px] h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </div>
      
      {/* Subtle Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

    </div>
  );
};