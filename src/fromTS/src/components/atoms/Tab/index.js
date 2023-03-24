import { Fab } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { gtag, ImageFallback } from 'utils';

const Tab = ({ item, pathName, currentTab, query, styles, config }) => {
  const tabConfig = config[item.value] || config.DEFAULT;
  return (
    <Link
      key={`tabs-${item.value}`}
      href={{
        pathname: pathName,
        query: { ...query, currentTab: item?.slug },
      }}
      scroll={false}
      prefetch={false}
    >
      <Fab
        variant="extended"
        aria-label="all"
        className={clsx(currentTab === (item?.slug || '') && styles.active, styles.filter_btn)}
        style={{ border: `1px solid ${tabConfig.borderColor}` }}
        onClick={() => {
          gtag.clickTabInProduct(item?.name);
        }}
      >
        {tabConfig.icon && (
          <div className={styles.externalIcon}>
            <ImageFallback src={tabConfig.icon} fallbackSrc={tabConfig.icon} width={20} height={20} alt={item.name} />
          </div>
        )}
        {item.leftIcon && <span className={styles.iconLeft}>{item.leftIcon}</span>}
        <span style={{ color: tabConfig.textColor }}>{item.name}</span>
        {item.rightIcon && <span className={styles.iconRight}>{item.rightIcon}</span>}
      </Fab>
    </Link>
  );
};

export default Tab;
