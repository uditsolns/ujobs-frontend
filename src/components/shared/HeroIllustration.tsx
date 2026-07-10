/**
 * Hero Illustration Component
 * SVG illustrations for hero sections
 * Redesigned for a World-Class premium look
 */

import React from 'react';
import { motion } from 'framer-motion';

interface HeroIllustrationProps {
  variant?: 'jobs' | 'candidates' | 'hiring' | 'search' | 'success' | 'premium';
  className?: string;
}

export default function HeroIllustration({ variant = 'jobs', className = '' }: HeroIllustrationProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const illustrations = {
    premium: (
      <div className={`relative ${className}`}>
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/10 via-transparent to-brand-400/5 blur-3xl rounded-full" />
        
        <motion.svg 
          viewBox="0 0 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full drop-shadow-2xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Main Decorative Circle */}
          <motion.circle 
            cx="250" cy="250" r="200" 
            stroke="url(#premium-grad)" 
            strokeWidth="2" 
            strokeDasharray="10 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating Glassmorphic Elements */}
          {/* Candidate Card 1 */}
          <motion.g variants={item}>
            <rect x="60" y="100" width="180" height="240" rx="20" fill="white" fillOpacity="0.05" className="backdrop-blur-xl" stroke="rgba(255,255,255,0.2)" />
            <circle cx="150" cy="160" r="40" fill="url(#avatar-grad-1)" />
            <rect x="100" y="220" width="100" height="10" rx="5" fill="white" fillOpacity="0.3" />
            <rect x="110" y="240" width="80" height="8" rx="4" fill="white" fillOpacity="0.2" />
            <rect x="100" y="280" width="100" height="30" rx="15" fill="#2563EB" />
            <text x="150" y="300" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Trusted</text>
          </motion.g>

          {/* Candidate Card 2 - Offset */}
          <motion.g variants={item}>
            <rect x="260" y="200" width="180" height="240" rx="20" fill="white" fillOpacity="0.08" className="backdrop-blur-xl" stroke="rgba(255,255,255,0.2)" />
            <circle cx="350" cy="260" r="40" fill="url(#avatar-grad-2)" />
            <rect x="300" y="320" width="100" height="10" rx="5" fill="white" fillOpacity="0.3" />
            <rect x="310" y="340" width="80" height="8" rx="4" fill="white" fillOpacity="0.2" />
            <rect x="300" y="380" width="100" height="30" rx="15" fill="#10B981" />
            <text x="350" y="400" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Available</text>
          </motion.g>

          {/* Floating Trust Badge */}
          <motion.g 
            variants={item}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="420" cy="100" r="50" fill="white" fillOpacity="0.1" className="backdrop-blur-md" stroke="rgba(255,255,255,0.3)" />
            <path d="M420 80 L430 100 L450 100 L435 115 L440 135 L420 125 L400 135 L405 115 L390 100 L410 100 Z" fill="#F59E0B" />
          </motion.g>

          {/* Connections/Lines */}
          <motion.path 
            d="M240 220 Q300 150 350 200" 
            stroke="url(#line-grad)" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />

          <defs>
            <linearGradient id="premium-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="avatar-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="avatar-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    ),
    
    jobs: (
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="150" y="100" width="200" height="250" fill="#F1F5F9" rx="8"/>
        <rect x="150" y="100" width="200" height="40" fill="#2563EB" rx="8"/>
        {[0, 1, 2, 3].map((row) => 
          [0, 1, 2].map((col) => (
            <rect key={`${row}-${col}`} x={180 + col * 50} y={160 + row * 50} width="30" height="30" fill="#DBEAFE" rx="4" />
          ))
        )}
        <circle cx="100" cy="280" r="30" fill="#F59E0B"/>
        <rect x="85" y="310" width="30" height="60" fill="#F59E0B" rx="15"/>
        <circle cx="380" cy="120" r="35" stroke="#2563EB" strokeWidth="8" fill="none"/>
        <line x1="405" y1="145" x2="440" y2="180" stroke="#2563EB" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    ),
    
    candidates: (
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${50 + i * 140}, ${100 + i * 20})`}>
            <rect width="120" height="160" fill="white" rx="12" filter="url(#shadow)"/>
            <circle cx="60" cy="50" r="30" fill={['#F59E0B', '#2563EB', '#10B981'][i]}/>
            <rect x="20" y="95" width="80" height="8" fill="#F1F5F9" rx="4"/>
            <rect x="30" y="110" width="60" height="6" fill="#F1F5F9" rx="3"/>
            <rect x="25" y="130" width="70" height="20" fill={['#F59E0B', '#2563EB', '#10B981'][i]} rx="10"/>
          </g>
        ))}
        <circle cx="430" cy="120" r="25" fill="#10B981"/>
        <path d="M420 120 L428 128 L445 111" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1"/></filter></defs>
      </svg>
    ),
    
    hiring: (
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="100" y="250" width="300" height="100" fill="#DBEAFE" rx="8"/>
        <rect x="180" y="180" width="140" height="100" fill="#2563EB" rx="4"/>
        <rect x="185" y="185" width="130" height="85" fill="#EFF6FF" rx="2"/>
        <circle cx="320" cy="200" r="25" fill="#F59E0B"/>
        <rect x="305" y="225" width="30" height="50" fill="#F59E0B" rx="15"/>
        <circle cx="420" cy="160" r="20" fill="#10B981"/>
        <text x="420" y="168" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">✓</text>
      </svg>
    ),
    
    search: (
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="75" y="150" width="350" height="80" fill="white" rx="40" filter="url(#shadow)"/>
        <rect x="90" y="165" width="250" height="50" fill="#F8FAFC" rx="25"/>
        <circle cx="370" cy="190" r="25" fill="#2563EB"/>
        <circle cx="370" cy="190" r="12" stroke="white" strokeWidth="3" fill="none"/>
        <line x1="378" y1="198" x2="385" y2="205" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <defs><filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.15"/></filter></defs>
      </svg>
    ),
    
    success: (
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="250" cy="150" rx="60" ry="50" fill="#FCD34D"/>
        <rect x="230" y="200" width="40" height="60" fill="#F59E0B" rx="5"/>
        <rect x="200" y="260" width="100" height="20" fill="#D97706" rx="10"/>
        <text x="250" y="172" textAnchor="middle" fill="#F59E0B" fontSize="28" fontWeight="bold">★</text>
        <circle cx="120" cy="280" r="20" fill="#2563EB"/>
        <circle cx="380" cy="280" r="20" fill="#10B981"/>
      </svg>
    ),
  };

  return illustrations[variant] || illustrations.jobs;
}
