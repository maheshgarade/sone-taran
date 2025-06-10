import { Customer } from './../models/Customer';
import axios from "axios";

// Create a reusable axios instance with a base URL
//import.meta.env.BASE_URL
const apiClient = axios.create({
  baseURL: "https://sone-taran-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// API methods
const fetchKalamsData = async () => {
  try {
    const response = await apiClient.get("/loan/getLoans");
    return response.data;
  } catch (error) {
    console.error("Error fetching Kalams data:", error);
    throw error;
  }
};

const AddKalamsData = async (
  customerId: string,
  loanId: string,
  number: number,
  name: string,
  materialType: string,
  netWeight: number,
  grossWeight: number,
  purity: number,
  goldRateAtLoan: number,
  totalAmt: number,
  customerAmt: number,
  dukandarAmt: number,
  customerROI: number,
  merchantROI: number,
  loanStartDate: string,
  validity: string,
  merchantId: string,
) => {

  try {
    const response = await apiClient.post("/loan/addLoan",{
      
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Kalams data:", error);
    throw error;
  }

};
// Export the API methods
export default {
  fetchKalamsData,
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);
