/**
 * Footer Component
 * Main site footer
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { siteConfig } from '@/config/site';
import { ROUTES, l } from '@/lib/constants/routes';

export default function Footer() {
  const pathname = usePathname();
  // Extract locale from pathname (e.g., /en/jobs -> en)
  const locale = pathname?.split('/')[1] || 'en';
  const footerLinks = {
    company: [
      { name: 'About Us', href: ROUTES.about },
      { name: 'Contact', href: ROUTES.contact },
      { name: 'For Employers', href: ROUTES.employer.home },
    ],
    jobSeekers: [
      { name: 'Browse Jobs', href: ROUTES.jobs.list },
      { name: 'Download App', href: ROUTES.download.home },
    ],
    legal: [
      { name: 'Privacy Policy', href: ROUTES.legal.privacy },
      { name: 'Terms of Service', href: ROUTES.legal.terms },
      { name: 'Disclaimer', href: ROUTES.legal.disclaimer },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: siteConfig.links.facebook },
    { name: 'Twitter', icon: Twitter, href: siteConfig.links.twitter },
    { name: 'Instagram', icon: Instagram, href: siteConfig.links.instagram },
    { name: 'LinkedIn', icon: Linkedin, href: siteConfig.links.linkedin },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link href={l(ROUTES.home, locale)} className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                <span className="text-xl font-bold text-white">U</span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              A platform connecting skilled workers with employers across India. Find jobs for drivers, cooks, security guards, nurses and more.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={l(link.href, locale)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={l(link.href, locale)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-sm font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              {footerLinks.jobSeekers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={l(link.href, locale)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download QR Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Download Our App</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-1 rounded-lg">
                  <QRCodeSVG value={ROUTES.download.android} size={64} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Get it on</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-1 rounded-lg">
                  <QRCodeSVG value={ROUTES.download.ios} size={64} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Download on</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {siteConfig.company.registeredName}. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-400 text-sm transition-colors flex items-center"
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Download App
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
