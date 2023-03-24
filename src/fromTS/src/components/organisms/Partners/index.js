import { Container } from '@material-ui/core';
import { imagePartnerSlider, settingsPartner } from 'constants/data';
import { BRAND_NAME } from 'constants/Enums';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const Partners = () => {
  const ref = useRef({});
  const partnerItem = imagePartnerSlider.map((item) => (
    <div key={`partner-${uuidv4()}`} className={styles.item}>
      <ImageFallbackStatic src={item.url} width={item.width} height={item.height} layout="fixed" />
    </div>
  ));

  return (
    <div style={{ padding: '40px 0', backgroundColor: '#fff' }} className={styles.wrapper}>
      <Container fixed>
        <h2 className={styles.title}>Đối Tác Của {BRAND_NAME}</h2>
        <Slider ref={ref} {...settingsPartner} className={styles.slider}>
          {partnerItem}
        </Slider>
      </Container>
    </div>
  );
};

export default React.memo(Partners);
