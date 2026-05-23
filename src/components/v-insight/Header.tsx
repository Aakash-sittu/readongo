"use client";

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'LATEST', href: '#latest' },
    { label: 'SUMMARIZER', href: '#summarizer' },
    { label: 'DOCS', href: 'https://github.com/Aakash-sittu/readongo-backend' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary" />
          <span className="font-headline font-black text-lg sm:text-xl tracking-tighter text-primary">READONGO</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              target={item.label === 'DOCS' ? '_blank' : undefined}
              rel={item.label === 'DOCS' ? 'noopener noreferrer' : undefined}
              className="text-[10px] font-bold tracking-widest text-primary hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-accent" />
             <span className="text-[8px] font-black text-primary/40 tracking-[0.2em] uppercase">Status: Operational</span>
          </div>
          
          <a 
            href="#latest" 
            className="bg-primary text-white text-[10px] font-bold px-3 sm:px-4 py-2 hover:bg-accent transition-all uppercase tracking-widest block text-center cursor-pointer"
          >
            LIVE FEED
          </a>

          {/* Mobile Drawer trigger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 border border-primary/20 hover:border-primary transition-all text-primary flex items-center justify-center">
                  <Menu size={16} />
                </button>
              </SheetTrigger>
              <SheetContent className="rounded-none sm:rounded-none border-primary border-l-2 p-8 w-64 bg-white text-primary">
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary" />
                    <span className="font-headline font-black text-lg tracking-tighter text-primary">READONGO</span>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {menuItems.map((item) => (
                      <a 
                        key={item.label} 
                        href={item.href} 
                        target={item.label === 'DOCS' ? '_blank' : undefined}
                        rel={item.label === 'DOCS' ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                        className="text-[12px] font-black tracking-widest text-primary hover:text-accent transition-colors uppercase border-b border-primary/10 pb-2"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
