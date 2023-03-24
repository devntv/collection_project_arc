import { Box, Button, Grid, Typography } from '@material-ui/core';
import { getData } from 'clients';
import clsx from 'clsx';
import NewCountdownTimer from 'components/mocules/StyledCountdownTimer';
import TitleComponent from 'components/mocules/TitleComponent';
import ProductSliderBlock from 'components/organisms/ProductSliderBlock';
import { FLASH_SALE_ICON, MEGA_SALE_ICON } from 'constants/Images';
import { KHUYEN_MAI } from 'constants/Paths';
import { useProduct } from 'context/Product/context';
import { memo, useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const Carousel = styled.div`
  background: #ffffff;
  ${(props) =>
    !props.isMobileV2 &&
    `
    .slick-arrow {
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.15);
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: #fff;
    }
  }
  .slick-prev {
    left: -20px;
  }
  .slick-next {
    right: -20px;
  }
  .slick-next::before,
  .slick-prev::before {
    content: '';
  }
  .slick-list {
    margin: 30px 30px 10px 30px;
  }
  .slick-track {
    display: flex;
    gap: 10px;
  }
  .slick-slide {
    flex: 1;
    height: auto;
  }

  .slick-slide > div:first-child {
    height: 100%;
  }

  @media screen and (max-width: 767px) {
    .slick-track {
      min-width: 250px !important;
    }
    .slick-slide {
      width: 250px !important;
    }
    .slick-list {
      margin: 25px 25px 10px 25px;
      padding: 0;
    }
  }`}
`;

let title = '';
let icon = null;
const CAMPAIGN_STATUS = {
  active: 'ACTIVE',
  disabled: 'DISABLED',
  next: 'NEXT',
};
const CAMPAIGN_TYPE = {
  normal: 'NORMAL',
  flashsales: 'FLASH_SALE',
};

const CampaignBlock = ({ isMobile, campaign, isCampaignPage, isHalfProgress }) => {
  const { getProductByCampaign } = useProduct();
  const { campaignType, slug, startTime, endTime, flashSaleTimesView = [] } = campaign;

  const [buttonID, setButtonID] = useState(0);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  // lấy thời gian hiện tại
  const curTime = new Date();

  // thời gian bắt đầu campaign
  const startCampaign = new Date(startTime);
  const endCampaign = new Date(endTime);

  const fromMegaDay = `${startCampaign.getDate()}-${startCampaign.getMonth() + 1}`;
  const toMegaDay = `${endCampaign.getDate()}-${endCampaign.getMonth() + 1}`;
  let megaDays = false;

  switch (campaignType) {
    case CAMPAIGN_TYPE.flashsales:
      title = 'Flash sale';
      icon = <ImageFallbackStatic src={FLASH_SALE_ICON} alt="icon flash sale" height="40" width="40" className={styles.icon_img} />;
      break;

    case CAMPAIGN_TYPE.normal:
      title = campaign?.campaignName || 'Mega Day';
      icon = <ImageFallbackStatic src={MEGA_SALE_ICON} alt="icon mega sale" height="40" width="40" className={styles.icon_img} />;
      megaDays = true;
      break;

    default:
      title = 'Khuyến mãi hằng ngày';
      icon = <ImageFallbackStatic src={MEGA_SALE_ICON} alt="icon mega sale" height="40" width="40" className={styles.icon_img} />;
  }

  const [productsFlashSale, setProductsFlashSale] = useState(null);
  // const [isAbleToSeeAll, setIsAbleToSeeAll] = useState(true);
  const [endTimeFlashSale, setEndTimeFlashSale] = useState(null);

  // sort để lấy thứ tự sale time
  const sortFlashSaleTimesView = flashSaleTimesView.slice(0);
  sortFlashSaleTimesView.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  // tìm flash sale đang chạy trong thời gian hiện tại
  const flashSaleItems =
    sortFlashSaleTimesView

      // filter lấy flashsale theo đúng ngày hiênj tại
      // ?.filter(({ startTime, endTime: endTimeFlashSale }) => new Date(startTime) < curTime && new Date(endTimeFlashSale) > curTime)
      // nếu có tồn tại thì mình sẽ map lại lần nữa để cho chính xác item là bao foom : code / detail
      ?.map((item) => {
        const startTimeDate = new Date(item?.startTime);
        const endTimeDate = new Date(item?.endTime);
        const nameFlashSale = `${startTimeDate.getHours()}H`;
        let buttonContent = '';
        let status = CAMPAIGN_STATUS.active;
        if (endTimeDate < curTime) {
          status = CAMPAIGN_STATUS.disabled;
          buttonContent += ' Đã diễn ra';
        } else if (curTime < startTimeDate && curTime.toISOString().slice(0, 10) === startTimeDate.toISOString().slice(0, 10)) {
          status = CAMPAIGN_STATUS.next;
          buttonContent += ' Sắp diễn ra';
        } else {
          buttonContent += ' Đang diễn ra';
        }
        const isInDay = curTime.getDate() === startTimeDate.getDate();
        return {
          ...item,
          nameFlashSale,
          buttonContent,
          status,
          isInDay,
        };
      }) || [];

  const curFlashSale = flashSaleItems?.find((item) => item.status === CAMPAIGN_STATUS.active);
  const [codeFlashsale, setCodeFlashsale] = useState(curFlashSale?.code || '');
  const [dealTimes] = useState(flashSaleItems);
  const [link, setLink] = useState(slug || '');

  useEffect(() => {
    const loadData = async () => {
      let dataProductsCamapign = null;
      let endTimeSale = null;
      let flashSalesCode = '';

      switch (campaignType) {
        case CAMPAIGN_TYPE.flashsales:
          if (codeFlashsale === '') {
            flashSalesCode = flashSaleItems[0]?.ref || '';
            dataProductsCamapign = getData(await getProductByCampaign({ campaignCode: flashSalesCode }));
          } else {
            flashSalesCode = flashSaleItems?.find((item) => item.code === codeFlashsale)?.ref || '';
            dataProductsCamapign = getData(await getProductByCampaign({ campaignCode: flashSalesCode }));
            if (curFlashSale?.code === codeFlashsale) endTimeSale = flashSaleItems?.find((item) => item.code === codeFlashsale)?.endTime;
          }
          break;
        case CAMPAIGN_TYPE.normal:
          flashSalesCode = campaign?.campaignCode || '';
          dataProductsCamapign = getData(await getProductByCampaign({ campaignCode: campaign.campaignCode }));
          endTimeSale = campaign.endTime;
          break;
        default:
      }
      // set url detail for sales
      if (campaignType !== 'DAILY_DEAL') {
        setLink(`${KHUYEN_MAI}/${slug}?code=${flashSalesCode}`);
      }

      setProductsFlashSale(dataProductsCamapign);
      setEndTimeFlashSale(endTimeSale);
    };

    loadData();
  }, [codeFlashsale]);

  const loadDataByCodeFlashSale = (index, { codeFlashSale }) => {
    if (index !== buttonID) setButtonID(index);
    setCodeFlashsale(codeFlashSale);
  };

  // using for mobile v2
  const HeaderMageDay = () => (
    <div className={styles.wrapper_header_megaday_mv2}>
      <div style={{ height: '25px', width: '24px' }}>{icon}</div>
      <div className={styles.content_header_megaday_mv2}>
        <Typography className={styles.title_header_megaday_mv2}>{title}</Typography>
        <span className={styles.date_header_megaday_mv2}>
          Từ&nbsp;<span> {fromMegaDay}</span>&nbsp;Đến&nbsp;<span>{toMegaDay}</span>
        </span>
      </div>
      {endTimeFlashSale && <NewCountdownTimer dealEndDay={endTimeFlashSale} />}
    </div>
  );

  return (
    <>
      {((dealTimes?.every((deal) => deal.isInDay === true) && campaignType === CAMPAIGN_TYPE.flashsales) ||
        (startCampaign < curTime && endCampaign > curTime && campaignType === CAMPAIGN_TYPE.normal)) && (
        <div
          style={{
            backgroundColor: '#fff',
            marginTop: '15px',
            paddingTop: '10px',
            borderRadius: isMobileV2 ? '0px' : '20px',
          }}
        >
          <Carousel
            isMobileV2={isMobileV2}
            id={`campaign-${campaign?.campaignCode}`}
            className={clsx(styles.carousel_container, {
              [styles.carousel_container_mv2]: isMobileV2,
            })}
          >
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className={styles.title_wrapper}>
              {!(megaDays && isMobileV2) && (
                <Grid item className={clsx(!isMobile && styles.limit_width)}>
                  <TitleComponent title={title} icon={icon} dealEndDay={endTimeFlashSale} />
                </Grid>
              )}
              {megaDays && isMobileV2 ? (
                <HeaderMageDay />
              ) : (
                <>
                  {isMobile ? (
                    <Grid
                      item
                      className={clsx(styles.grid, {
                        [styles.grid_mv2]: isMobileV2,
                      })}
                    >
                      <Box className={megaDays ? styles.wrapper_mega_button : styles.wrapper_buttons}>
                        {megaDays && (
                          <span className={styles.active_fromDate_btn}>
                            Từ <span> {fromMegaDay}</span>&nbsp;Đến&nbsp;<span>{toMegaDay}</span>
                          </span>
                        )}
                        {dealTimes?.length > 0 && (
                          <>
                            {dealTimes?.map((item, index) => {
                              const style = index === buttonID ? styles.selected_btn : styles.will_active_btn;
                              return (
                                <Button
                                  key={dealTimes?.ref}
                                  className={clsx(
                                    styles.btn_campaign,
                                    isMobileV2 && styles.btn_campaign_mv2,
                                    item?.status === CAMPAIGN_STATUS.active ? styles.active_btn : style,
                                  )}
                                  disabled={item.status === CAMPAIGN_STATUS.disabled}
                                  onClick={() => {
                                    if (item.status === CAMPAIGN_STATUS.active) gtag.clickActivePromotionButton();
                                    if (item.status === CAMPAIGN_STATUS.next) gtag.clickNextPromotionButton();
                                    loadDataByCodeFlashSale(index, { codeFlashSale: item?.code, ref: item?.ref });
                                  }}
                                >
                                  <span className={clsx(styles.btn_name)}>{item.nameFlashSale}&#160;</span> {item.buttonContent}
                                </Button>
                              );
                            })}
                          </>
                        )}
                      </Box>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      className={clsx(styles.grid, {
                        [styles.grid_mv2]: isMobileV2,
                      })}
                    >
                      <Box className={styles.wrapper_buttons}>
                        {megaDays && (
                          <Button className={clsx(styles.btn_campaign, isMobileV2 && styles.btn_campaign_mv2, styles.active_fromDate_btn)}>
                            Từ &nbsp;<span> {fromMegaDay}</span>&nbsp; Đến &nbsp;<span>{toMegaDay}</span>
                          </Button>
                        )}
                        {dealTimes?.length > 0 && (
                          <>
                            {dealTimes?.map((item, index) => {
                              const style = index === buttonID ? styles.selected_btn : styles.will_active_btn;
                              return (
                                <Button
                                  key={dealTimes?.ref}
                                  className={clsx(
                                    styles.btn_campaign,
                                    isMobileV2 && styles.btn_campaign_mv2,
                                    item?.status === CAMPAIGN_STATUS.active ? styles.active_btn : style,
                                  )}
                                  disabled={item.status === CAMPAIGN_STATUS.disabled}
                                  onClick={() => {
                                    if (item.status === CAMPAIGN_STATUS.active) gtag.clickActivePromotionButton();
                                    if (item.status === CAMPAIGN_STATUS.next) gtag.clickNextPromotionButton();
                                    loadDataByCodeFlashSale(index, { codeFlashSale: item?.code, ref: item?.ref });
                                  }}
                                >
                                  <span>{item.nameFlashSale}&#160;</span> {item.buttonContent}
                                </Button>
                              );
                            })}
                          </>
                        )}
                      </Box>
                    </Grid>
                  )}
                </>
              )}
            </Grid>

            <ProductSliderBlock products={productsFlashSale?.slice(0, 15) || []} link={link} isCampaignPage={isCampaignPage} />
          </Carousel>
        </div>
      )}
      {campaignType === 'DAILY_DEAL' && (
        <Carousel className={styles.carousel_container}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <TitleComponent title={title} icon={icon} />
            </Grid>
          </Grid>

          <ProductSliderBlock
            dailyStyle="paddingBottom: 50px"
            isHalfProgress={isHalfProgress}
            products={campaign?.products.slice(0, 15) || []}
            link={link}
          />
        </Carousel>
      )}
    </>
  );
};
export default memo(CampaignBlock);
