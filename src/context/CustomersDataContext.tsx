import { createContext, useState, useCallback, ReactNode } from 'react';
import apiService from '../services/apiService';
import { customer } from '../features/customers/models/Customers';

interface CustomerDataContextProps {
  data: customer[];
  loading: boolean;
  error: Error | null;
  fetchData: () => void;
  invalidateCache: () => void;
}

const CustomerDataContext = createContext<CustomerDataContextProps | undefined>(
  undefined
);

export const CustomerDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.fetchCustomerData();
      setData(result);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      setLoading(false);
    }
  }, []);

  const invalidateCache = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CustomerDataContext.Provider
      value={{ data, loading, error, fetchData, invalidateCache }}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};

export { CustomerDataContext };
