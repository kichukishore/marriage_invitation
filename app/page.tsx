"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, ArrowDown, Users, Download, Volume2, VolumeX } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WeddingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // --- MUSIC TOGGLE ---
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- IMPROVED DOWNLOAD FUNCTION (Mobile & Desktop Friendly) ---
const downloadInvite = async () => {
    if (containerRef.current === null) return;
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Cast to 'any' to bypass the missing type definition for CORS/Query params
      const options: any = {
        cacheBust: true,
        backgroundColor: '#0a0a0a',
        style: {
          borderRadius: '0',
        },
        pixelRatio: 2,
      };

      const dataUrl = await toPng(containerRef.current, options);

      const link = document.createElement('a');
      link.download = 'Kishore-Keerthana-Wedding.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert("Unable to download image. Please try using Chrome or Safari.");
    } finally {
      setIsDownloading(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.85]), { stiffness: 100, damping: 30 });
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] text-white selection:bg-amber-200 selection:text-black overflow-x-hidden">
      
      {/* --- AUDIO ELEMENT --- */}
      <audio ref={audioRef} loop src="/marriage_invitation/wedding-music.mp3" />

      {/* --- MUSIC FLOATING BUTTON --- */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleMusic}
          className="p-3 rounded-full bg-amber-500/20 border border-white/10 backdrop-blur-md text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* --- FLOATING LOGO (image3) --- */}
      <div className="fixed top-6 left-6 z-50">
        <img 
          src="/marriage_invitation/Image3.png" 
          alt="Logo" 
          className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full border border-white/10 backdrop-blur-md"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* --- AESTHETIC BACKGROUND --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-amber-900/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -120, 0], x: [0, -50, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-yellow-800/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ scale: scaleProgress, opacity: opacityProgress }} 
        className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 text-center px-6"
      >
        <div className="relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="block text-amber-500 font-medium tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6">A Love Story in Motion</span>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-4 italic">Kishore & Keerthana</h1>
            <div className="h-[1px] w-24 bg-amber-500/50 mx-auto my-8" />
            <p className="text-neutral-400 font-light text-base md:text-xl tracking-wide uppercase">Save The Date • July 5, 2026</p>
          </motion.div>
          
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-24 text-neutral-500 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to see our journey</span>
            <ArrowDown size={20} strokeWidth={1} />
          </motion.div>
        </div>
      </motion.section>

      {/* --- THE TIMELINE --- */}
      <section className="relative z-20 py-24 md:py-48 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 space-y-32 md:space-y-48">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h4 className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-4">The Prelude</h4>
            <h3 className="text-3xl md:text-5xl font-light italic mb-6">It started in the hallways.</h3>
            <p className="text-neutral-400 font-light leading-relaxed text-lg md:text-xl">
              I saw her in schooling. At that time, I never could have imagined that the girl in the distance would one day become my life partner.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
          >
            <div className="w-full md:w-1/2 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative group">
              <img src="/marriage_invitation/image1.png" alt="First Sight" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-amber-500 font-medium tracking-widest text-xs mb-4 uppercase">March 30, 2019 Our First Picture</p>
              <h3 className="text-4xl md:text-5xl font-light mb-6 text-neutral-100 italic">The First Glance.</h3>
              <p className="text-neutral-400 font-light leading-relaxed text-lg">
                The day our adult lives truly aligned. One photo that captured the spark of a thousand memories yet to come.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24"
          >
            <div className="w-full md:w-1/2 text-left md:text-right">
              <p className="text-amber-500 font-medium tracking-widest text-xs mb-4 uppercase">The Engagement</p>
              <h3 className="text-4xl md:text-5xl font-light mb-6 text-neutral-100 italic">The Forever Promise.</h3>
              <p className="text-neutral-400 font-light leading-relaxed text-lg">
                In front of our loved ones, we chose each other. A moment of pure joy that turned our love story into a lifelong commitment.
              </p>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative group">
              <img src="/marriage_invitation/image2.png" alt="Engagement" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FINAL INVITATION SECTION --- */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-6">
        <div className="max-w-xl w-full bg-[#111] border border-white/10 p-8 md:p-16 rounded-[3rem] text-center shadow-2xl mb-12">
          <Heart className="mx-auto text-amber-500 mb-6" fill="currentColor" size={32} />
          <h2 className="text-3xl md:text-5xl font-light mb-4 tracking-tight">The Marriage</h2>
          <div className="flex items-center justify-center gap-2 text-neutral-400 mb-10 text-xs tracking-widest uppercase">
            <Users size={14} /> <span>You & Your Family are Cordially Invited</span>
          </div>

          <div className="space-y-6 text-left border-y border-white/5 py-10">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Calendar className="text-amber-500" size={18} />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Reception</p>
                <p className="text-sm md:text-base font-medium text-neutral-200 uppercase">July 4, 2026 • 7:00 PM onwards</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Clock className="text-amber-500" size={18} />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Marriage Muhurtham</p>
                <p className="text-sm md:text-base font-medium text-neutral-200 uppercase">July 5, 2026 • 4:00 AM – 7:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <MapPin className="text-amber-500" size={18} />
              </div>
              <div>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-1 font-bold">The Venue</p>
                <p className="text-sm md:text-base font-medium text-neutral-200 leading-relaxed uppercase">
                  PMS SALAMMAL KALYANA MANDAPAM,<br/>
                  Pichanoor Pet, Gopalapuram, Gudiyattam, Tamil Nadu 632602 
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 italic text-neutral-500 text-sm">
            "Your presence will make our celebration complete."
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl px-4">
          <a 
            href="https://maps.app.goo.gl/YourLinkHere" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold tracking-[0.2em] text-[10px] uppercase transition-all shadow-lg active:scale-95"
          >
            <MapPin size={16} /> Locate Venue
          </a>
          <button 
            onClick={downloadInvite}
            disabled={isDownloading}
            className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-2xl font-bold tracking-[0.2em] text-[10px] uppercase transition-all shadow-lg active:scale-95 ${isDownloading ? 'bg-neutral-500 text-neutral-300 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-100'}`}
          >
            {isDownloading ? 'Processing...' : <><Download size={16} /> Download Invite</>}
          </button>
        </div>
      </section>

      <footer className="h-24 text-center text-neutral-600 text-[10px] uppercase tracking-[0.3em] pb-10">
        Kichu & Keerthana 2026 ❤️  
      </footer>
    </div>
  );
}
