import useCustomersDataContext from "./useCustomerDataContext";

const useCustomerData = () => {
  const { data, loading, error, fetchData, invalidateCache, addData } =
    useCustomersDataContext();

  const fetchIfNeeded = () => {
    if (data.length === 0 && !loading) {
      fetchData();
    }
  };

  return { data, loading, error, fetchIfNeeded, invalidateCache, addData };
};

export default useCustomerData;
