"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { NewsCard } from './NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Database, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper hook to dynamically calculate items per page based on screen size
function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default for SSR / Initial render

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(6); // 2 rows of 3 columns
      } else if (width >= 768) {
        setItemsPerPage(4); // 2 rows of 2 columns
      } else {
        setItemsPerPage(3); // 3 rows of 1 column
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return itemsPerPage;
}

export function NewsFeed() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [itemCount, setItemCount] = useState(0);
  const { toast } = useToast();

  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNews = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/news/db');
      const data = await res.json();
      
      if (data.status === 'success') {
        setNews(data.data);
        setItemCount(data.count);
      } else {
        throw new Error(data.message || 'Failed to sync with intelligence database.');
      }
    } catch (e: any) {
      const msg = e.message || "Connection to precision DB failed.";
      setError(msg);
      toast({
        variant: "destructive",
        title: "Database Sync Error",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const cat = (e as CustomEvent).detail;
      setActiveCategory(cat);
    };
    window.addEventListener('select-category', handleSelectCategory);
    return () => window.removeEventListener('select-category', handleSelectCategory);
  }, []);

  const categories = [
    'ALL',
    'AI/ML',
    'Programming',
    'Business/Startups',
    'Security',
    'Gadgets',
    'Science',
    'Other'
  ];
  const filteredNews = activeCategory === 'ALL' 
    ? news 
    : news.filter(n => n.category.toUpperCase() === activeCategory.toUpperCase());

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));

  // Reset page when category or news data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, news]);

  // Keep page within boundaries
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="latest" className="py-20 border-b border-primary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Direct Cached Output</span>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary leading-none">PRECISION FEED</h2>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary/50">
                <Database size={12} />
                <span className="uppercase tracking-widest">{itemCount} Signals Tracked</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-accent">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="uppercase tracking-widest">Live Sync v.1.2</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-full">
            <div className="flex overflow-x-auto scrollbar-none border border-primary max-w-full">
              <div className="flex flex-row">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-6 py-3 text-[10px] font-black tracking-widest border-r last:border-r-0 border-primary transition-all uppercase whitespace-nowrap
                      ${activeCategory === cat ? 'bg-primary text-white' : 'hover:bg-primary/5 text-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => fetchNews()}
              disabled={loading}
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-auto py-3 px-4 shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-12 border-2 border-destructive p-8 bg-destructive/5 flex items-start gap-4">
            <AlertCircle className="text-destructive shrink-0" size={24} />
            <div>
              <p className="font-black text-destructive uppercase tracking-widest text-xs mb-1">Signal Interruption</p>
              <p className="text-primary font-medium">{error}</p>
              <Button 
                variant="link" 
                onClick={() => fetchNews()} 
                className="p-0 h-auto text-destructive underline font-bold text-xs mt-2"
              >
                RETRY SYNCHRONIZATION
              </Button>
            </div>
          </div>
        )}

        {loading && !error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-r border-b border-primary">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <div key={i} className="border-l border-t border-primary p-6 h-[400px] flex flex-col justify-between">
                <div>
                  <Skeleton className="h-6 w-20 mb-6 bg-primary/5 rounded-none" />
                  <Skeleton className="h-10 w-full mb-4 bg-primary/5 rounded-none" />
                  <Skeleton className="h-4 w-full mb-2 bg-primary/5 rounded-none" />
                  <Skeleton className="h-4 w-2/3 bg-primary/5 rounded-none" />
                </div>
                <div className="pt-6 border-t border-primary/10 flex items-center justify-between">
                  <Skeleton className="h-4 w-24 bg-primary/5 rounded-none" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 bg-primary/5 rounded-none" />
                    <Skeleton className="h-8 w-8 bg-primary/5 rounded-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-r border-b border-primary">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((article, idx) => (
                  <div key={`${article.url}-${idx}`} className="border-l border-t border-primary">
                    <NewsCard article={article} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-32 border-l border-t border-primary flex flex-col items-center justify-center text-center px-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-4">Zero Signal Detection</p>
                  <p className="text-xl font-medium text-primary/40 max-w-xs">No intelligence items match the selected filter criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredNews.length > itemsPerPage && (
              <div className="flex items-center justify-between border-l border-r border-b border-primary bg-white select-none">
                {/* Page Indicator */}
                <div className="px-3 sm:px-6 py-4 text-[10px] font-black tracking-widest text-primary uppercase">
                  Page {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex border-l border-primary">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-6 py-4 text-[10px] font-black tracking-widest border-r border-primary uppercase transition-all
                      ${currentPage === 1 
                        ? 'opacity-30 cursor-not-allowed text-primary' 
                        : 'hover:bg-primary hover:text-white text-primary'}`}
                  >
                    PREV
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-6 py-4 text-[10px] font-black tracking-widest uppercase transition-all
                      ${currentPage === totalPages 
                        ? 'opacity-30 cursor-not-allowed text-primary' 
                        : 'hover:bg-primary hover:text-white text-primary'}`}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
