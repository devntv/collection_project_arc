import { getData, PromoClient } from 'clients';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import { useEffect, useState } from 'react';

const PromotionBanner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await PromoClient.getActiveCampaignClient();
      const result = getData(response).map((object) => ({
        url: object?.banner,
        alt: object?.campaignName,
        target: `/khuyenmai/${object?.slug}`,
      }));
      setBanners(result);
    })();
  }, []);

  return <SliderMobile banners={banners} />;
};

export default PromotionBanner;
