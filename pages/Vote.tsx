
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Editor } from '../types';
import { CheckCircle, Lock, Play, Github, Info, Shield, Loader2 } from 'lucide-react';

const Vote: React.FC = () => {
  const { user, loginWithGithub, isLoading: authLoading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [editors, setEditors] = useState<Editor[]>([
    { id: '1', name: 'Zade Effects', thumbnail: 'https://picsum.photos/600/400?random=10', videoUrl: '#', votes: 1242, author: '@zade' },
    { id: '2', name: 'Neon Samurai', thumbnail: 'https://picsum.photos/600/400?random=11', videoUrl: '#', votes: 942, author: '@samurai' },
    { id: '3', name: 'Motion Flux', thumbnail: 'https://picsum.photos/600/400?random=12', videoUrl: '#', votes: 1105, author: '@flux' },
    { id: '4', name: 'After Visuals', thumbnail: 'https://picsum.photos/600/400?random=13', videoUrl: '#', votes: 856, author: '@visuals' },
  ]);
  const [votedId, setVotedId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.votedFor) {
      setVotedId(user.votedFor);
    }
  }, [user]);

  const handleGithubLogin = () => {
    setIsRedirecting(true);
    loginWithGithub();
  };

  const handleVote = (id: string) => {
    if (votedId) return;
    setVotedId(id);
    setEditors(prev => prev.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#39FF14]" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase">Tournament <span className="text-[#39FF14]">Access</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Authorized access required. Sign in with your GitHub account to verify your identity and cast your vote.
        </p>
      </header>

      {!user ? (
        <div className="max-w-md mx-auto glass p-10 rounded-2xl neon-border animate-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-8 text-[#39FF14]">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Secure Authentication</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Please authorize with GitHub to continue.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={handleGithubLogin}
              disabled={isRedirecting}
              className="w-full flex items-center justify-center space-x-3 py-4 bg-white text-black rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#39FF14] transition-all disabled:opacity-50"
            >
              {isRedirecting ? <Loader2 className="animate-spin" size={18} /> : <Github size={18} />}
              <span>{isRedirecting ? 'Connecting...' : 'Continue with GitHub'}</span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-start space-x-3">
              <Info className="text-[#39FF14] shrink-0" size={16} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Privacy Guarantee</p>
                <p className="text-[10px] text-gray-500 leading-normal">
                  We use GitHub to prevent bot voting. We only access your public profile and email address. No data is shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* User Status Bar */}
          <div className="glass p-6 rounded-xl flex flex-col md:flex-row items-center justify-between border border-[#39FF14]/20">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src={user.picture} className="w-12 h-12 rounded-full border border-[#39FF14]" alt="User" />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-lg">{user.name}</p>
                  {user.role === 'ADMIN' && <span className="bg-[#39FF14] text-black text-[8px] font-black px-1.5 py-0.5 rounded">ADMIN</span>}
                </div>
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
            <li>Authenticated GitHub account required to participate.</li>
            <li>Each verified user is permitted only ONE vote per season.</li>
            <li>System automatically detects and blocks multi-account abuse.</li>
          </ul>
          <ul className="space-y-4 list-disc list-inside">
            <li>Votes are cryptographically linked to your unique GitHub ID.</li>
            <li>VPN and Proxy monitoring is enabled to prevent fraudulent activity.</li>
            <li>The top 3 winners will undergo a manual audit of vote origins.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Vote;
