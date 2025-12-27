
import React from 'react';

export const COLORS = {
  NEON_GREEN: '#39FF14',
  DARK_BG: '#050505',
  GLASS_BG: 'rgba(255, 255, 255, 0.03)',
  DIAMOND: '#B9F2FF',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32'
};

export const NAVIGATION = [
  { name: 'Home', path: '/' },
  { name: 'Vote', path: '/vote' },
  { name: 'Gift', path: '/gift' },
  { name: 'Rate Us', path: '/rate' },
  { name: 'Admin', path: '/admin', adminOnly: true },
];

export const GIFT_PACKAGES = [
  { id: '1', stars: 1, votes: 2, price: '1 Star' },
  { id: '2', stars: 15, votes: 35, price: '15 Stars' },
];

export const PRIZES = [
  { 
    rank: "Grand Champion", 
    tier: "Diamond",
    amount: "1st Place", 
    desc: "25 Telegram Stars • AE/AM Premium Assets • 75+ High-Quality Pfps • Oryn Premium Editing Pack", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    color: COLORS.NEON_GREEN
  },
  { 
    rank: "Elite Performer", 
    tier: "Silver",
    amount: "2nd Place", 
    desc: "10 Telegram Stars • Advanced Plugin Bundle • 30+ Curated Pfps", 
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=800",
    color: "#C0C0C0"
  },
  { 
    rank: "Rising Talent", 
    tier: "Bronze",
    amount: "3rd Place", 
    desc: "5 Telegram Stars • Starter Asset Pack • Exclusive Role", 
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    color: "#CD7F32"
  },
];
