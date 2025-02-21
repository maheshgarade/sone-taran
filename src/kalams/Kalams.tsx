import KalamCard from './kalam-card/KalamCard';
import KalamsTable from './kalam-table/KalamsTable';
import styles from './Kalams.module.scss'; // Import the SCSS module

const Kalams = () => {
  return (
    <div>
      <div className={styles.mobileView}>
        <KalamCard />
      </div>
      <div className={styles.desktopView}>
        <KalamsTable />
      </div>
    </div>
  );
};

export default Kalams;