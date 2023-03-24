/* eslint-disable no-nested-ternary */
import { Box, Button, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { getData, getFirst } from 'clients';
import clsx from 'clsx';
import PromotionDetailLoading from 'components-v2/organisms/PromotionLoading/detail';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import TitleComponent from 'components/mocules/TitleComponent';
import { GridSkeletonProductHorizontal } from 'components/organisms';
import NewPromotionProduct from 'components/organisms/NewPromotionProduct';
import { PAGE_SIZE_30 } from 'constants/data';
import { FLASH_SALE_ICON, MEGA_SALE_ICON } from 'constants/Images';
import { KHUYEN_MAI_LOADING } from 'constants/Paths';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { CampaignService, ProductServiceV2 } from 'services';
import { ImageFallbackBanner, ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const SlugPC = ({ isMobile, slug, page, code }) => {
  const router = useRouter();
  const mainRef = useRef(null);
  const secRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [activeRef, setActiveRef] = useState(null);
  const [campaign, setCampaign] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  let icon = MEGA_SALE_ICON;
  const curTime = new Date();

  const pages = Math.ceil(total / PAGE_SIZE_30);
  let dealEndDay;
  let megaDays = false;
  let fromMegaDay = '';
  let toMegaDay = '';
  let dealTimes = [];
  const pathName = `/khuyenmai/${campaign?.slug || ''}`;
  let nameComponent = campaign?.campaignName || 'Mega Days';
  const defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Khuyến mãi', url: KHUYEN_MAI_LOADING },
    { name: nameComponent, url: pathName },
  ];

  if (campaign?.campaignType === 'FLASH_SALE') {
    icon = FLASH_SALE_ICON;
    nameComponent = 'Flash Sale';
    const flashSaleTime =
      campaign?.flashSaleTimesView
        ?.filter((item) => {
          const startTimeDate = new Date(item?.startTime);
          return `${curTime.getMonth()}${curTime.getDate()}` === `${startTimeDate.getMonth()}${startTimeDate.getDate()}`;
        })
        .splice(0, 3)
        ?.map((item) => {
          const endTimeDate = new Date(item?.endTime);
          const startTimeDate = new Date(item?.startTime);
          const nameFlashSale = `${startTimeDate.getHours()}H`;
          let buttonContent = '';
          let status = 'ACTIVE';
          const isInDay = curTime.getDate() === startTimeDate.getDate();
          if (endTimeDate < curTime) {
            status = 'DISABLED';
            buttonContent += ' Đã diễn ra';
          } else if (curTime < startTimeDate) {
            status = 'NEXT';
            buttonContent += ' Sắp diễn ra';
          } else {
            buttonContent += ' Đang diễn ra';
          }
          return {
            ...item,
            nameFlashSale,
            buttonContent,
            status,
            isInDay,
          };
        }) || [];

    const firstFlashSale = flashSaleTime.find((item) => item.ref === activeRef && item.status === 'ACTIVE') || null;
    if (firstFlashSale) dealEndDay = firstFlashSale?.endTime || null;
    dealTimes = flashSaleTime;
  } else {
    dealEndDay = campaign?.endTime;
    const startCampaign = new Date(campaign?.startTime);
    const endCampaign = new Date(campaign?.endTime);
    megaDays = true;
    fromMegaDay = `${startCampaign.getDate()}-${startCampaign.getMonth() + 1}`;
    toMegaDay = `${endCampaign.getDate()}-${endCampaign.getMonth() + 1}`;
  }

  // fetch data
  useEffect(async () => {
    setIsLoading(true);
    const campaignRes = await CampaignService.getCampaignDetailBySlugClient(slug);
    const campaignDetail = getFirst(campaignRes);

    let activeRefTmp = null;

    if (campaignDetail?.campaignType === 'NORMAL') {
      activeRefTmp = campaignDetail?.campaignCode || null;
      setActiveRef(activeRefTmp);
    } else {
      const campaignData = campaignDetail?.flashSaleTimesView?.find((item) => {
        const { startTime, endTime } = item || {};
        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(endTime);
        if (startTimeDate <= curTime && curTime <= endTimeDate) {
          return item?.ref;
        }
        return null;
      });
      setCampaign(campaignData);
      activeRefTmp = campaignData?.ref || null;
      setActiveRef(activeRefTmp);
    }
    if (!(code || activeRefTmp)) {
      setProducts([]);
      setTotal(0);
    } else {
      const productsCampaignRes = await ProductServiceV2.getProductByCampaign({
        campaignCode: code || activeRefTmp,
        limit: PAGE_SIZE_30,
        offset: (page - 1) * PAGE_SIZE_30,
      });
      let productList = getData(productsCampaignRes);
      if (productList === null) productList = [];
      setTotal(productsCampaignRes?.total || 0);
      setProducts(productList);
      setCampaign(campaignDetail);
    }

    setIsLoading(false);
    secRef.current = true;
    return () => {
      secRef.current = false;
    };
  }, [slug, code]);

  // paging
  useEffect(async () => {
    if (page && secRef.current) {
      setIsLoadingProduct(true);
      const productsCampaignRes = await ProductServiceV2.getProductByCampaign({
        campaignCode: code || activeRef,
        limit: PAGE_SIZE_30,
        offset: (page - 1) * PAGE_SIZE_30,
      });
      const productList = getData(productsCampaignRes);
      setTotal(productsCampaignRes?.total || 0);
      setProducts(productList || []);
      setIsLoadingProduct(false);
    }
  }, [page]);

  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;

    window.scrollTo({
      top: mainRef?.current?.offsetTop - 100,
      behavior: 'smooth',
    });

    const queryObj = { code: code || activeRef };
    queryObj.page = value;
    router.push({
      pathname: pathName,
      query: queryObj,
    });
  };

  return (
    <>
      {isLoading ? (
        <PromotionDetailLoading isMobile={isMobile} />
      ) : (
        <Box className={styles.container}>
          <div className={styles.wrapper_breadcrums}>
            <Breadcrumbs breadcrumbs={defaultBreadscrumbs} />
          </div>
          {/* Banner */}
          <Grid container direction="row" justifyContent="space-between" alignItems="center" className={isMobile ? styles.title_wrapper : ''}>
            <Grid item>
              <TitleComponent
                isSlug
                title={nameComponent}
                dealEndDay={new Date(dealEndDay)}
                icon={<ImageFallbackStatic src={icon || MEGA_SALE_ICON} alt="icon" height="40" width="40" className={styles.icon_img} />}
              />
            </Grid>
            {isMobile ? (
              <Grid item className={styles.grid}>
                <Box className={megaDays ? styles.wrapper_mega_button : styles.wrapper_buttons}>
                  {megaDays && (
                    <span className={styles.active_fromDate_btn}>
                      Từ <span> {fromMegaDay}</span>&nbsp;Đến&nbsp;<span>{toMegaDay}</span>
                    </span>
                  )}
                  {dealTimes?.length > 0 && (
                    <>
                      {dealTimes
                        ?.filter((item) => item?.status !== 'DISABLED')
                        ?.map((item) => (
                          <Button
                            key={`block-${item.ref}`}
                            className={clsx(
                              styles.btn_campaign,
                              item?.status === 'ACTIVE'
                                ? styles.active_btn
                                : item?.status === 'DISABLED'
                                ? styles.deactive_btn
                                : item.ref === activeRef
                                ? styles.selected_btn
                                : styles.will_active_btn,
                            )}
                            disabled={item.status === 'DISABLED'}
                            onClick={() => {
                              router.push(`${pathName}?code=${item.ref}`);
                            }}
                          >
                            <span>{item.nameFlashSale}&#160;</span> <span>{item.buttonContent}</span>
                          </Button>
                        ))}
                    </>
                  )}
                </Box>
              </Grid>
            ) : (
              <Grid item className={styles.grid}>
                <Box className={styles.wrapper_buttons}>
                  {megaDays && (
                    <Button className={clsx(styles.btn_campaign, styles.active_fromDate_btn)}>
                      Từ &nbsp;<span> {fromMegaDay}</span>&nbsp; Đến &nbsp;<span>{toMegaDay}</span>
                    </Button>
                  )}
                  {dealTimes?.length > 0 && (
                    <>
                      {dealTimes
                        ?.filter((item) => item?.status !== 'DISABLED')
                        ?.map((item) => (
                          <Button
                            key={`block-${item.ref}`}
                            className={clsx(
                              styles.btn_campaign,
                              // eslint-disable-next-line no-nested-ternary
                              item?.status === 'ACTIVE'
                                ? styles.active_btn
                                : item.ref === (code || activeRef)
                                ? styles.selected_btn
                                : styles.will_active_btn,
                            )}
                            disabled={item.status === 'DISABLED'}
                            onClick={() => {
                              router.push(`${pathName}?code=${item.ref}`);
                            }}
                          >
                            <span>{item.nameFlashSale}&#160;</span> {item.buttonContent}
                          </Button>
                        ))}
                    </>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
          {products?.length > 0 && (
            <div className={styles.wrapper_slider}>
              <ImageFallbackBanner
                src={campaign?.banner}
                layout="responsive"
                width={1200}
                height={400}
                fallbackSrc={campaign?.banner}
                isUseLoaderCache
              />
            </div>
          )}
          {/* Products Sales */}
          {isLoadingProduct ? (
            <div className={styles.skeContainer}>
              <GridSkeletonProductHorizontal pages={isMobile ? 4 : pages} counts={PAGE_SIZE_30} hasPagingBottom />
            </div>
          ) : (
            <Box>
              <NewPromotionProduct total={total} products={products} isCampaignPage />
              {pages > 1 && (
                <div className={styles.pagging}>
                  <Pagination
                    count={Number(pages)}
                    page={Number(page)}
                    boundaryCount={isMobile ? 1 : 2}
                    siblingCount={isMobile ? 0 : 2}
                    onChange={handleChangePage}
                  />
                </div>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default SlugPC;
