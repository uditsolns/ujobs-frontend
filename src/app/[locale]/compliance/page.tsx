import { Metadata } from 'next';
import { Locale, getDictionary } from '@/i18n';
import { ShieldCheck, Scale, FileText, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `Regulatory Compliance | ${dict.common.title}`,
    description: 'Our commitment to regulatory standards, data protection, and legal compliance in India.',
  };
}

export default async function CompliancePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const sections = [
    {
      title: 'Data Protection',
      desc: 'We strictly adhere to the Digital Personal Data Protection (DPDP) Act of India. Your data is encrypted and stored securely.',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: 'Labor Standards',
      desc: 'We promote fair wages and ethical hiring practices in accordance with Indian labor laws.',
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: 'Trust & Vetting Standards',
      desc: 'Our Aadhaar match and profile screening processes follow government-prescribed safety guidelines.',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Corporate Governance',
      desc: 'Ujobs India is a brand of Ayushya Healthcare Services, fully compliant with MCA regulations.',
      icon: <FileText className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 md:pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="brand" className="mb-4 bg-emerald-50 text-emerald-700 py-1.5 px-6 font-black uppercase tracking-widest text-[10px] border border-emerald-100">
            Trust & Legal
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-black text-neutral-900 mb-6 tracking-tight">
            Regulatory <span className="text-emerald-600 italic">Compliance.</span>
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We are committed to maintaining the highest standards of legal and ethical compliance in the home staffing industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sections.map((section, i) => (
            <Card key={i} className="p-8 border-neutral-200 bg-white rounded-[2rem] shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
                {section.icon}
              </div>
              <h3 className="text-xl font-black text-neutral-900 mb-4">{section.title}</h3>
              <p className="text-sm text-neutral-600 font-medium leading-relaxed opacity-90">
                {section.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-20 bg-white border border-neutral-200 rounded-[2.5rem] p-10 md:p-16 text-center shadow-soft">
           <h2 className="text-2xl font-display font-black text-neutral-900 mb-6 tracking-tight">Need more information?</h2>
           <p className="text-neutral-500 mb-10 max-w-xl mx-auto font-medium leading-relaxed text-sm">
             For detailed compliance reports or legal inquiries, please reach out to our legal department.
           </p>
           <a href="mailto:support@ujobsindia.com" className="inline-flex items-center justify-center bg-neutral-900 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-black transition-all">
             Contact Legal Team
           </a>
        </div>
      </div>
    </div>
  );
}
