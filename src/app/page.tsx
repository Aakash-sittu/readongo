import { Header } from '@/components/v-insight/Header';
import { Hero } from '@/components/v-insight/Hero';
import { NewsFeed } from '@/components/v-insight/NewsFeed';
import { SummaryTool } from '@/components/v-insight/SummaryTool';
import { Footer } from '@/components/v-insight/Footer';

export default function Home() {
  return (
    <div className="min-h-screen grid-overlay">
      <Header />
      <main className="flex flex-col">
        <Hero />
        
        {/* News Feed Section */}
        <NewsFeed />
        
        {/* AI Summarizer Interactive Section */}
        <SummaryTool />
        
        {/* Informational Callout */}
        <section className="py-20 border-b border-primary bg-accent/5">
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-7xl font-black text-primary mb-8 max-w-4xl uppercase leading-[0.85]">
              Information Density for the <span className="text-accent">Hyper-Modern</span> Architect.
            </h2>
            <p className="text-xl md:text-2xl font-medium text-primary/70 max-w-2xl mb-12">
              Our algorithms analyze over 10,000 daily signals to deliver only what is essential for technical leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm sm:max-w-none">
              <a 
                href="https://github.com/Aakash-sittu/readongo-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary font-black tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all cursor-pointer block text-center w-full sm:w-auto"
              >
                ACCESS DOCUMENTATION
              </a>
              <div className="px-8 py-4 bg-primary text-white font-black tracking-widest text-[10px] text-center w-full sm:w-auto">
                JOIN THE NETWORK
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}