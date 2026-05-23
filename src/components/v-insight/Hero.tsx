import React from 'react';

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 border-b border-primary overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 flex flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase">Precision Real-Time Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-primary leading-[0.9] mb-6 break-words">
            THE ATOMIC<br />ARCHITECTURE<br />OF NEWS.
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-primary/80 font-medium leading-tight">
            Readongo distills the complexity of global tech trends into high-density, logic-driven intelligence cards.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col justify-end">
          <div className="swiss-border pl-6 py-4 mb-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Metrics v.1.0</p>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-black text-primary leading-none">150+</p>
                <p className="text-[10px] text-muted-foreground uppercase">Articles / Hr</p>
              </div>
              <div>
                <p className="text-4xl font-black text-accent leading-none">0.2s</p>
                <p className="text-[10px] text-muted-foreground uppercase">Inference Time</p>
              </div>
            </div>
          </div>
          <a 
            href="#latest"
            className="w-full bg-accent text-white py-6 font-black tracking-tighter text-xl hover:translate-x-2 transition-transform flex items-center justify-between px-8 group cursor-pointer"
          >
            START DISCOVERY
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>
      
      {/* Structural background elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -z-10 border-l border-primary/10 hidden md:block" />
    </section>
  );
}