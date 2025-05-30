import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { requestOtpApi, verifyOtpApi } from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullhash, setfullhash] = useState<string | null>(null);


  const requestOtp = async (phone: string) => {
    const response = await requestOtpApi(phone);
    setfullhash(response.fullhash);
    setPhoneNumber(phone);
  };

  const verifyOtp = async (otp: string) => {
    if (!fullhash || !phoneNumber) return false;
    const success = await verifyOtpApi(phoneNumber, otp, fullhash);
    if (success) setIsAuthenticated(true);
    console.log(success);
    return success;
  };

  const logout = () => {
    setPhoneNumber(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ phoneNumber, requestOtp, verifyOtp, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
