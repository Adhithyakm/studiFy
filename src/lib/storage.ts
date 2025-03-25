// /src/lib/storage.ts
import { UserData } from '../types/user';

export const storeUserData = (name: string, email: string): void => {
  localStorage.setItem('user', JSON.stringify({ name, email }));
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) as UserData : null;
};

export const clearUserData = (): void => {
  localStorage.removeItem('user');
};