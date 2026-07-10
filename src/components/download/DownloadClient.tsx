'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { AppStoreBadge } from '@/components/shared/AppDownloadBanner';
import Icon from '@/components/ui/Icon';
import { motion } from 'framer-motion';

interface DownloadClientProps {
  dict: any;
  androidUrl: string;
  iosUrl: string;
}

export default function DownloadClient({ dict, androidUrl, iosUrl }: DownloadClientProps) {
  return (
    <div className="w-full">
      {/* Store Badges and QR Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Android Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-soft border border-neutral-100 flex flex-col items-center text-center group hover:shadow-elevated transition-all duration-300"
        >
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon name="smartphone" size="xl" className="text-green-600" />
          </div>
          
          <h3 className="text-2xl font-display font-black text-neutral-900 mb-6">{dict.appBanner.googlePlay}</h3>
          
          <div className="bg-white p-6 rounded-[32px] shadow-inner border border-neutral-50 mb-8 group-hover:border-green-200 transition-colors">
            <QRCodeSVG 
              value={androidUrl} 
              size={180}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "/favicon.png",
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>
          
          <p className="text-sm text-neutral-500 mb-8 font-bold uppercase tracking-widest">
            Scan to download for Android
          </p>
          
          <AppStoreBadge store="android" href={androidUrl} dict={dict} className="w-full justify-center" />
        </motion.div>

        {/* iOS Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-soft border border-neutral-100 flex flex-col items-center text-center group hover:shadow-elevated transition-all duration-300"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon name="smartphone" size="xl" className="text-blue-600" />
          </div>
          
          <h3 className="text-2xl font-display font-black text-neutral-900 mb-6">{dict.appBanner.appStore}</h3>
          
          <div className="bg-white p-6 rounded-[32px] shadow-inner border border-neutral-50 mb-8 group-hover:border-blue-200 transition-colors">
            <QRCodeSVG 
              value={iosUrl} 
              size={180}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "/favicon.png",
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>
          
          <p className="text-sm text-neutral-500 mb-8 font-bold uppercase tracking-widest">
            Scan to download for iOS
          </p>
          
          <AppStoreBadge store="ios" href={iosUrl} dict={dict} className="w-full justify-center" />
        </motion.div>
      </div>
    </div>
  );
}
