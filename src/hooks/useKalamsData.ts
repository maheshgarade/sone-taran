import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { Kalam } from "../kalams/models/Kalam";

const useKalamsData = () => {
  const [data, setData] = useState<Kalam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.fetchKalamsData();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useKalamsData;
