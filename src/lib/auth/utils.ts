// /src/lib/auth/utils.ts
import { UserData } from '../../types/user';

/**
 * Validates if a user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const userData = localStorage.getItem('user');
  return !!userData;
};

/**
 * Logs out the current user by removing their data from localStorage
 */
export const logoutUser = (): void => {
  localStorage.removeItem('user');
  // You can add additional cleanup here if needed
};

/**
 * Verifies if the provided email matches the stored email
 * @param {string} email - Email to verify
 * @returns {boolean} True if email matches stored email
 */
export const verifyUser = (email: string): boolean => {
  const userData = localStorage.getItem('user');
  if (!userData) return false;
  
  const parsedData = JSON.parse(userData) as UserData;
  return email.toLowerCase() === parsedData.email.toLowerCase();
};