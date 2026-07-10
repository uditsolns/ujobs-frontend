'use client';

/**
 * Empty State Component
 * Display when no data is available
 */

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon, { IconName } from '@/components/ui/Icon';

interface EmptyStateProps {
  icon?: IconName;
  dict?: any;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  illustration?: 'search' | 'empty' | 'error' | 'success';
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  illustration,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {/* Illustration or Icon */}
      {illustration ? (
        <EmptyIllustration variant={illustration} className="w-48 h-48 mx-auto mb-6" />
      ) : icon ? (
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-6">
          <Icon name={icon} size={48} />
        </div>
      ) : null}

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap justify-center gap-3">
          {action && (
            action.href ? (
              <Link href={action.href}>
                <Button>{action.label}</Button>
              </Link>
            ) : (
              <Button onClick={action.onClick}>{action.label}</Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <Button variant="outline">{secondaryAction.label}</Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}

// Empty State Illustrations
function EmptyIllustration({ variant, className = '' }: { variant: 'search' | 'empty' | 'error' | 'success'; className?: string }) {
  const illustrations = {
    search: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="80" cy="80" r="45" stroke="#E5E7EB" strokeWidth="8" />
        <line x1="115" y1="115" x2="160" y2="160" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />
        <circle cx="80" cy="80" r="30" fill="#F3F4F6" />
        <text x="80" y="90" textAnchor="middle" fontSize="24" fill="#9CA3AF">?</text>
      </svg>
    ),
    empty: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <rect x="40" y="60" width="120" height="100" rx="8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="4" />
        <line x1="60" y1="90" x2="140" y2="90" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="110" x2="120" y2="110" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="130" x2="100" y2="130" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="100" cy="100" r="60" fill="#FEE2E2" />
        <circle cx="100" cy="100" r="50" stroke="#EF4444" strokeWidth="4" />
        <line x1="80" y1="80" x2="120" y2="120" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
        <line x1="120" y1="80" x2="80" y2="120" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
    success: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="100" cy="100" r="60" fill="#D1FAE5" />
        <circle cx="100" cy="100" r="50" stroke="#10B981" strokeWidth="4" />
        <path d="M75 100 L95 120 L130 85" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return illustrations[variant];
}

// Pre-defined empty states
export const noJobsFound: EmptyStateProps = {
  icon: 'search',
  title: 'No Jobs Found',
  description: 'We couldn\'t find any jobs matching your criteria. Try adjusting your filters or search terms.',
  action: {
    label: 'Clear Filters',
    href: '/jobs'
  },
  secondaryAction: {
    label: 'View All Jobs',
    href: '/jobs'
  }
};

export const noCandidatesFound: EmptyStateProps = {
  icon: 'users',
  title: 'No Candidates Found',
  description: 'No candidates match your search criteria. Try different filters or post a job to attract candidates.',
  action: {
    label: 'Post a Job',
    href: '/hire'
  },
  secondaryAction: {
    label: 'Clear Filters',
    href: '/candidates'
  }
};

export const noApplications: EmptyStateProps = {
  icon: 'fileText',
  title: 'No Applications Yet',
  description: 'You haven\'t applied to any jobs yet. Start browsing and apply to jobs that match your skills.',
  action: {
    label: 'Browse Jobs',
    href: '/jobs'
  }
};
