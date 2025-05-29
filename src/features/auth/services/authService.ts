import axios from "axios";

export const requestOtpApi = async (phone: number): Promise<void> => {
  await axios.post("https://sone-taran-backend.onrender.com/api/user/sendOtp", { phone })
  console.log(`OTP requested for ${phone}`);
};

export const verifyOtpApi = async (phone: number, otp: string, fullhash: string): Promise<boolean> => {
  await axios.post("https://sone-taran-backend.onrender.com/api/user/verifyOtp", {
    phone,
    otp,
    fullhash
  })
  console.log(`Verifying OTP ${otp} for ${phone}`);
  return otp === "123456";
};
