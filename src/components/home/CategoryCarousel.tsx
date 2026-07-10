'use client';

/**
 * Category Carousel Component
 * Modern 3D rotating carousel showcasing job categories
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { l } from '@/lib/constants/routes';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  slug?: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  locale: string;
}

export default function CategoryCarousel({ categories, locale }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (isPaused || categories.length === 0) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, categories.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  if (categories.length === 0) return null;

  // Get visible categories (center + 2 on each side)
  const getVisibleCategories = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + categories.length) % categories.length;
      visible.push({
        ...categories[index],
        position: i,
      });
    }
    return visible;
  };

  const visibleCategories = getVisibleCategories();

  return (
    <div 
      className="relative w-full py-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-brand-50/30 to-white pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 rounded-full mb-4"
        >
          <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
          <span className="text-sm font-bold text-brand-600 uppercase tracking-wide">
            Browse {categories.length}+ Job Categories
          </span>
          <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
        </motion.div>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative h-80 flex items-center justify-center" style={{ perspective: '2000px' }}>
        <AnimatePresence initial={false} custom={direction}>
          {visibleCategories.map((category, index) => {
            const position = category.position;
            const isCenter = position === 0;
            
            // Calculate transforms based on position
            const scale = isCenter ? 1.2 : 0.7 - Math.abs(position) * 0.1;
            const rotateY = position * 25; // Rotate side items
            const translateX = position * 280; // Spacing
            const translateZ = isCenter ? 100 : -Math.abs(position) * 50; // Depth
            const opacity = isCenter ? 1 : 0.4 - Math.abs(position) * 0.1;
            const zIndex = 10 - Math.abs(position);

            return (
              <motion.div
                key={`${category.id}-${index}`}
                custom={direction}
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  rotateY: direction > 0 ? 45 : -45,
                }}
                animate={{
                  scale,
                  rotateY,
                  x: translateX,
                  z: translateZ,
                  opacity,
                  zIndex,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: direction > 0 ? -45 : 45,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute"
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: isCenter ? 'auto' : 'none',
                }}
              >
                <Link
                  href={l(`/jobs?category=${encodeURIComponent(category.name)}`, locale)}
                  className="block"
                >
                  <motion.div
                    whileHover={isCenter ? { scale: 1.05, rotateY: 5 } : {}}
                    className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 transition-all duration-300 ${
                      isCenter 
                        ? 'border-brand-500 shadow-brand-500/20' 
                        : 'border-white/50'
                    }`}
                    style={{ width: '240px', height: '280px' }}
                  >
                    {/* Category Image */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-brand-100 to-secondary-100 overflow-hidden">
                      {category.image && category.image !== '/images/default.png' ? (
                        <motion.img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                          animate={isCenter ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="w-20 h-20 text-brand-500 opacity-50" />
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Job count badge */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={isCenter ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"
                        >
                          <span className="text-xs font-black text-brand-600">
                            {category.count}+ Jobs
                          </span>
                        </motion.div>
                      </div>

                      {/* Star rating */}
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"
                        >
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold text-neutral-700">4.8</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="p-5 bg-white">
                      <h3 className={`font-display font-black text-neutral-900 mb-2 transition-all ${
                        isCenter ? 'text-xl' : 'text-lg'
                      }`}>
                        {category.name}
                      </h3>
                      
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-neutral-500 font-medium">Verified Professionals</span>
                          <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-brand-600 font-bold"
                          >
                            View All →
                          </motion.span>
                        </motion.div>
                      )}
                    </div>

                    {/* Shine effect on center card */}
                    {isCenter && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white border-2 border-brand-500 text-brand-500 flex items-center justify-center shadow-lg hover:bg-brand-500 hover:text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {categories.slice(0, Math.min(8, categories.length)).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              className={`rounded-full transition-all ${
                index === currentIndex % Math.min(8, categories.length)
                  ? 'w-8 h-3 bg-brand-500'
                  : 'w-3 h-3 bg-neutral-300 hover:bg-brand-300'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-brand-500 border-2 border-brand-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-brand-600 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Auto-play indicator */}
      {!isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-center mt-4"
        >
          <span className="text-xs text-neutral-400 font-medium">
            Hover to pause auto-rotation
          </span>
        </motion.div>
      )}
    </div>
  );
}

