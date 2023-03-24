import { Grid } from '@material-ui/core';
import MostSearch from 'components-v2/atoms/MostSearch';
import { gtag } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

/**
 *
 * @param {isNewMobile} boolean
 * @param {showTopSearchMV2} boolean
 * @returns JSX
 */

//  in use
function TopSearchMobile({ isNewMobile = false, showTopSearchMV2 }) {
  const hashtagTopSearch = useStore((state) => state.hashtagTopSearch);

  if (!hashtagTopSearch || hashtagTopSearch?.length === 0) return <></>;
  if (isNewMobile && !showTopSearchMV2) return <></>; // check conditions render TopSearch depends on showTopSearchMV2 (MV2 check)

  return (
    <>
      <div className={isNewMobile ? styles.wrapMobileMostSearch : styles.wrapMostSearch}>
        <div className={styles.title}>
          <p>Tìm kiếm nhiều nhất</p>
        </div>
      </div>
      <Grid className={isNewMobile ? styles.mobileList : styles.list} container alignItems="center">
        {hashtagTopSearch?.map((tag) => (
          <MostSearch
            className={isNewMobile ? styles.mobileMostSearchItem : ''}
            onClick={() => gtag.clickTopSearch(tag)}
            key={tag?.code}
            link={tag.url}
          >
            {tag.hashtag}
          </MostSearch>
        ))}
      </Grid>
    </>
  );
}

export default TopSearchMobile;
