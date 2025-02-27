import useKalamsDataContext from "./useKalamsDataContext";

const useKalamsData = () => {
  const { data, loading, error, fetchData, invalidateCache } =
    useKalamsDataContext();

  const fetchIfNeeded = () => {
    if (data.length === 0 && !loading) {
      fetchData();
    }
  };

  return { data, loading, error, fetchIfNeeded, invalidateCache };
};

export default useKalamsData;
