import { LinkComp } from 'components/atoms';
import { ENUM_COUNTDOWN_BAR_IMAGE_TYPE } from 'constants/Enums';
import { memo, useEffect } from 'react';
import { gtag } from 'utils';
import { ImageFallbackBanner } from 'utils/ImageFallback';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

const CountDownBar = () => {
  const countdownBarList = useStore((state) => state.countdownBars);

  const countdownBarHalf = countdownBarList.filter((cd) => cd?.imageType === ENUM_COUNTDOWN_BAR_IMAGE_TYPE.HALF);
  const countdownBarFull = countdownBarList.filter((cd) => cd?.imageType === ENUM_COUNTDOWN_BAR_IMAGE_TYPE.FULL);

  // tracking impresssion
  useEffect(() => {
    if (countdownBarHalf?.length >= 2 || countdownBarFull?.length > 0) {
      gtag.displayCountDownBar();
    }
  }, []);

  if (countdownBarHalf?.length >= 2) {
    return (
      <div className={styles.countdownBarHalfWrapper}>
        <div className={styles.countdownBarHalf}>
          {countdownBarHalf
            .slice(0, 2)
            .reverse()
            .map((cd) => (
              <div key={cd.code} className={styles.countdownBarHalfLimit}>
                <LinkComp href={cd.url} style={{ padding: 0 }} onClick={() => gtag.clickCountdownbar(cd)}>
                  <ImageFallbackBanner src={cd.imageUrl} fallbackSrc={cd.imageUrl} objectFit="contain" quality={100} layout="fill" width={2100} />
                </LinkComp>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (countdownBarFull?.length > 0) {
    const cd = countdownBarFull[0];
    return (
      <LinkComp href={cd?.url} style={{ padding: 0 }} onClick={() => gtag.clickCountdownbar(cd)}>
        <div className={styles.countdownBarFullWrapper} style={{ backgroundColor: cd?.backgroundColor || '#fff' }}>
          <ImageFallbackBanner src={cd.imageUrl} fallbackSrc={cd.imageUrl} layout="fill" width={2100} />
        </div>
      </LinkComp>
    );
  }

  return <></>;
};

export default memo(CountDownBar);
