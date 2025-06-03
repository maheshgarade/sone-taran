import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { requestOtpApi, verifyOtpApi } from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [fullhash, setfullhash] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const requestOtp = async (phone: string) => {
    const response = await requestOtpApi(phone);
    setfullhash(response.fullhash);
    setPhoneNumber(phone);
  };

  const verifyOtp = async (otp: string) => {
    if (!fullhash || !phoneNumber) return false;
    const success = await verifyOtpApi(phoneNumber, otp, fullhash);
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    }
    return success;
  };

  const logout = () => {
    setPhoneNumber(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ phoneNumber, requestOtp, verifyOtp, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
