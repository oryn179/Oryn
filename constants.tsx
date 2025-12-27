
import React from 'react';

export const COLORS = {
  NEON_GREEN: '#39FF14',
  DARK_BG: '#050505',
  GLASS_BG: 'rgba(255, 255, 255, 0.03)',
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
    rank: "1st Place", 
    amount: "$500", 
    desc: "Full license of AE + Premium Assets", 
    image: "https://picsum.photos/400/300?random=1" 
  },
  { 
    rank: "2nd Place", 
    amount: "$250", 
    desc: "Premium Plugins + Asset Bundle", 
    image: "https://picsum.photos/400/300?random=2" 
  },
  { 
    rank: "3rd Place", 
    amount: "$100", 
    desc: "Oryn Creator Asset Pack", 
    image: "https://picsum.photos/400/300?random=3" 
  },
];
