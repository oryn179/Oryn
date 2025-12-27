
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Editor } from '../types';
// Added Shield to imports
import { CheckCircle, Lock, Play, Mail, Loader2, Info, Shield } from 'lucide-react';

const Vote: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [editors, setEditors] = useState<Editor[]>([
    { id: '1', name: 'Zade Effects', thumbnail: 'https://picsum.photos/600/400?random=10', videoUrl: '#', votes: 1242, author: '@zade' },
    { id: '2', name: 'Neon Samurai', thumbnail: 'https://picsum.photos/600/400?random=11', videoUrl: '#', votes: 942, author: '@samurai' },
    { id: '3', name: 'Motion Flux', thumbnail: 'https://picsum.photos/600/400?random=12', videoUrl: '#', votes: 1105, author: '@flux' },
    { id: '4', name: 'After Visuals', thumbnail: 'https://picsum.photos/600/400?random=13', videoUrl: '#', votes: 856, author: '@visuals' },
  ]);
  const [votedId, setVotedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.votedFor) {
      setVotedId(user.votedFor);
    }
  }, [user]);

  const handleVote = (id: string) => {
    if (votedId) return;
    setVotedId(id);
    // Simulate API call to save vote
    setEditors(prev => prev.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await login(email);
    setIsSubmitting(false);
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">SECURE <span className="text-[#39FF14]">VOTING</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          One person, one vote. Our system uses Magic Link technology to verify your identity and ensure a fair outcome for all editors.
        </p>
      </header>

      {!user ? (
        <div className="max-w-md mx-auto glass p-10 rounded-2xl neon-border animate-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-8 text-[#39FF14]">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Authentication Required</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@oryn.com"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-12 focus:border-[#39FF14] transition-colors outline-none"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-[#39FF14] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] flex items-center justify-center space-x-2 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <span>Send Magic Link</span>}
            </button>
          </form>
          <div className="mt-8 flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/5">
            <Info className="text-[#39FF14] shrink-0" size={16} />
            <p className="text-[10px] text-gray-500 leading-normal">
              By logging in, you agree to our fair-play terms. We store your email securely and only use it for tournament verification.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* User Status Bar */}
          <div className="glass p-6 rounded-xl flex flex-col md:flex-row items-center justify-between border border-[#39FF14]/20">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src={user.picture} className="w-12 h-12 rounded-full border border-[#39FF14]" alt="User" />
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${votedId ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-gray-500/10 text-gray-500'}`}>
                {votedId ? <CheckCircle size={16} /> : <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />}
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  {votedId ? 'Vote Recorded' : 'Waiting for Vote'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editors.map((editor) => (
              <div 
                key={editor.id} 
                className={`relative group glass rounded-2xl overflow-hidden border transition-all duration-300 ${votedId === editor.id ? 'border-[#39FF14] ring-1 ring-[#39FF14]' : 'border-white/10 hover:border-[#39FF14]/50'}`}
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-900">
                  <img src={editor.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={editor.name} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
                      <Play className="fill-white" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#39FF14]">
                    {editor.votes.toLocaleString()} Votes
                  </div>
                </div>
                
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{editor.name}</h3>
                    <p className="text-[#39FF14] text-sm font-medium">{editor.author}</p>
                  </div>
                  
                  {votedId === editor.id ? (
                    <div className="bg-[#39FF14] text-black px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center space-x-2">
                      <CheckCircle size={14} />
                      <span>Selected</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleVote(editor.id)}
                      disabled={!!votedId}
                      className={`px-8 py-3 rounded-sm font-black text-xs uppercase tracking-widest transition-all ${votedId ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]'}`}
                    >
                      {votedId ? 'Locked' : 'Cast Vote'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Section */}
      <section className="mt-32 p-10 glass rounded-2xl border border-white/5">
        <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
          <Shield className="text-[#39FF14]" size={20} />
          <span>VOTING RULES & INTEGRITY</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 text-sm leading-relaxed">
          <ul className="space-y-4 list-disc list-inside">
            <li>You must log in via your own email to participate.</li>
            <li>Each verified user is permitted only ONE vote per season.</li>
            <li>Once cast, votes are permanently locked and cannot be changed.</li>
          </ul>
          <ul className="space-y-4 list-disc list-inside">
            <li>Suspected bot accounts or mass-voting schemes will be disqualified.</li>
            <li>IP monitoring is enabled to prevent duplicate account abuse.</li>
            <li>The top 3 winners will undergo a full audit of their vote source.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Vote;
