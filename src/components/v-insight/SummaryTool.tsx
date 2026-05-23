"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Activity, ShieldCheck, Zap, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SummaryTool() {
  const [status, setStatus] = useState<any>(null);
  const [triggering, setTriggering] = useState(false);
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/news/status');
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.error("Status check failed", e);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3600000); // Poll every 1 hour (3600000ms)
    return () => clearInterval(interval);
  }, []);

  const handleTriggerSummary = async () => {
    setTriggering(true);
    try {
      const res = await fetch('/api/news/summary');
      if (res.status === 202) {
        toast({
          title: "Job Accepted",
          description: "Backend AI summarization process has been initiated.",
        });
        fetchStatus();
      } else {
        throw new Error("Backend rejected the signal.");
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Trigger Failed",
        description: e.message || "Could not connect to the intelligence pipeline.",
      });
    } finally {
      setTriggering(false);
    }
  };

  const formatLastRun = (isoString?: string) => {
    if (!isoString) return 'N/A';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'N/A';
      
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'JUST NOW';
      if (diffMins < 60) return `${diffMins}M AGO`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}H AGO`;
      
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase();
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <section id="summarizer" className="py-20 md:py-32 bg-primary text-white overflow-hidden border-b border-accent/20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">Intelligence Pipeline v.2.5</p>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9]">BACKEND AI<br />DISTILLATION</h2>
          <p className="text-lg opacity-80 mb-8 font-medium">
            Summarization is now handled entirely by the Readongo Backend System. 
            Monitor the automated pipeline status or trigger a manual synchronization of the latest raw signals.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleTriggerSummary}
              disabled={triggering || status?.data?.isRunning}
              className="w-full bg-accent hover:bg-white hover:text-accent text-white py-8 font-black text-xl rounded-none transition-all gap-2"
            >
              {triggering || status?.data?.isRunning ? <Loader2 className="animate-spin" /> : <Zap />}
              {triggering || status?.data?.isRunning ? 'PROCESSING...' : 'TRIGGER AI SYNC'}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-4 border border-white/10 bg-white/5">
                <p className="text-[8px] font-black uppercase opacity-40 tracking-widest mb-1">Queue Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${status?.data?.isRunning ? 'bg-accent animate-pulse' : 'bg-green-500'}`} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {status?.data?.isRunning ? 'PROCESSING' : status?.data ? 'IDLE' : 'UNKNOWN'}
                  </span>
                </div>
              </div>
              <div className="p-4 border border-white/10 bg-white/5">
                <p className="text-[8px] font-black uppercase opacity-40 tracking-widest mb-1">Last Run</p>
                <p className="text-xs font-black uppercase tracking-widest">{formatLastRun(status?.data?.lastRun)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative border-2 border-white/20 p-8 md:p-12 min-h-[400px] flex flex-col justify-center bg-white/5 backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Activity size={48} />
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center border border-accent/40">
                  <ShieldCheck className="text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">System Integrity</h3>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Global Intelligence Network</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "RAW INGESTION", value: "OPERATIONAL", icon: <Database size={14} /> },
                  { label: "AI DISTILLATION", value: status?.data?.isRunning ? 'ACTIVE' : 'READY', icon: <Sparkles size={14} /> },
                  { label: "PRECISION DB", value: "HEALTHY", icon: <Database size={14} /> },
                  { label: "API GATEWAY", value: status?.data?.error ? "DEGRADED" : "STABLE", icon: <Zap size={14} /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 opacity-60">
                      {item.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                     Automated Background Engine v.2.5.0
                   </p>
                   {status?.data?.error && (
                     <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1">
                       ERROR: {status.data.error}
                     </p>
                   )}
                 </div>
                 <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="w-2 h-2 rounded-full bg-accent/40" />
                    <span className="w-2 h-2 rounded-full bg-accent/20" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
