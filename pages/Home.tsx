
import React from 'react';
import CountdownTimer from '../components/CountdownTimer';
import { PRIZES, COLORS } from '../constants';
import { ChevronRight, Award, Zap, Users, Shield, Gem, Trophy, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none -z-20" />
        
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#39FF14]">Season 04 • Live Countdown</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            THE ULTIMATE <br />
            <span className="text-[#39FF14] neon-glow">EDITORS ARENA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Unleash your creativity. Compete against the world's best motion designers and editors for fame and high-tier rewards.
          </p>
          
          <div className="mb-12 flex justify-center">
            <CountdownTimer />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a 
              href="https://forms.gle/UWnLvPZRE4Q2kKS96" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-10 py-4 bg-[#39FF14] text-black font-black uppercase tracking-widest text-sm rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">Register Now</span>
            </a>
            <button className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-white/10 transition-colors">
              View Rules
            </button>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-20 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-4xl font-medium text-gray-300 italic">
            “Want to <span className="text-[#39FF14]">register</span> and see your <span className="text-[#39FF14]">edit</span> win?”
          </p>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#39FF14] font-bold mb-4">The Rewards</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">PRIZE POOL</h3>
          </div>
          <p className="text-gray-400 max-w-md text-right">
            Exceptional work deserves exceptional rewards. Our Diamond tier marks the pinnacle of editing excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRIZES.map((prize, idx) => {
            const isFirst = idx === 0;
            return (
              <div 
                key={idx} 
                className={`group relative glass rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-4 border ${isFirst ? 'border-[#39FF14]/50 scale-105 z-10 shadow-[0_0_50px_rgba(57,255,20,0.15)]' : 'border-white/10 opacity-90 hover:opacity-100'}`}
              >
                {/* Tier Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-2">
                  <div className="glass px-3 py-1 rounded-full flex items-center space-x-2 border border-white/20">
                    {idx === 0 && <Gem size={14} className="text-[#39FF14]" />}
                    {idx === 1 && <Trophy size={14} className="text-[#C0C0C0]" />}
                    {idx === 2 && <Star size={14} className="text-[#CD7F32]" />}
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{prize.tier}</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 z-20 glass w-10 h-10 rounded-full flex items-center justify-center font-black border border-white/20" style={{ color: prize.color }}>
                  #{idx + 1}
                </div>

                <div className="aspect-video w-full overflow-hidden relative">
                  {isFirst && <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />}
                  <img 
                    src={prize.image} 
                    alt={prize.rank} 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${!isFirst && 'grayscale group-hover:grayscale-0'}`} 
                  />
                  {isFirst && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-[#39FF14]/30 animate-pulse">
                        <Gem size={48} className="text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h4 className="font-black text-4xl mb-2" style={{ color: prize.color }}>{prize.amount}</h4>
                  <p className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <span>{prize.rank}</span>
                    {isFirst && <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-ping" />}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">{prize.desc}</p>
                  
                  {isFirst && (
                    <div className="mt-8 pt-6 border-t border-[#39FF14]/20">
                      <div className="flex items-center space-x-2 text-[#39FF14] text-xs font-bold uppercase tracking-widest">
                        <Award size={14} />
                        <span>Grand Champion Status</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-14 h-14 glass rounded-lg flex items-center justify-center text-[#39FF14]">
              <Zap size={32} />
            </div>
            <h4 className="text-2xl font-bold">Industry Exposure</h4>
            <p className="text-gray-400 leading-relaxed">
              Your edits will be showcased to thousands of creative directors and professional editors in the community.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 glass rounded-lg flex items-center justify-center text-[#39FF14]">
              <Shield size={32} />
            </div>
            <h4 className="text-2xl font-bold">Fair Play Ethics</h4>
            <p className="text-gray-400 leading-relaxed">
              GitHub authentication and strict verification systems ensure every vote is authentic and earned.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-14 h-14 glass rounded-lg flex items-center justify-center text-[#39FF14]">
              <Users size={32} />
            </div>
            <h4 className="text-2xl font-bold">Creator Network</h4>
            <p className="text-gray-400 leading-relaxed">
              Join an elite circle of video creators. Collaborate, learn, and grow your personal brand in our server.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-40 text-center px-6">
        <div className="max-w-3xl mx-auto glass p-16 rounded-3xl neon-border relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#39FF14]/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#39FF14]/10 rounded-full blur-[80px]" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">READY TO DOMINATE?</h2>
          <p className="text-gray-400 text-lg mb-12 relative z-10">Registration closes when the countdown hits zero. Don't miss your chance.</p>
          <a 
            href="https://forms.gle/UWnLvPZRE4Q2kKS96" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-[#39FF14] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all relative z-10"
          >
            CLAIM YOUR SPOT
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
