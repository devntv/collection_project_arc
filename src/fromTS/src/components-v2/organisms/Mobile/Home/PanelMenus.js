import { HOME_MENUS } from 'constants/data/mobile';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { gtag, ImageFallback } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

const Item = ({ name, url, icon }) => {
  const router = useRouter();
  const navigate = (toUrl) => {
    router.push(toUrl);
  };
  return (
    <div className={styles.itemContainer}>
      <div
        className={styles.wrapperIcon}
        onKeyDown={() => navigate(url)}
        onClick={() => {
          gtag.clickMenubar({ name, url });
          navigate(url);
        }}
        role="button"
        tabIndex={0}
      >
        <ImageFallback src={icon} width={50} height={50} />
      </div>
      <div className={styles.label}>{name}</div>
    </div>
  );
};

const PanelMenus = () => {
  const menuBar = useStore((state) => state.menuBar);
  const lastMenu = [...menuBar].pop();
  const menuV2 = [...HOME_MENUS];

  if (menuBar?.length > 0 && menuBar.length - 1 === 6) {
    const { iconUrl, label, url } = lastMenu;
    menuV2.push({
      id: menuV2.length + 1,
      name: label,
      icon: iconUrl,
      url,
      isNew: true,
      prefetch: false,
      width: '20px',
      height: '20px',
      eventPage: true,
      tracking: {
        action: 'CLICK_GO_TO_EVENTS_PAGE',
        trackingPath: '/events',
      },
    });
  }
  return (
    <div className={styles.root}>
      {menuV2.map((menu) => (
        <Item key={menu.id} {...menu} />
      ))}
    </div>
  );
};

export default memo(PanelMenus);
