import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "../../styles/globals.css";
import { i18n, Locale, getDictionary } from "@/i18n";
import { AuthProvider } from "@/contexts/AuthContext";
import CategoriesService from "@/services/categories.service";
import LocationsService from "@/services/locations.service";
import dynamic from 'next/dynamic';

// Dynamic imports to split layout chunks and prevent ChunkLoadError timeouts
const Navbar = dynamic(() => import("@/components/shared/Navbar").then(mod => mod.Navbar), {
  ssr: true
});

const Footer = dynamic(() => import("@/components/shared/Footer").then(mod => mod.Footer), {
  ssr: true
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  const seo = dictionary.seo || {
    title: "Ujobs India - Hire Trusted Professionals & Find Trusted Jobs",
    description: "Ujobs India platform to hire domestic help, healthcare services, and skilled professionals. Trusted and profile-screened candidates.",
    keywords: "hiring, jobs india, domestic help, healthcare services, trusted workers, hire maids, hire nurses, drivers india"
  };

  const languages: Record<string, string> = {};
  i18n.locales.forEach((l) => {
    languages[l] = `/${l}`;
  });

  return {
    title: {
      default: seo.title,
      template: `%s | ${dictionary.common?.title || "Ujobs India"}`
    },
    description: seo.description,
    keywords: typeof seo.keywords === 'string' ? seo.keywords.split(',').map((k: string) => k.trim()) : seo.keywords,
    authors: [{ name: "Ujobs India" }],
    creator: "Ujobs India",
    publisher: "Ayushya Healthcare Services",
    metadataBase: new URL("https://ujobsindia.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        'x-default': '/en',
      },
    },
    openGraph: {
      type: "website",
      locale: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'kn', 'gu', 'pa', 'ml', 'or', 'ne'].includes(locale) 
        ? `${locale === 'en' ? 'en' : locale}_IN` 
        : locale,
      url: `/${locale}`,
      title: seo.title,
      description: seo.description,
      siteName: "Ujobs India",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Ujobs India - Hiring Made Simple",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  // Fetch data for dynamic footer with error handling
  let categories: any[] = [];
  let locations: any[] = [];
  
  try {
    const results = await Promise.allSettled([
      CategoriesService.getCategories(),
      LocationsService.getLocations()
    ]);
    
    if (results[0].status === 'fulfilled') {
      categories = results[0].value;
    }
    if (results[1].status === 'fulfilled') {
      locations = results[1].value;
    }
  } catch (error) {
    // Silently handle errors - components have their own fallbacks
    if (process.env.NODE_ENV === 'development') {
      console.warn('Layout data fetch error:', error);
    }
  }

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar locale={locale as Locale} dict={dictionary} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer 
              locale={locale as Locale} 
              dict={dictionary} 
              categories={categories}
              locations={locations}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
