import Tab from 'components/atoms/Tab';
import { TAB_CONFIG } from 'constants/data';
import styles from './styles.module.css';

const TabComponents = ({ tabs, pathName, currentTab, query }) => (
  <div>
    <div className={styles.filters}>
      {tabs?.map((item) => (
        <Tab item={item} pathName={pathName} currentTab={currentTab} query={query} styles={styles} config={TAB_CONFIG} />
      ))}
    </div>
  </div>
);

export default TabComponents;
