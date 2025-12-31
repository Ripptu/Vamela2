import React from 'react';
import { 
  GridBody,
  DraggableContainer,
  GridItem, 
} from "./ui/infinite-drag-scroll";

const rawImages = [
  "https://i.redd.it/nft65voowkz71.jpg",
  "https://cdn.dribbble.com/userupload/43563733/file/original-1a92801a3b8c8138a826cd0235688861.jpg?resize=752x&vertical=center",
  "https://i.postimg.cc/pTPCtyfc/Logo-neu.png",
  "https://i.postimg.cc/MKfgVYQk/html.png"
];

// Repeat images to fill the grid
const images = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  src: rawImages[i % rawImages.length],
  alt: `Inspiration ${i}`
}));

export const InspirationSection = () => {
  return (
    <div className="w-full relative z-20 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-transparent pointer-events-none z-10" />
      
      <div className="text-center mb-8 px-6 relative z-20">
         <p className="text-muted text-xs uppercase tracking-[0.2em] mb-3">Moodboard</p>
         <h3 className="text-4xl md:text-5xl font-script text-white/90">Fühl den Vibe</h3>
      </div>

      <DraggableContainer variant="masonry" className="h-[500px] md:h-[600px]">
        <GridBody>
          {images.map((image) => (
            <GridItem
              key={image.id}
              className="relative h-48 w-32 md:h-80 md:w-56 bg-neutral-900 rounded-lg overflow-hidden border border-white/5"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="pointer-events-none absolute h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};