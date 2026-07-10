'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, Download, Star, ExternalLink, QrCode } from 'lucide-react';

interface StickyDownloadBannerProps {
  dict?: any;
  androidUrl?: string;
  iosUrl?: string;
}

export default function StickyDownloadBanner({
  dict,
  androidUrl = 'https://play.google.com/store/apps/details?id=com.ujobsindia',
  iosUrl = 'https://apps.apple.com/in/app/ujobs-india/id6741137870',
}: StickyDownloadBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(androidUrl);

  useEffect(() => {
    // Generate absolute redirect URL on client side
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/download-redirect`);
    }

    // Check if the user previously dismissed the banner in this session
    const isDismissed = sessionStorage.getItem('ujobs_app_banner_dismissed');
    if (!isDismissed) {
      // Small delay for natural entrance animation
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('ujobs_app_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. MOBILE PERSISTENT STICKY BOTTOM BAR (max-width: md) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 p-3 shadow-lg flex items-center justify-between md:hidden animate-slide-up">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Close button */}
          <button 
            onClick={handleDismiss}
            className="p-1 text-neutral-400 hover:text-neutral-900 flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>

          {/* App Icon placeholder */}
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-display font-black text-lg flex-shrink-0 shadow-sm border border-brand-500">
            U
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-neutral-900 leading-tight">Ujobs India</h4>
            <p className="text-[10px] text-neutral-500 font-semibold truncate mt-0.5">Trusted Hiring & Jobs App</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span className="text-[9px] font-bold text-neutral-600">4.8 • Free</span>
            </div>
          </div>
        </div>

        {/* Action Button - downloads play store app (most common on mobile) */}
        <a 
          href={androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 px-4 py-2 bg-brand-600 text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-colors active:scale-95 shadow-sm"
        >
          Install
        </a>
      </div>

      {/* 2. DESKTOP FLOATING STICKY BANNER (min-width: md) WITH HOVER EXPANSION */}
      <div 
        className="fixed bottom-6 right-6 z-50 hidden md:block transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered ? (
          /* COLLAPSED WIDGET STATE */
          <div className="bg-neutral-900 text-white rounded-2xl p-3.5 shadow-xl border border-neutral-800 flex items-center gap-3 cursor-pointer hover:bg-black transition-all hover:scale-105 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-display font-black text-sm shadow-inner group-hover:animate-pulse">
              U
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest leading-none mb-0.5">Install App</p>
              <h4 className="text-xs font-extrabold text-white tracking-tight flex items-center gap-1">
                Scan & Download
                <QrCode className="w-3.5 h-3.5 text-brand-400" />
              </h4>
            </div>
            <button 
              onClick={handleDismiss}
              className="p-1 hover:bg-white/10 rounded-md ml-1 text-neutral-400 hover:text-white"
              aria-label="Dismiss app banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* EXPANDED RICH STATE (HOVERED) */
          <div className="bg-white text-neutral-900 rounded-[2rem] p-5 shadow-elevated border border-neutral-200 flex flex-col gap-4 max-w-sm w-[340px] animate-fade-in relative">
            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Dismiss app banner"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header section with App Icon & Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-display font-black text-2xl shadow-md border border-brand-500">
                U
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-neutral-900 tracking-tight">Ujobs India Mobile App</h4>
                <p className="text-xs text-neutral-500 font-medium">Redefining trusted hiring in India</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-neutral-700">4.8 Rating (Google Play)</span>
                </div>
              </div>
            </div>

            {/* Split layout: QR Code on left, App store buttons on right */}
            <div className="grid grid-cols-12 gap-3 items-center border-t border-neutral-100 pt-3">
              <div className="col-span-5 flex flex-col items-center gap-1 p-2 bg-neutral-50 rounded-xl border border-neutral-100">
                <QRCodeSVG value={redirectUrl} size={84} />
                <span className="text-[8px] font-black uppercase tracking-tighter text-neutral-400">Scan to Install</span>
              </div>

              <div className="col-span-7 flex flex-col gap-2">
                <a 
                  href={androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white rounded-xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-brand-400" />
                  <div className="text-left leading-none">
                    <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Get it on</div>
                    <div className="text-xs font-black">Google Play</div>
                  </div>
                </a>
                <a 
                  href={iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white rounded-xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5 text-brand-400" />
                  <div className="text-left leading-none">
                    <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Download on the</div>
                    <div className="text-xs font-black">App Store</div>
                  </div>
                </a>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-neutral-400 font-medium">
              Scan QR code with your phone camera to download instantly
            </p>
          </div>
        )}
      </div>
    </>
  );
}
