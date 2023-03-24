import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './styles.module.css';

interface ChatItem {
  param: string;
  name: string;
}

interface Tabs {
  [x: string]: ChatItem;
}

interface Props {
  tab: ChatItem;
  setTab: (tab: ChatItem) => void;
  TABS: Tabs;
  isWebView: boolean;
  isGuest: boolean;
}

const TabUtils = ({ tab, setTab, TABS, isWebView, isGuest }: Props) => (
  <div id="idTabUtils" className={clsx(styles.rootTabUtils, isWebView && styles.top0)}>
    {Object.keys(TABS).map((keyTab: string) => {
      const skip = isGuest && TABS[keyTab].param === TABS.links.param; // k hiện tab links khi là guest chát
      if (skip) return <></>;
      return (
        <Grid
          key={TABS[keyTab].param}
          onClick={() => {
            setTab(TABS[keyTab]);
          }}
          className={clsx(styles.tabItems, TABS[keyTab].param === tab.param && styles.tabItemsActive)}
        >
          {TABS[keyTab].name}
        </Grid>
      );
    })}
  </div>
);
export default memo(TabUtils);
