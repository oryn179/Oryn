
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Shield, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#39FF14] rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <span className="text-black font-bold -rotate-45">O</span>
          </div>
          <span className="text-xl font-bold tracking-tighter">ORYN <span className="text-[#39FF14]">SERVER</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#39FF14] ${isActive ? 'text-[#39FF14] neon-glow' : 'text-gray-400'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Auth / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="text-sm font-bold text-white">{user.name}</p>
              </div>
              <img src={user.picture} alt="Avatar" className="w-9 h-9 rounded-full border border-[#39FF14]/50" />
              <button onClick={logout} className="p-2 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/vote" className="px-6 py-2 bg-[#39FF14] text-black font-bold rounded-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              JOIN TOURNAMENT
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-6 space-y-4 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-200">
          {NAVIGATION.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-[#39FF14]"
              >
                {item.name}
              </Link>
            );
          })}
          {!user && (
            <Link 
              to="/vote" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 bg-[#39FF14] text-black font-bold rounded-sm"
            >
              JOIN TOURNAMENT
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
