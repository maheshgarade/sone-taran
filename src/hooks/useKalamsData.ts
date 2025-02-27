import useKalamsDataContext from "./useKalamsDataContext";

const useKalamsData = () => {
  const { data, loading, error, invalidateCache } = useKalamsDataContext();

  return { data, loading, error, invalidateCache };
};

export default useKalamsData;
