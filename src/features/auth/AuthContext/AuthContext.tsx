import { createContext } from "react";

export interface AuthContextType {
  phoneNumber: any | null;
  requestOtp: (phone: any) => Promise<void>;
  verifyOtp: (otp: string,fullhash:string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
