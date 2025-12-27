
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, GiftTransaction, UserRole } from '../types';
import { Users, Vote, Gift, BarChart3, Search, Check, X, AlertCircle } from 'lucide-react';

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'votes' | 'gifts' | 'users'>('overview');

  if (!isAdmin) {
    return (
      <div className="pt-40 text-center">
        <div className="inline-flex items-center space-x-2 text-red-500 mb-6 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
          <AlertCircle size={20} />
          <span className="font-bold uppercase tracking-widest text-xs">Access Denied</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">RESTRICTED AREA</h1>
        <p className="text-gray-500 max-w-md mx-auto">This route requires Administrator privileges. Your IP and attempt have been logged in our audit system.</p>
        <a href="/" className="inline-block mt-8 text-[#39FF14] hover:underline font-bold">Return Home</a>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Nav */}
        <div className="lg:w-72 shrink-0">
          <h1 className="text-3xl font-black mb-10 tracking-tighter">ADMIN <span className="text-[#39FF14]">PANEL</span></h1>
          <nav className="space-y-2">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'votes', name: 'Votes Audit', icon: Vote },
              { id: 'gifts', name: 'Gift Management', icon: Gift },
              { id: 'users', name: 'User Database', icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#39FF14] text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Live Votes" value="4,821" color="text-[#39FF14]" />
            <StatCard label="Active Users" value="1,290" color="text-white" />
            <StatCard label="Pending Gifts" value="12" color="text-orange-400" />
            <StatCard label="Total Rating" value="4.8/5" color="text-blue-400" />
          </div>

          {/* Dynamic Sections */}
          <div className="glass rounded-2xl border border-white/10 min-h-[600px] overflow-hidden">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'gifts' && <GiftsTab />}
            {activeTab === 'votes' && <VotesTab />}
            {activeTab === 'users' && <UsersTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="glass p-8 rounded-2xl border border-white/5">
    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{label}</p>
    <p className={`text-4xl font-black ${color}`}>{value}</p>
  </div>
);

const OverviewTab = () => (
  <div className="p-10 space-y-10">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold uppercase tracking-tight">Performance Summary</h3>
      <div className="flex space-x-2">
        <div className="px-3 py-1 bg-[#39FF14]/10 text-[#39FF14] text-[10px] font-bold rounded-full">REALTIME</div>
      </div>
    </div>
    <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 border-dashed">
      <p className="text-gray-500 italic">Analytical Charts Loading...</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass p-6 rounded-xl border border-white/5">
        <h4 className="font-bold mb-4 text-[#39FF14]">Recent Audit Logs</h4>
        <ul className="space-y-3 text-xs">
          <li className="flex justify-between p-2 hover:bg-white/5 rounded">
            <span className="text-gray-400">Admin Approved Gift #X92</span>
            <span className="text-gray-600">2m ago</span>
          </li>
          <li className="flex justify-between p-2 hover:bg-white/5 rounded">
            <span className="text-gray-400">New User Verified: lex@oryn.com</span>
            <span className="text-gray-600">14m ago</span>
          </li>
          <li className="flex justify-between p-2 hover:bg-white/5 rounded text-red-400">
            <span className="">Duplicate IP Flagged: 192.168.1.1</span>
            <span className="text-gray-600">45m ago</span>
          </li>
        </ul>
      </div>
      <div className="glass p-6 rounded-xl border border-white/5">
        <h4 className="font-bold mb-4 text-[#39FF14]">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Freeze Voting</button>
          <button className="py-3 bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Export D1 CSV</button>
          <button className="py-3 bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Clear Sessions</button>
          <button className="py-3 bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">Broadcast T-Msg</button>
        </div>
      </div>
    </div>
  </div>
);

const GiftsTab = () => {
  const mockGifts: GiftTransaction[] = [
    { id: 'TX-101', userId: '1', userEmail: 'pro_editor@gmail.com', stars: 15, votes: 35, status: 'PENDING', timestamp: Date.now() },
    { id: 'TX-102', userId: '2', userEmail: 'vfx_king@outlook.com', stars: 1, votes: 2, status: 'APPROVED', timestamp: Date.now() - 1000000 },
  ];

  return (
    <div className="p-0">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-2xl font-bold uppercase tracking-tight">Gift Queue</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-6 text-sm outline-none focus:border-[#39FF14]" placeholder="Search ID..." />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black border-b border-white/5">
          <tr>
            <th className="p-6">Trans ID</th>
            <th className="p-6">User Email</th>
            <th className="p-6">Amount</th>
            <th className="p-6">Votes</th>
            <th className="p-6">Status</th>
            <th className="p-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {mockGifts.map((gift) => (
            <tr key={gift.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-6 font-mono text-xs">{gift.id}</td>
              <td className="p-6">{gift.userEmail}</td>
              <td className="p-6">{gift.stars} Stars</td>
              <td className="p-6 text-[#39FF14] font-bold">+{gift.votes}</td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${gift.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500' : 'bg-[#39FF14]/10 text-[#39FF14]'}`}>
                  {gift.status}
                </span>
              </td>
              <td className="p-6">
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-[#39FF14] hover:text-black rounded transition-colors"><Check size={16}/></button>
                  <button className="p-2 hover:bg-red-500 hover:text-white rounded transition-colors"><X size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VotesTab = () => (
  <div className="p-10 text-center">
    <Vote size={48} className="mx-auto text-gray-700 mb-6" />
    <h3 className="text-xl font-bold mb-2">Vote Audit System</h3>
    <p className="text-gray-500 text-sm max-w-sm mx-auto">This section provides a cryptographically signed list of all cast votes, mapped to verified email addresses.</p>
  </div>
);

const UsersTab = () => (
  <div className="p-10 text-center">
    <Users size={48} className="mx-auto text-gray-700 mb-6" />
    <h3 className="text-xl font-bold mb-2">User Database</h3>
    <p className="text-gray-500 text-sm max-w-sm mx-auto">Manage all registered editors, adjust roles, or revoke access for community guidelines violations.</p>
  </div>
);

export default Admin;
