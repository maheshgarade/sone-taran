import { createContext, useState, useCallback, ReactNode } from 'react';
import apiService from '../services/apiService';
import { Kalam } from '../kalams/models/Kalam';

interface KalamsDataContextProps {
  data: Kalam[];
  loading: boolean;
  error: Error | null;
  fetchData: () => void;
  invalidateCache: () => void;
}

const KalamsDataContext = createContext<KalamsDataContextProps | undefined>(undefined);

export const KalamsDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Kalam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.fetchKalamsData();
      setData(result);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setLoading(false);
    }
  }, []);

  const invalidateCache = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <KalamsDataContext.Provider value={{ data, loading, error, fetchData, invalidateCache }}>
      {children}
    </KalamsDataContext.Provider>
  );
};

export { KalamsDataContext };
