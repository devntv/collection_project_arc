import { getData, PromoClient } from 'clients';
import { LinkComp } from 'components/atoms';
import { KHUYEN_MAI } from 'constants/Paths';
import { useProduct } from 'context';
import { useEffect, useState, memo } from 'react';
import { calStatusTimeFunc } from 'utils/DateTimeUtils';
import { ProductCardVertical } from '../CardProduct';
import ProductPreview from '../SliderMobile/ProductPreview';
import HeaderCampaign from './HeaderCampaign';
import styles from './styles.module.css';

const isFlashSaleDisabled = (flashSaleTimesView = []) => {
  // disabled status all flash sales time
  const isDisabled = flashSaleTimesView.every((item) => {
    const { startTime, endTime } = item;
    if (calStatusTimeFunc(new Date(startTime), new Date(endTime)) === 'DISABLED') return true;
    return false;
  });
  return isDisabled;
};

const Campaign = ({ flashSaleTimesView, flashSale, type, isNormal }) => {
  const firstTimesView = flashSaleTimesView?.length ? flashSaleTimesView[0] : {};
  const [timerCurrent, setTimerCurrent] = useState(firstTimesView?.ref || '');
  const [loading, setLoading] = useState(false);
  const [campaignProducts, setCampaignsProduct] = useState([]);
  const { getProductByCampaign } = useProduct();

  let linkToDetail = ''; // set url detai theo timer hiện tại

  if (type === 'FLASH_SALE') {
    linkToDetail = `${KHUYEN_MAI}/${flashSale?.slug}?code=${timerCurrent}`;
  } else {
    linkToDetail = `${KHUYEN_MAI}/${flashSale?.slug}?code=${flashSale?.campaignCode}`;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataQuery = isNormal ? flashSale?.campaignCode : timerCurrent;
      const resCampaignBlock = await getProductByCampaign({ campaignCode: dataQuery });
      setCampaignsProduct(getData(resCampaignBlock));
      setLoading(false);
    })();
  }, [timerCurrent]);

  const ListCampaignsProducts = campaignProducts?.map((prd) => {
    const styleContainer = {}; // spacing giữa 2 product
    return <ProductCardVertical key={`product-item-${prd.slug}`} {...prd} styleContainer={styleContainer} isCampaignPage />;
  });

  if (type === 'FLASH_SALE' && isFlashSaleDisabled(flashSaleTimesView)) return <></>;
  return (
    <>
      <div style={{ backgroundColor: 'white', padding: '20px 3px', marginTop: '15px' }}>
        <div style={{ padding: '0 15px' }}>
          <HeaderCampaign
            flashSale={flashSale}
            flashSaleTimesView={flashSaleTimesView}
            timerCurrent={timerCurrent}
            setTimerCurrent={setTimerCurrent}
          />
        </div>
        <div style={{ padding: '15px 5px 0px 5px' }}>
          <ProductPreview slideItems={ListCampaignsProducts} isLoading={loading} />
        </div>
        {campaignProducts.length > 0 && (
          <div className={styles.wrapperLink}>
            <LinkComp href={linkToDetail} className={styles.viewMore}>
              Xem Tất Cả
            </LinkComp>
          </div>
        )}
      </div>
    </>
  );
};

const CampaignBlock = ({ type = 'FLASH_SALE' }) => {
  const [campaigns, setCampaigns] = useState([]);

  const isNormal = type === 'NORMAL';

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const campaignRes = await PromoClient.getActiveCampaignClient();
      const campaignsData = getData(campaignRes);
      setCampaigns(campaignsData);

      return () => {
        abortController.abort();
      };
    })();
  }, []);
  // lấy danh sách fashsales
  const dataCampaigns = campaigns?.filter((campaign) => campaign?.campaignType === type && campaign?.status === 'PROCESSING');

  return (
    <div>
      {dataCampaigns.map(({ flashSaleTimesView, campaignCode, ...flashSale }) => (
        <Campaign
          key={`campaign-flash-sale-${campaignCode}`}
          flashSale={flashSale}
          flashSaleTimesView={flashSaleTimesView}
          type={type}
          isNormal={isNormal}
        />
      ))}
    </div>
  );
};

export default memo(CampaignBlock);
