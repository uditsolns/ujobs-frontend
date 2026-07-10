/**
 * Trust Badges Component
 * Display trust indicators and certifications
 */

import React from 'react';
import Icon from '@/components/ui/Icon';

interface TrustBadgesProps {
  dict: any;
  variant?: 'horizontal' | 'vertical' | 'grid';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function TrustBadges({ dict, variant = 'horizontal', theme = 'light', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: 'shieldCheck' as const,
      label: dict.common.verifiedProfiles,
      description: dict.common.oneHundredPercentVerified,
      color: 'text-green-600'
    },
    {
      icon: 'users' as const,
      label: dict.common.millionUsers,
      description: dict.common.trustedPlatform,
      color: 'text-blue-600'
    },
    {
      icon: 'award' as const,
      label: dict.common.bestRated,
      description: dict.common.rating48,
      color: 'text-brand-500'
    },
    {
      icon: 'lock' as const,
      label: dict.common.secure,
      description: dict.common.dataProtected,
      color: 'text-brand-600'
    },
  ];

  if (variant === 'horizontal') {
    return (
      <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm ${
            theme === 'dark' ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'
          }`}>
            <div className={`${badge.color}`}>
              <Icon name={badge.icon} size="lg" />
            </div>
            <div>
              <div 
                className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}
                dangerouslySetInnerHTML={{ __html: badge.label }}
              />
              <div 
                className={`text-xs ${theme === 'dark' ? 'text-brand-100' : 'text-neutral-600'}`}
                dangerouslySetInnerHTML={{ __html: badge.description }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl border border-neutral-100 hover:border-brand-300 transition-all">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-50 mb-4 ${badge.color}`}>
              <Icon name={badge.icon} size="xl" />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1" dangerouslySetInnerHTML={{ __html: badge.label }} />
            <p className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: badge.description }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-neutral-100">
          <div className={`${badge.color} flex-shrink-0`}>
            <Icon name={badge.icon} size="lg" />
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: badge.label }} />
            <p className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: badge.description }} />
          </div>
        </div>
      ))}
    </div>
  );
}
