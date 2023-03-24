import { Avatar, Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import clsx from 'clsx';
import { customerFeedbackData, settingsCustomer } from 'constants/data';
import { memo, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 as uuidv4 } from 'uuid';

import { BRAND_NAME } from 'constants/Enums';
import { getLinkImageStaticCache } from 'utils/CacheImageUtils';
import styles from './styles.module.css';

const SliderComp = () => {
  const ref = useRef({});
  const sliderItem = customerFeedbackData.map((item) => (
    <div key={`slider-${uuidv4()}`} className={styles.box}>
      <Card className={styles.root}>
        <CardHeader
          avatar={
            <Avatar src={getLinkImageStaticCache({ url: item.avatar, width: 100, isCache: false })} aria-label="recipe" className={styles.large} />
          }
          title={item.customer}
          subheader={item.title}
          className={styles.card_header}
          classes={{
            title: styles.header_customer,
            subheader: styles.header_title,
          }}
        />
        <CardContent className={styles.card_content}>
          <Typography className={styles.comment_style} variant="body2" color="textSecondary" component="p">
            <FormatQuoteIcon className={clsx(styles.rotate, styles.quote)} />
            {item.comment}
            <FormatQuoteIcon className={styles.quote} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));
  return (
    <div className={styles.wrapper_media}>
      <Container fixed>
        <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <h2 className={styles.title}>Khách hàng nói gì về {BRAND_NAME}</h2>
          <Slider ref={ref} {...settingsCustomer} className={styles.slider}>
            {sliderItem}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default memo(SliderComp);
