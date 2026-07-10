/**
 * App Mockup Component
 * Mobile phone mockup with app screenshot
 */

import React from 'react';
import Image from 'next/image';

interface AppMockupProps {
  variant?: 'iphone' | 'android';
  className?: string;
  imageSrc?: string;
  showContent?: boolean;
}

export default function AppMockup({ 
  variant = 'iphone', 
  className = '', 
  imageSrc = '/appimg.jpeg',
  showContent = true 
}: AppMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone Frame */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden">
        {/* Antenna lines */}
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
          {imageSrc ? (
            <Image 
              src={imageSrc} 
              alt="App Screenshot" 
              fill 
              className="object-cover"
              priority
            />
          ) : (
             <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-bold">App Preview</span>
             </div>
          )}
          
          {/* Default Content Overlay if no image and showContent is true */}
          {!imageSrc && showContent && (
             <div className="absolute inset-0 p-6 flex flex-col gap-4">
                <div className="h-10 w-full bg-brand-500 rounded-xl"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded-full"></div>
                <div className="space-y-3 mt-4">
                   {[1,2,3].map(i => (
                      <div key={i} className="h-24 w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                         <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-50"></div>
                            <div className="flex-1 space-y-2">
                               <div className="h-3 w-3/4 bg-gray-100 rounded-full"></div>
                               <div className="h-2 w-1/2 bg-gray-50 rounded-full"></div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </div>
      
      {/* Reflection effect */}
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-white/10"></div>
    </div>
  );
}
