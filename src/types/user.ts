// src/types/user.ts (updated)
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  profile?: Profile | null;
}

export interface Profile {
  phoneNumber: any;
  profile: any;
  name: any;
  email: any;
  id: number;
  userId: number;
  department?: string | null;
  semester?: number | null;
  skills: string[];
  score?: number | null;
  yearOfPassout?: number | null;
  achievements: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Add UserData interface for localStorage
export interface UserData {
  name: string;
  email: string;
}

// types/user.ts
// src/types/user.ts
