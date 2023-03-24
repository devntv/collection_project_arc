/* eslint-disable no-plusplus */
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import { memo, useEffect, useState } from 'react';
import { INSIDER_ID } from 'sysconfig';
import getHtml from 'utils/getHtml';
import useMobileV2 from 'zustand-lib/storeMobile';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const isFetchInsider = useMobileV2((state) => state.isTrackingMobileV2);
  useEffect(() => {
    (async () => {
      if (isFetchInsider) {
        await fetch(`https://thuocsivn.api.useinsider.com/ins.js?id=${INSIDER_ID}`)
          .then((response) => response.text())
          .then((value) => {
            const array = [];
            const html = getHtml(value, `Insider.dom(inselement).before('`, `');`);
            const document = new DOMParser().parseFromString(`<html><body>${html}</body></html>`, 'text/html');
            const imgNodes = document.getElementsByTagName('img');
            const aNodes = document.getElementsByTagName('a');
            for (let i = 0; i < imgNodes.length; i++) {
              const src = imgNodes[i].getAttribute('src');
              const href = aNodes[i].getAttribute('href');
              if (src && href)
                array.push({
                  url: src,
                  alt: href,
                  target: href,
                });
            }
            setBanners(array);
          });
      }
    })();
  }, []);

  return <SliderMobile banners={banners} insider />;
};

export default memo(Banner);
