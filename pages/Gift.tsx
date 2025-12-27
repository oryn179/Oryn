
import React from 'react';
import { GIFT_PACKAGES } from '../constants';
import { Send, Check, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

const Gift: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase">Support & <span className="text-[#39FF14]">Gift</span></h1>
        <p className="text-gray-400">
          Want to boost your favorite editor? Gift votes are a way to support the server and the creators you love. All proceeds go toward the prize pool.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {GIFT_PACKAGES.map((pkg) => (
          <div key={pkg.id} className="group relative glass rounded-2xl p-10 border border-white/10 hover:border-[#39FF14] transition-all duration-500 overflow-hidden">
            {pkg.stars >= 15 && (
              <div className="absolute top-6 right-6 bg-[#39FF14] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                Best Value
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-5xl font-black mb-2">{pkg.votes} <span className="text-2xl text-[#39FF14]">VOTES</span></h3>
              <p className="text-gray-400 font-medium">Tournament Gift Package</p>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300">Instant vote boost for your pick</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300">"Top Contributor" server badge</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300">Entry into our monthly asset giveaway</span>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col space-y-4">
              <a 
                href="https://t.me/Oryn179" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-sm hover:bg-[#39FF14] transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Pay Here • @Oryn179</span>
              </a>
              <button className="w-full py-4 border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-sm hover:bg-white/5 transition-colors flex items-center justify-center space-x-2">
                <span>Confirm Payment</span>
                <ExternalLink size={14} className="opacity-50" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
            <ShieldCheck size={24} />
          </div>
          <h4 className="font-bold">Manual Verification</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Each transaction is reviewed by Oryn admins within 1-6 hours to ensure zero fraud and maximum safety.</p>
        </div>
        <div className="glass p-8 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
            <Send size={24} />
          </div>
          <h4 className="font-bold">Telegram Exclusive</h4>
          <p className="text-xs text-gray-500 leading-relaxed">We use Telegram to maintain direct communication between supporters and the admin team.</p>
        </div>
        <div className="glass p-8 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
            <Heart size={24} />
          </div>
          <h4 className="font-bold">Support the Scene</h4>
          <p className="text-xs text-gray-500 leading-relaxed">All gifted votes directly fund the current season's prize pool and future platform enhancements.</p>
        </div>
      </div>
    </div>
  );
};

export default Gift;
