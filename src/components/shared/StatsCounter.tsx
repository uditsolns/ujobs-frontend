/**
 * Stats Counter Component
 * Animated statistics display - Redesigned for Vibrant & Friendly theme
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/ui/Card';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: string;
}

interface StatsCounterProps {
  stats: Stat[];
  duration?: number;
  className?: string;
}

export default function StatsCounter({ stats, duration = 2000, className = '' }: StatsCounterProps) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatItem key={index} stat={stat} duration={duration} delay={index * 100} />
      ))}
    </div>
  );
}

function StatItem({ stat, duration, delay }: { stat: Stat; duration: number; delay: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    setTimeout(() => {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * stat.value));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }, delay);
  }, [inView, stat.value, duration, delay]);

  return (
    <div ref={ref} className="h-full">
      <Card variant="default" padding="md" className="h-full text-center border-neutral-50 hover:bg-white hover:shadow-soft group transition-all">
        <div className={`text-4xl md:text-5xl font-display font-black mb-3 tracking-tight group-hover:scale-110 transition-transform ${stat.color || 'text-brand-500'}`}>
          {stat.prefix}{count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-neutral-500 font-bold text-xs uppercase tracking-widest leading-tight">{stat.label}</div>
      </Card>
    </div>
  );
}

// Pre-defined stat sets
export const jobPlatformStats: Stat[] = [
  { value: 50000, suffix: '+', label: 'Active Jobs', color: 'text-brand-500' },
  { value: 1000000, suffix: '+', label: 'Job Seekers', color: 'text-secondary-500' },
  { value: 5000, suffix: '+', label: 'Trusted Employers', color: 'text-accent' },
  { value: 100000, suffix: '+', label: 'Happy Families', color: 'text-success' },
];
