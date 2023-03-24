import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TabInfo from '../TabInfo';
import styles from './styles.module.css';

export default function AccountInfoTabs({ tabList, isMobile }) {
  const { customerInfo, reloadDataCustomer } = useAuth();

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  }, []);

  const router = useRouter();
  const [tabValue, setTabValue] = useState(router?.query?.tab || '1');
  const tabData = tabList?.filter((item) => item.value === tabValue)[0] || {};

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    // router.push({ pathname: router.pathname, query: { tab: newValue } }, undefined, { scroll: false });
    // change query url but dont reload page
    const url = new URL(window.location);
    if (url) {
      url.searchParams.set('tab', newValue);
      window.history.replaceState(null, '', url.toString());
    }
    if (newValue === 3) reloadDataCustomer();
  };

  return (
    <div className={styles.root}>
      <TabContext value={tabValue}>
        <div>
          <TabList
            TabIndicatorProps={{ className: styles.indicator }}
            onChange={handleChangeTab}
            aria-label="product details tabs"
            variant="scrollable"
            className={styles.tabs}
          >
            {tabList.map((item) => (
              <Tab disableRipple key={item.value} classes={{ root: styles.tab }} label={item.label} value={item.value} />
            ))}
          </TabList>
        </div>

        <TabPanel className={styles.tab_panel} value={tabData?.value}>
          <TabInfo user={customerInfo} tab={tabValue} isMobile={isMobile} />
        </TabPanel>
      </TabContext>
    </div>
  );
}
