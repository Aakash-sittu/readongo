"use client";

import React from 'react';

export function Footer() {
  return (
    <footer className="py-20 bg-background border-t border-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary" />
              <span className="font-headline font-black text-2xl tracking-tighter text-primary">VEKTOR INSIGHT</span>
            </div>
            <p className="max-w-md text-primary/60 font-medium leading-relaxed mb-8">
              A systematic exploration of the global technological landscape.
              Objective, machined, and neutral intelligence for the next generation of builders.
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">
              © 2026 Aakash. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Navigation</p>
            <ul className="space-y-4">
              <li>
                <a href="#latest" className="text-sm font-bold text-primary/80 hover:text-accent transition-colors">Live Feed</a>
              </li>
              <li>
                <a href="#summarizer" className="text-sm font-bold text-primary/80 hover:text-accent transition-colors">Summarizer</a>
              </li>
              <li>
                <a
                  href="https://github.com/Aakash-sittu/readongo-backend/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-primary/80 hover:text-accent transition-colors"
                >
                  About System
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Categories</p>
            <ul className="space-y-4">
              {['AI/ML', 'Programming', 'Business/Startups', 'Security', 'Gadgets', 'Science', 'Other'].map(cat => (
                <li key={cat}>
                  <a
                    href="#latest"
                    onClick={() => {
                      const event = new CustomEvent('select-category', { detail: cat });
                      window.dispatchEvent(event);
                    }}
                    className="text-sm font-bold text-primary/80 hover:text-accent transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Status</p>
            <div className="flex items-center gap-2 text-accent font-black text-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              SYSTEM OPERATIONAL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}