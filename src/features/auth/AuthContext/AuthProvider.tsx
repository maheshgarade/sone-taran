import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { requestOtpApi, verifyOtpApi } from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);
  
  const requestOtp = async (phone: any) => {
    await requestOtpApi(phone);
    setPhoneNumber(phone);
  };
  
  const verifyOtp = async (otp: string, fullhash: string) => {
    const success = await verifyOtpApi(phoneNumber!, otp, fullhash);
    if (success) setIsAuthenticated(true);
    return success;
  };

  const logout = () => {
    setPhoneNumber(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ phoneNumber, requestOtp, verifyOtp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
