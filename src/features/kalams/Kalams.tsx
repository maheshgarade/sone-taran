import { useEffect } from 'react';
import styles from './Kalams.module.scss';
import KalamCard from './kalam-card/KalamCard';
import KalamsTable from './kalam-table/KalamsTable';
import useKalamsData from '../../hooks/useKalamsData';

const Kalams = () => {
  const { data, loading, error, fetchIfNeeded } = useKalamsData();

  useEffect(() => {
    fetchIfNeeded();
  }, [fetchIfNeeded]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.mobileView}>
        <KalamCard data={data} />
      </div>
      <div className={styles.desktopView}>
        <KalamsTable data={data} />
      </div>
    </div>
  );
};

export default Kalams;
