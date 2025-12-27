
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Gift from './pages/Gift';
import Rate from './pages/Rate';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#39FF14] selection:text-black">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/gift" element={<Gift />} />
              <Route path="/rate" element={<Rate />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          
          <footer className="py-20 border-t border-white/5 glass">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
              <div>
                <span className="text-xl font-bold tracking-tighter">ORYN <span className="text-[#39FF14]">SERVER</span></span>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-medium">© 2024 Built for Video Editors</p>
              </div>
              <div className="flex space-x-12">
                <div className="flex flex-col space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Navigation</span>
                  <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</a>
                  <a href="/vote" className="text-sm text-gray-400 hover:text-white transition-colors">Vote</a>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Connect</span>
                  <a href="https://t.me/Oryn179" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">Telegram</a>
                  <a href="https://forms.gle/UWnLvPZRE4Q2kKS96" target="_blank" className="text-sm text-gray-400 hover:text-white transition-colors">Register</a>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Legal</span>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
