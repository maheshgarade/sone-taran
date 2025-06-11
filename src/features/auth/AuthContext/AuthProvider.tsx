import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  requestPhoneOtpApi,
  requestEmailOtpApi,
  verifyPhoneOtpApi,
  verifyEmailOtpApi,
} from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullhash, setFullhash] = useState<string | null>(null);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [emailToken, setEmailToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  // Restore token if page reloads
  useEffect(() => {
    const storedToken = localStorage.getItem('otpToken');
    const storedEmailToken = localStorage.getItem('emailToken');
    if (storedToken) {
      setOtpToken(storedToken);
    }
    if (storedEmailToken) {
      setEmailToken(storedEmailToken);
    }
  }, []);

  const requestOtp = async (phone: string) => {
    const response = await requestPhoneOtpApi(phone);
    setFullhash(response.fullhash);
    setOtpToken(response.otpToken);
    localStorage.setItem('otpToken', response.otpToken);
    setPhoneNumber(phone);
  };

  const requestEmailOtp = async (email: string) => {
    const response = await requestEmailOtpApi(email);
    setEmailToken(response.token);
    localStorage.setItem('emailToken', response.token);
    setEmail(email);
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

  const verifyEmailOtp = async (otp: string) => {
    if (!emailToken) return false;
    const success = await verifyEmailOtpApi(otp, emailToken);
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    }
    return success;
  };

  const logout = () => {
    setPhoneNumber(null);
    setEmail(null);
    setIsAuthenticated(false);
    setOtpToken(null);
    setEmailToken(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('otpToken');
    localStorage.removeItem('emailToken');
  };

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        email,
        requestOtp,
        requestEmailOtp,
        verifyEmailOtp,
        verifyOtp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
