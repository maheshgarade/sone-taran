import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { requestPhoneOtpApi, verifyPhoneOtpApi } from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [fullhash, setFullhash] = useState<string | null>(null);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  // Restore token if page reloads
  useEffect(() => {
    const storedToken = localStorage.getItem('otpToken');
    if (storedToken) {
      setOtpToken(storedToken);
    }
  }, []);

  const requestOtp = async (phone: string) => {
    const response = await requestPhoneOtpApi(phone);
    setFullhash(response.fullhash);
    setOtpToken(response.otpToken);
    localStorage.setItem('otpToken', response.otpToken);
    setPhoneNumber(phone);
  };

  const verifyOtp = async (otp: string) => {
    if (!fullhash || !phoneNumber || !otpToken) return false;
    const success = await verifyPhoneOtpApi(
      phoneNumber,
      otp,
      fullhash,
      otpToken
    );
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return success;
  };

  const logout = () => {
    setPhoneNumber(null);
    setIsAuthenticated(false);
    setOtpToken(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('otpToken');
  };

  return (
    <AuthContext.Provider
      value={{ phoneNumber, requestOtp, verifyOtp, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
