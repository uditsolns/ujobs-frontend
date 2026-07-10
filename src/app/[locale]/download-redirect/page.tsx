'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone, Download, Loader2 } from 'lucide-react';

export default function DownloadRedirectPage() {
  const [redirectingMessage, setRedirectingMessage] = useState('Detecting device and redirecting...');
  const [showFallbacks, setShowFallbacks] = useState(false);

  const androidUrl = 'https://play.google.com/store/apps/details?id=com.ujobsindia';
  const iosUrl = 'https://apps.apple.com/in/app/ujobs-india/id6741137870';

  useEffect(() => {
    // Client-side detection of user agent
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    
    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    
    const targetUrl = isIOS ? iosUrl : androidUrl;
    setRedirectingMessage(`Redirecting you to the ${isIOS ? 'App Store' : 'Google Play Store'}...`);

    // Execute redirection
    const redirectTimer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 800);

    // If still on the page after 4 seconds, show manual download links
    const fallbackTimer = setTimeout(() => {
      setShowFallbacks(true);
      setRedirectingMessage('Redirection taking longer than expected.');
    }, 4000);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-neutral-100 shadow-elevated text-center space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-white font-display font-black text-3xl shadow-md border border-brand-500 mb-4 animate-pulse">
            U
          </div>
          <h1 className="text-xl font-black text-neutral-900">Ujobs India Mobile App</h1>
          <p className="text-xs text-neutral-500 font-medium">Hiring & Job Discovery Made Simple</p>
        </div>

        {/* Loader and message */}
        <div className="flex flex-col items-center py-4 space-y-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-sm font-bold text-neutral-700">{redirectingMessage}</p>
        </div>

        {/* Manual Download Links (Fallback) */}
        {showFallbacks && (
          <div className="space-y-3 border-t border-neutral-100 pt-6 animate-fade-in">
            <p className="text-xs text-neutral-500 font-semibold mb-3">If you were not redirected, please select your device below:</p>
            
            <a 
              href={androidUrl}
              className="flex items-center justify-center gap-3 px-5 py-3.5 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm w-full"
            >
              <Download className="w-4 h-4 text-brand-400" />
              <div className="text-left leading-none">
                <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Get it on</div>
                <div className="text-sm font-black">Google Play (Android)</div>
              </div>
            </a>

            <a 
              href={iosUrl}
              className="flex items-center justify-center gap-3 px-5 py-3.5 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all active:scale-[0.98] border border-neutral-800 shadow-sm w-full"
            >
              <Smartphone className="w-4 h-4 text-brand-400" />
              <div className="text-left leading-none">
                <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Download on the</div>
                <div className="text-sm font-black">App Store (iOS)</div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
