/* eslint-disable react/no-danger */
import React from 'react';
import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

export default function ProductDetailTabs({ data, product, handleChange, value, isMobileV2 = false }) {
  const { description = {} } = product || {};
  const tabData = data?.filter((item) => item.value === value)[0] || {};
  const des = description && description[tabData.code] !== '' ? description[tabData.code] : 'Đang cập nhật ...';
  return (
    <div className={styles.root}>
      <TabContext value={value}>
        <div>
          <TabList
            TabIndicatorProps={{ className: isMobileV2 ? styles.mobileIndicator : styles.indicator }}
            onChange={handleChange}
            aria-label="product details tabs"
            variant="scrollable"
            className={styles.tabs}
          >
            {data.map((item) => (
              <Tab key={uuidv4()} classes={{ root: styles.tab }} label={item.label} value={item.value} />
            ))}
          </TabList>
        </div>

        <TabPanel className={styles.tab_panel} value={tabData?.value} key={uuidv4()}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: des,
            }}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}
