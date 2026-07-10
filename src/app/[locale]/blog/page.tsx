import { Metadata } from 'next';
import { Locale, getDictionary } from '@/i18n';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `Blog | ${dict.common.title}`,
    description: 'Insights, guides, and stories about home care staffing, nursing, and verified help in India.',
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const posts = [
    {
      title: 'How to Choose the Right Nurse for Elderly Care',
      excerpt: 'Finding a reliable nurse for your elderly parents can be challenging. Here is a comprehensive guide to help you make the right choice.',
      author: 'Dr. Anjali Sharma',
      date: 'May 5, 2026',
      category: 'Elderly Care'
    },
    {
      title: 'The Importance of Profile Vetting for Home Staff',
      excerpt: 'Why profile screening is critical for your family\'s safety and how Ujobs India simplifies the vetting process.',
      author: 'Sandeep Varma',
      date: 'April 28, 2026',
      category: 'Safety'
    },
    {
      title: 'Driving Safely: Top Tips for Hiring a Family Driver',
      excerpt: 'A professional driver does more than just drive. Learn what qualities to look for in a vetted family driver.',
      author: 'Rajesh Malhotra',
      date: 'April 15, 2026',
      category: 'Driving'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 md:pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="brand" className="mb-4 bg-brand-50 text-brand-700 py-1.5 px-6 font-black uppercase tracking-widest text-[10px]">
            Our Insights
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-black text-neutral-900 mb-6 tracking-tight">
            The Ujobs <span className="text-brand-600 italic">Blog.</span>
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Stories, guides, and tips from India's most trusted home care staffing community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post, i) => (
            <Card key={i} className="group overflow-hidden border-neutral-200 hover:border-brand-500 transition-all duration-500 flex flex-col h-full bg-white rounded-[2rem] shadow-soft hover:shadow-elevated">
              <div className="aspect-video bg-neutral-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-600/5 group-hover:bg-brand-600/0 transition-all duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-brand-600 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">
                    {post.category}
                  </Badge>
                </div>
                <div className="w-full h-full flex items-center justify-center text-neutral-300">
                  <BookOpen className="w-12 h-12" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                      <User className="w-4 h-4" />
                    </div>
                    {post.author}
                  </div>
                  <Link href="#" className="text-brand-600 hover:text-brand-700 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
           <Link href={`/${locale}/contact`}>
             <span className="text-sm font-black text-neutral-400 uppercase tracking-[0.2em] hover:text-brand-600 transition-colors cursor-pointer">
               Subscribe to our newsletter for more updates
             </span>
           </Link>
        </div>
      </div>
    </div>
  );
}
