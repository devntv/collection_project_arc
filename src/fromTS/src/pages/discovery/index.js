import Skeleton from '@material-ui/lab/Skeleton';
import { getData, isValid, ProductClientV2 } from 'clients';
import Template from 'components/layout/Template';
import ImageSlide from 'components/organisms/ImageSlide';
import InfoProductDiscovery from 'components/organisms/InfoProductDiscovery';
import VideoDiscovery from 'components/organisms/VideoDiscovery';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VisibilitySensor from 'react-visibility-sensor';
import { doWithServerSide } from 'services/SsrService';
import { getProxyImageList } from 'utils/ImageUtils';
import { getTitle } from 'utils/SEOUtils';

import styles from './styles.module.css';

const title = getTitle('Khám phá');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const Loader = () => (
  <>
    <div>
      <Skeleton variant="rect" width="100%" height={380} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Skeleton style={{ marginTop: '10px' }} variant="rect" width="100%" height={25} />
        <Skeleton style={{ marginTop: '10px', alignSelf: 'flex-end', borderRadius: '30px' }} variant="rect" width={170} height={38} />
      </div>
    </div>
    <div>
      <Skeleton variant="rect" width="100%" height={380} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Skeleton style={{ marginTop: '10px' }} variant="rect" width="100%" height={25} />
        <Skeleton style={{ marginTop: '10px', alignSelf: 'flex-end', borderRadius: '30px' }} variant="rect" width={170} height={38} />
      </div>
    </div>
    <div>
      <Skeleton variant="rect" width="100%" height={380} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Skeleton style={{ marginTop: '10px' }} variant="rect" width="100%" height={25} />
        <Skeleton style={{ marginTop: '10px', alignSelf: 'flex-end', borderRadius: '30px' }} variant="rect" width={170} height={38} />
      </div>
    </div>
    <div>
      <Skeleton variant="rect" width="100%" height={380} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Skeleton style={{ marginTop: '10px' }} variant="rect" width="100%" height={25} />
        <Skeleton style={{ marginTop: '10px', alignSelf: 'flex-end', borderRadius: '30px' }} variant="rect" width={170} height={38} />
      </div>
    </div>
  </>
);

const Discovery = ({ isMobile, ids = [] }) => {
  const pageTitle = 'Khám phá';
  const name = 'discovery';

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [listId, setListId] = useState(ids);

  const handleLoadMore = async () => {
    const result = await ProductClientV2.loadDiscovery({ lastID: listId[listId.length - 1] });

    if (!isValid(result)) setLoading(false);
    else {
      const newData = getData(result);
      const newPosts = newData.map(({ images, ...item }) => ({
        ...item,
        imagesProxy: images ? getProxyImageList(images) : null,
      }));

      setItems(items.concat(newPosts));
      const idsNew = newData.map(({ id }) => id) || [];
      setListId(listId.concat(idsNew));
    }
  };

  // load post
  useEffect(async () => {
    // products
    // const productResult = await ProductServiceV2.getProductInfoFromSkus({ skus, useCache: true });
    // const data = getData(productResult)?.map((item) => convertPost(item)) || [];
    // setItems(data);

    handleLoadMore();
  }, []);

  const Item = ({ item, isVisible }) => (
    <div className={styles.wrapper_item}>
      {item?.contentType === 'IMAGE' ? (
        <ImageSlide images={item?.imagesProxy} />
      ) : (
        <VideoDiscovery isVisible={isVisible} video={item?.video} ytbEmbeddedUrl={item?.ytbEmbeddedUrl} thumbnail={item?.thumbnail} />
      )}
      <InfoProductDiscovery sku={item?.products[0]?.sku || ''} postInfo={item} />
    </div>
  );

  return (
    <Template isMobile={isMobile} pageName={name} pageTitle={pageTitle}>
      {isMobile && (
        <div className={styles.wrapper}>
          <InfiniteScroll
            dataLength={items.length}
            next={handleLoadMore}
            hasMore={loading}
            scrollThreshold={0.5}
            loader={Loader()}
            initialScrollY={300}
          >
            {items?.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <VisibilitySensor key={index}>{({ isVisible }) => <Item item={item} isVisible={isVisible} />}</VisibilitySensor>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </Template>
  );
};
export default Discovery;
