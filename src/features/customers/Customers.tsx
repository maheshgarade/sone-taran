import { useEffect } from 'react';
import styles from './Customer.module.scss';
import CustomerCard from './customer-card/CustomerCard';
import CustomerTable from './customer-table/CustomerTable';
import useCustomersData from '../../hooks/useCustomersData';

const Customers = () => {
  const { data, loading, error, fetchIfNeeded } = useCustomersData();

  useEffect(() => {
    fetchIfNeeded();
  }, [fetchIfNeeded]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.mobileView}>
        <CustomerCard data={data} />
      </div>
      <div className={styles.desktopView}>
        <CustomerTable data={data} />
      </div>
    </div>
  );
};

export default Customers;
