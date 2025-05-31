import axios from "axios";

interface RequestOtpResponse {
  fullhash: string;
}


export const requestOtpApi = async (phone: string | { phoneNo: number }): Promise<RequestOtpResponse> => {
  const phoneNumber = typeof phone === "object" ? phone.phoneNo : phone;

  const response = await axios.post("https://sone-taran-backend.onrender.com/api/user/sendOtp", { phone: phoneNumber })
  console.log(`OTP requested for ${phoneNumber}`);

  return response.data as RequestOtpResponse;
};

export const verifyOtpApi = async (phone: string, otp: string, fullhash: string): Promise<boolean> => {
  const phoneNumber = typeof phone === "object" ? phone['phoneNo'] : phone;
  const response = await axios.post("https://sone-taran-backend.onrender.com/api/user/verifyOtp", {
    phone: phoneNumber,
    otp,
    fullhash
  })
  return response.data.msg === "user confirmed";

};
