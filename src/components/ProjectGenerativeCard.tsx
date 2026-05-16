"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Project } from '@/lib/portfolio-data';

// Generative Art Canvas Component
const GenerativeArtCanvas = ({ isHovered }: { isHovered: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lines: Line[] = [];
        const numLines = 30;

        class Line {
            x: number;
            y: number;
            speed: number;
            angle: number;
            length: number;
            color: string;

            constructor() {
                this.x = Math.random() * (canvas?.width || 400);
                this.y = Math.random() * (canvas?.height || 400);
                this.speed = Math.random() * 0.5 + 0.1;
                this.angle = Math.random() * Math.PI * 2;
                this.length = Math.random() * 20 + 5;
                
                // Pastel colors palette
                const pastels = [
                  'rgba(179, 157, 219', // Soft Lavender
                  'rgba(144, 202, 249', // Soft Blue
                  'rgba(128, 222, 234', // Soft Cyan
                  'rgba(165, 214, 167', // Soft Green
                ];
                this.color = pastels[Math.floor(Math.random() * pastels.length)];
            }
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (canvas && (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
                ctx.strokeStyle = `${this.color}, ${Math.random() * 0.4 + 0.2})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        const init = () => {
            lines = [];
            for (let i = 0; i < numLines; i++) {
                lines.push(new Line());
            }
        };

        const animate = () => {
            if (isHovered) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                lines.forEach(line => {
                    line.update();
                    line.draw();
                });
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        // Match parent size
        const resize = () => {
          const rect = canvas.parentElement?.getBoundingClientRect();
          if (rect) {
            canvas.width = rect.width;
            canvas.height = rect.height;
          }
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', resize);
        };
    }, [isHovered]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />;
};


// Gallery Card Component with 3D tilt effect
export const ProjectGenerativeCard = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };
    
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: { 
          y: 0, 
          opacity: 1, 
          transition: { 
            type: "spring", 
            bounce: 0.4, 
            duration: 0.8, 
            delay: index * 0.1 
          } 
        }
    };

    // Extract category from rows if exists, otherwise use 'Project'
    const category = project.rows.find(([k]) => k.toLowerCase() === 'stack' || k.toLowerCase() === 'categoría')?.[1] || "Project";

    return (
        <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-96 w-full rounded-xl bg-card border border-border cursor-pointer overflow-hidden shadow-2xl"
        >
            <div 
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                className="absolute inset-2 flex flex-col justify-end p-6 rounded-lg overflow-hidden"
            >
                <img 
                    src={project.cover}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/600x400/000000/ffffff?text=Error'; }}
                />
                <GenerativeArtCanvas isHovered={isHovered} />
                
                {/* Overlay gradient - slightly darker to ensure text and art visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
                
                {/* Video Play Indicator */}
                {project.details?.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                      className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-2xl"
                    >
                      <Play className="size-8 text-white fill-white/20" />
                    </motion.div>
                  </div>
                )}
                
                <div className="relative z-10 space-y-2">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                        <span className="font-mono text-[10px] text-blue-200/80 dark:text-blue-300 uppercase tracking-widest mb-1 block">
                          {project.ref}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                            {project.title}
                        </h3>
                    </motion.div>
                    
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.05 }}
                        className="text-sm text-gray-200 line-clamp-2 font-light"
                    >
                        {project.body}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {project.rows.map(([k, v]) => (
                        <span key={k} className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono text-white/90 uppercase tracking-wider">
                          {v}
                        </span>
                      ))}
                    </motion.div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg">
                      <ArrowUpRight className="size-5" />
                    </div>
                </div>
            </div>
            
            {/* Subtle border shine effect */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none group-hover:border-white/20 transition-colors duration-500"></div>
        </motion.div>
    );
};
