/**
 * Avatar Component
 * User profile avatar with fallback initials - Redesigned for Vibrant & Friendly theme
 */

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  name: string;
  image?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded';
  badge?: 'verified' | 'premium' | 'online';
  className?: string;
  unoptimized?: boolean;
}

export default function Avatar({
  name,
  image,
  size = 'md',
  variant = 'circle',
  badge,
  className = '',
  unoptimized = false
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-32 h-32 text-3xl',
  };

  const radiusClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-2xl',
  };

  const badgeSize = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-8 h-8',
  };

  const badgeColors = {
    verified: 'bg-green-500',
    premium: 'bg-brand-500',
    online: 'bg-emerald-400',
  };

  const colors = [
    'bg-brand-500',
    'bg-brand-600',
    'bg-brand-700',
    'bg-secondary-500',
    'bg-secondary-600',
    'bg-brand-400',
    'bg-brand-800',
    'bg-slate-500',
  ];

  // Generate consistent color based on name
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeClasses[size]} ${radiusClasses[variant]} overflow-hidden shadow-sm bg-neutral-100 ring-2 ring-white`}>
        {image ? (
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized={unoptimized}
          />
        ) : (
          <div className={`w-full h-full ${bgColor} flex items-center justify-center text-white font-black`}>
            {initials}
          </div>
        )}
      </div>

      {/* Badge */}
      {badge && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 ${badgeSize[size]} ${badgeColors[badge]} border-2 border-white rounded-full shadow-sm`}
          title={badge}
        />
      )}
    </div>
  );
}

// Avatar Group
interface AvatarGroupProps {
  avatars: Array<{ name: string; image?: string | null }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ avatars, max = 5, size = 'md', className = '' }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex -space-x-3 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <div key={index} className="transition-transform hover:scale-110 hover:z-10">
          <Avatar name={avatar.name} image={avatar.image} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div className={`${size === 'xs' ? 'w-6 h-6 text-[10px]' : size === 'sm' ? 'w-8 h-8 text-xs' : size === 'md' ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-base'} rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-bold ring-2 ring-white shadow-sm`}>
          +{remaining}
        </div>
      )}
    </div>
  );
}
