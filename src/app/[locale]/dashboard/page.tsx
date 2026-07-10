'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  History as HistoryIcon, 
  CreditCard, 
  User as UserIcon, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getClientConfig } from '@/hooks/useConfig';
import { formatRelativeTime } from '@/lib/utils/date';
import { stripHtml } from '@/lib/utils/string';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'history' | 'transactions'>('history');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const config = getClientConfig();
      const token = localStorage.getItem('ujobs_token');
      
      const response = await fetch(`${config.api.baseURL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch data');
      
      const result = await response.json();
      // Handle the array directly as per TransactionController
      setData(Array.isArray(result) ? result : (result.data || []));
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError('Could not load your history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                  <UserIcon className="w-6 h-6" />
               </div>
               <div>
                  <h1 className="text-3xl font-display font-black text-neutral-900">Welcome, {user.name}</h1>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{user.type === 'worker' ? 'Professional Profile' : 'Employer Dashboard'}</p>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
             <button 
               onClick={() => setActiveTab('history')}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'history' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50'}`}
             >
               <HistoryIcon className="w-4 h-4" />
               Activity History
             </button>
             <button 
               onClick={() => setActiveTab('transactions')}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'transactions' ? 'bg-neutral-900 text-white shadow-lg' : 'text-neutral-500 hover:bg-neutral-50'}`}
             >
               <CreditCard className="w-4 h-4" />
               Transactions
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-8">
           {/* Sidebar Stats */}
           <div className="lg:col-span-3 space-y-6">
              <Card padding="lg" className="bg-white border-neutral-100 rounded-[32px] shadow-soft">
                 <h3 className="text-lg font-black text-neutral-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-brand-500" />
                    Overview
                 </h3>
                 <div className="space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                       <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Applications</div>
                       <div className="text-2xl font-black text-neutral-900">{data.length}</div>
                    </div>
                    <div className="p-4 bg-success-50 rounded-2xl border border-success-100">
                       <div className="text-[10px] font-black text-success-600 uppercase tracking-widest mb-1">Status</div>
                       <div className="text-lg font-black text-success-700">Active Account</div>
                    </div>
                 </div>
              </Card>
              
              <Card className="bg-neutral-900 text-white rounded-[32px] overflow-hidden border-none shadow-2xl relative p-8">
                 <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2">Need Help?</h4>
                    <p className="text-neutral-400 text-xs font-medium mb-6 leading-relaxed">Our support team is available 24/7 to assist you.</p>
                    <Button fullWidth size="sm" className="bg-brand-500 hover:bg-brand-600 text-white border-none rounded-xl font-bold">
                       Contact Support
                    </Button>
                 </div>
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl" />
              </Card>
           </div>

           {/* Main Feed */}
           <div className="lg:col-span-9">
              {loading ? (
                <div className="space-y-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-32 bg-white rounded-[32px] animate-pulse border border-neutral-100" />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 p-12 rounded-[40px] text-center border-2 border-dashed border-red-100">
                   <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                   <h3 className="text-xl font-black text-red-900 mb-2">Oops! Something went wrong</h3>
                   <p className="text-red-600 font-medium mb-8">{error}</p>
                   <Button onClick={fetchDashboardData} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold">
                      Try Again
                   </Button>
                </div>
              ) : data.length === 0 ? (
                <div className="bg-white p-20 rounded-[40px] text-center border border-neutral-100 shadow-soft">
                   <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="w-10 h-10 text-neutral-300" />
                   </div>
                   <h3 className="text-2xl font-black text-neutral-900 mb-2">No activity found</h3>
                   <p className="text-neutral-500 font-medium mb-10 max-w-md mx-auto">
                     {activeTab === 'history' 
                       ? "You haven't applied to any jobs yet. Start exploring thousands of verified opportunities today!" 
                       : "No transaction records found on your account."}
                   </p>
                   <Button onClick={() => router.push('/jobs')} className="rounded-2xl h-14 px-10 font-black shadow-xl shadow-brand-500/10">
                      Browse All Jobs
                   </Button>
                </div>
              ) : (
                <div className="space-y-6">
                   {data.map((item) => (
                     <Card key={item.id} padding="none" className="bg-white border-neutral-100 rounded-[32px] overflow-hidden hover:shadow-soft transition-all group">
                        <div className="p-8">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-start gap-5">
                                 <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all">
                                    <Briefcase className="w-8 h-8" />
                                 </div>
                                 <div>
                                    <h4 className="text-xl font-black text-neutral-900 group-hover:text-brand-600 transition-colors">
                                       {stripHtml(item.job?.requirement || 'General Application')}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                       <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                          <MapPin className="w-3.5 h-3.5" />
                                          {item.job?.job_location || 'India'}
                                       </div>
                                       <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                          <Calendar className="w-3.5 h-3.5" />
                                          {formatRelativeTime(item.created_at)}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              <div className="flex items-center gap-6">
                                 <div className="text-right hidden md:block">
                                    <div className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Status</div>
                                    <Badge variant={item.is_active ? 'success' : 'default'} className="rounded-lg font-bold">
                                       {item.is_active ? 'Active' : 'Closed'}
                                    </Badge>
                                 </div>
                                 <button className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                                    <ChevronRight className="w-6 h-6" />
                                 </button>
                              </div>
                           </div>
                        </div>
                        <div className="px-8 py-4 bg-neutral-50 border-t border-neutral-50 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Verified Application</span>
                           </div>
                           <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">ID: #{item.id.toString().padStart(6, '0')}</div>
                        </div>
                     </Card>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
