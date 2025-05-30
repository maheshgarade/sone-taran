import { createContext } from "react";

export interface AuthContextType {
  phoneNumber: any | null;
  requestOtp: (phone: any) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
