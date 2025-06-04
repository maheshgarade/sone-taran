import axios from "axios";

interface RequestOtpResponse {
  fullhash: string;
  otpToken: string;
}

interface RequestEmailOtpResponse {
  token: string;
}

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const requestPhoneOtpApi = async (phone: string | { phoneNo: string }): Promise<RequestOtpResponse> => {

  const phoneNumber = typeof phone === "object" ? phone.phoneNo : phone;

  const response = await apiClient.post("/user/sendPhoneOtp", { phone: phoneNumber });
  console.log(`OTP requested for phone: ${phoneNumber}`);

  return response.data as RequestOtpResponse;

};

export const verifyPhoneOtpApi = async (phone: string | { phoneNo: string }, otp: string, fullhash: string, otpToken: string): Promise<boolean> => {

  const phoneNumber = typeof phone === "object" ? phone.phoneNo : phone;

  const response = await apiClient.post(

    "/user/verifyPhoneOtp",
    { phone: phoneNumber, otp, fullhash, otpToken },
    getAuthHeaders(otpToken)

  );

  console.log(response.data)
  return response.data;

};


// For Email

export const requestEmailOtpApi = async (email: string | { email: string }): Promise<RequestEmailOtpResponse> => {

  const enteredEmail = typeof email === "object" ? email.email : email;
  const response = await apiClient.post("/user/sendEmailOtp", { email: enteredEmail });

  console.log(`OTP requested for email: ${enteredEmail}`);

  return response.data as RequestEmailOtpResponse;

};

export const verifyEmailOtpApi = async (otp: string, token: string): Promise<boolean> => {

  const response = await apiClient.post(
    "/user/verifyEmailOtp",
    { otp },
    getAuthHeaders(token)
  );
  return response.data.msg === "OTP verified successfully!";

};
