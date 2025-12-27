
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  votedFor?: string; // Editor ID
  rating?: number;
  picture?: string;
}

export interface Editor {
  id: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
  votes: number;
  author: string;
}

export interface GiftPackage {
  id: string;
  stars: number;
  votes: number;
  price: string;
}

export interface GiftTransaction {
  id: string;
  userId: string;
  userEmail: string;
  stars: number;
  votes: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: number;
}

export interface SiteStats {
  totalVotes: number;
  activeUsers: number;
  avgRating: number;
}
