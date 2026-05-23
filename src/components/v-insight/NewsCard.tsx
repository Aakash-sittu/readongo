"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, Share2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewsCardProps {
  article: {
    title: string;
    url: string;
    summary: string;
    category: string;
    source: string;
    created_at: string;
  };
}

export function NewsCard({ article }: NewsCardProps) {
  const date = new Date(article.created_at);
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(article.url);
      setCopied(true);
      toast({
        title: "SIGNAL COPIED",
        description: "Source URL successfully copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "COPY FAILED",
        description: "Could not copy URL to clipboard.",
      });
    }
  };

  return (
    <article className="group relative border border-transparent bg-white p-6 transition-all hover:bg-accent hover:text-white flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex justify-between items-start mb-6">
          <Badge className="bg-primary text-white border-none rounded-none text-[10px] font-black group-hover:bg-white group-hover:text-accent uppercase tracking-widest px-3 py-1">
            {article.category}
          </Badge>
          <div className="flex flex-col items-end gap-1 text-[10px] font-black opacity-40 group-hover:opacity-100 uppercase tracking-widest">
            <div className="flex items-center gap-1">
               <Clock size={10} />
               <span>{timeStr}</span>
            </div>
            <span>{dateStr}</span>
          </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-black mb-4 leading-[1.1] group-hover:translate-x-1 transition-transform uppercase tracking-tighter">
          {article.title}
        </h3>
        
        <p className="text-sm font-medium leading-relaxed opacity-70 group-hover:opacity-90 mb-6 border-l border-primary/20 group-hover:border-white/30 pl-4 py-1">
          {article.summary}
        </p>
      </div>

      <div className="pt-6 border-t border-primary/10 group-hover:border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-primary group-hover:bg-white" />
           <span className="text-[10px] font-black tracking-widest uppercase truncate max-w-[120px]">{article.source}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Share Dialog */}
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogTrigger asChild>
              <button className="p-2 border border-primary/20 group-hover:border-white/40 hover:bg-white hover:text-accent transition-all">
                <Share2 size={14} />
              </button>
            </DialogTrigger>
            
            <DialogContent className="rounded-none sm:rounded-none border-primary border-2 p-8 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white text-primary">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-primary">
                  SHARE INTEL SIGNAL
                </DialogTitle>
                <DialogDescription className="text-xs font-medium text-primary/60 uppercase tracking-wide">
                  Copy the direct source URL of this intelligence signal.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex border border-primary">
                  <input
                    type="text"
                    readOnly
                    value={article.url}
                    className="flex-1 bg-white text-primary text-xs font-mono p-3 outline-none select-all truncate min-w-0"
                  />
                  <button
                    onClick={handleCopy}
                    className="bg-primary text-white hover:bg-accent border-l border-primary px-4 py-3 flex items-center justify-center transition-all focus:outline-none"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                </div>
                
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setIsShareOpen(false)}
                    className="border border-primary px-6 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-primary hover:text-white"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 border border-primary group-hover:border-white bg-primary text-white group-hover:bg-transparent hover:bg-white hover:text-accent transition-all"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
