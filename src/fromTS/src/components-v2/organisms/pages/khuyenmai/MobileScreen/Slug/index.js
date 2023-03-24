import { Box } from '@material-ui/core';
import { getData, getFirst } from 'clients';
import Container from 'components-v2/atoms/Mobile/Container';
import { PAGE_SIZE_30 } from 'constants/data';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { CampaignService, ProductServiceV2 } from 'services';
import ProductSection from '../ProductSection';
import HeaderCampaign from './HeaderCampaign';
import styles from './styles.module.css';

/**
 * Có 2 Type
 *  1. FLASH_SALES
 *  2. NORMAL
 * RULES:
 *  1. SLUG
 *  2. CODE TIMER
 *  3. PAGING
 *
 */

const Slug = (props) => {
  const { slug } = props;
  const {
    query: { code = null },
  } = useRouter();

  const [campaign, setCampaign] = useState({});
  const [products, setProducts] = useState([]);
  const [loadingCode, setLoadingCode] = useState(false); // check loading khi thay đổi code
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRef, setActiveRef] = useState(code);

  let endMessage = 'Bạn đã xem hết sản phẩm';
  if (products.length <= 0) {
    endMessage = 'Chưa có sản phẩm nào';
  }
  const handleSetActiveRef = useCallback((value) => {
    setActiveRef(value);
  }, []);

  useEffect(() => {
    (async () => {
      // start get info campaign
      setLoadingCode(true);
      setCurrentPage(1); // reset lại page
      const campaignRes = await CampaignService.getCampaignDetailBySlugClient(slug);
      const campaignDetail = getFirst(campaignRes);
      setCampaign(campaignDetail);
      let activeRefTmp = null;

      if (campaignDetail?.campaignType === 'NORMAL') {
        activeRefTmp = campaignDetail?.campaignCode || null;
        handleSetActiveRef(activeRefTmp);
      }
      // start get info products

      if (code || activeRefTmp) {
        const productsCampaignRes = await ProductServiceV2.getProductByCampaign({
          campaignCode: code || activeRefTmp,
          limit: PAGE_SIZE_30,
          offset: (currentPage - 1) * PAGE_SIZE_30,
        });
        const productList = getData(productsCampaignRes);
        setProducts(productList);
        setHasMore(productList.length >= PAGE_SIZE_30);
      }
      // end get info products
      setLoadingCode(false);
    })();
  }, [slug, code]);

  // using for scrolling down to load more products
  useDidUpdateEffect(() => {
    let isStale = false;
    (async () => {
      if (currentPage > 1) {
        const productsCampaignRes = await ProductServiceV2.getProductByCampaign({
          campaignCode: code || activeRef,
          limit: PAGE_SIZE_30,
          offset: (currentPage - 1) * PAGE_SIZE_30,
        });

        const productList = getData(productsCampaignRes);
        // hết data => tắt load thêm sản phẩm khi scroll xuống
        if (!isStale) {
          if (productList.length >= 0) {
            setProducts([...products, ...productList]);
          }
          setHasMore(productList.length >= PAGE_SIZE_30);
        }
      }
    })();
    return () => {
      isStale = true;
    };
  }, [currentPage]);

  const fetchMoreProducts = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  return (
    <Box className={styles.container}>
      <Container>
        <Box style={{ marginBottom: '15px' }}>
          <HeaderCampaign flashSale={campaign} timerCurrent={activeRef} setTimerCurrent={handleSetActiveRef} />
        </Box>
        <ProductSection products={products} hasMore={hasMore} fetchMoreProducts={fetchMoreProducts} loading={loadingCode} endMessage={endMessage} />
      </Container>
    </Box>
  );
};
export default Slug;
