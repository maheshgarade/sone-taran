import { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.fetchKalamsData();
      setData(result);
      setHasFetched(true);
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

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
    }
  }, [fetchData, hasFetched]);

  const invalidateCache = useCallback(() => {
    setHasFetched(false);
    fetchData();
  }, [fetchData]);

  return (
    <KalamsDataContext.Provider value={{ data, loading, error, fetchData, invalidateCache }}>
      {children}
    </KalamsDataContext.Provider>
  );
};

export { KalamsDataContext };
