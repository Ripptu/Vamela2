import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

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

export const Portfolio = () => {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      
      {/* Header - Reduced Margin (mb-8 instead of mb-24) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h2 className="text-4xl md:text-8xl leading-[0.9] text-white mb-4">
             <span className="font-sans font-black block">Ausgewählte</span>
             <span className="serif-txt text-orange-500 block">Arbeiten.</span>
           </h2>
        </div>
        <div className="md:mb-4">
            <p className="inline-block px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-light">
             Horizontal Scrollen →
            </p>
        </div>
      </div>

      {/* "Band" Ansicht - Horizontal Scrolling Rail */}
      <div className="w-full overflow-x-auto pb-8 px-6 md:px-12 no-scrollbar cursor-grab active:cursor-grabbing">
        <div className="flex gap-6 md:gap-8 w-max">
            {projects.map((project, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <a href={project.url} target="_blank" rel="noreferrer" className="block relative">
                        {/* Image Card */}
                        <div className="w-[80vw] md:w-[600px] aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-[#111] relative">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            
                            {/* Floating Project Details */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div>
                                    <span className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-serif text-white">
                                        {project.title}
                                    </h3>
                                </div>
                                
                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 hover:!bg-orange-500 hover:!text-white">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </a>
                </motion.div>
            ))}
            
            {/* End Spacer/CTA Card */}
            <div className="w-[40vw] md:w-[300px] flex items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                <p className="text-white/30 font-mono text-sm uppercase tracking-widest text-center">
                    Dein Projekt <br/> könnte hier stehen.
                </p>
            </div>
        </div>
      </div>

    </section>
  );
};