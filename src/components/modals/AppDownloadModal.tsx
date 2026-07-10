/**
 * App Download Modal
 * Shows QR code and app store links for downloading the mobile app
 */

'use client';

import { useState, useEffect } from 'react';
import { X, Smartphone, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getClientConfig, getAppDownloadUrl } from '@/hooks/useConfig';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function AppDownloadModal({
  isOpen,
  onClose,
  title = 'Download Ujobs India App',
  message = 'To unlock this feature, please download our mobile app',
}: AppDownloadModalProps) {
  const [platform, setPlatform] = useState<'android' | 'ios' | 'desktop'>('desktop');
  const config = getClientConfig();

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      setPlatform('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios');
    }
  }, []);

  const handleDownload = (type: 'android' | 'ios') => {
    const url = type === 'android' ? config.appStore.android : config.appStore.ios;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-brand-100 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-brand-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 text-center">{message}</p>

          {/* Desktop - QR Code */}
          {platform === 'desktop' && (
            <div className="text-center mb-6">
              <div className="bg-gray-50 p-6 rounded-2xl inline-block mb-4 border border-neutral-100">
                <QRCodeSVG 
                  value={getAppDownloadUrl()} 
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
              <p className="text-sm text-gray-600 font-medium">Scan this QR code with your phone to download instantly</p>
            </div>
          )}

          {/* App Store Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleDownload('android')}
              className="w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>

            <button
              onClick={() => handleDownload('ios')}
              className="w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs">DOWNLOAD ON</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
          </div>

          {/* Direct link for mobile */}
          {platform !== 'desktop' && (
            <div className="mt-4 text-center">
              <a
                href={getAppDownloadUrl()}
                className="text-brand-600 hover:text-brand-700 font-medium text-sm"
              >
                Open in app store directly →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
