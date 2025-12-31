import React from "react";
import { ArrowUpRight } from "lucide-react";

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

export const Portfolio = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-sans font-bold leading-tight">
             Unsere <span className="serif-txt text-orange-500">Projekte</span><br />
             können sich<br />
             <span className="serif-txt text-white">sehen</span> lassen
           </h2>
        </div>

        {/* Updated Grid: 2 columns to balance 4 items perfectly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <a 
              key={index} 
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              {/* Aspect Ratio 4/3 */}
              <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-[#111]">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   loading="lazy"
                   decoding="async"
                   className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                 />
                 
                 {/* Button Overlay */}
                 <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                       <ArrowUpRight className="w-5 h-5" />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col items-start border-l border-white/20 pl-4 transition-all duration-300 group-hover:border-orange-500">
                 <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">{project.category}</span>
                 <h3 className="text-xl font-serif text-white group-hover:text-orange-500 transition-colors">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};