import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { MANUFACTURERS } from 'constants/Paths';
import { memo, useEffect, useState } from 'react';
import useMobileV2 from 'zustand-lib/storeMobile';
import useManufacturers from 'zustand-lib/useManufacturers';
import styles from './styles.module.css';

const ManufacturerInfo = ({ code }) => {
  const getManufacturerInfo = useManufacturers((state) => state.getByCode);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [manufacturerInfo, setmanufacturerInfo] = useState(null);

  useEffect(async () => {
    const manufacturerData = await getManufacturerInfo({ code });
    if (manufacturerData) {
      setmanufacturerInfo(manufacturerData);
    }
  });

  return (
    manufacturerInfo && (
      <div className={styles.warpper}>
        <Typography
          className={clsx(styles.manufactureInfo, {
            [styles.manufactureInfo_mv2]: isMobileV2,
          })}
        >
          Nhà sản xuất
        </Typography>

        <div>
          <a className={styles.manufactureInfoLink} href={`${MANUFACTURERS}/${manufacturerInfo.slug}`}>
            {manufacturerInfo.shortName || manufacturerInfo.name}
          </a>
        </div>
      </div>
    )
  );
};

export default memo(ManufacturerInfo);
