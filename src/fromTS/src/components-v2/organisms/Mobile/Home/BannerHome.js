import { getData, MarketingClient } from 'clients';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import { memo, useEffect, useState } from 'react';

const BannerHome = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await MarketingClient.getListBannerMock();

      const result = getData(response).map((object) => ({
        url: object.imgURL,
        alt: object.name,
        target: object.targetURL,
        id: object.code,
      }));
      setBanners(result);
    })();
  }, []);

  return <SliderMobile banners={banners} priority />;
};

export default memo(BannerHome);
