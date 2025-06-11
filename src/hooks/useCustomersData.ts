import useCustomersDataContext from "./useCustomerDataContext";

const useCustomerData = () => {
  const { data, loading, error, fetchData, invalidateCache } =
    useCustomersDataContext();

  const fetchIfNeeded = () => {
    if (data.length === 0 && !loading) {
      fetchData();
    }
  };

  return { data, loading, error, fetchIfNeeded, invalidateCache };
};

export default useCustomerData;
