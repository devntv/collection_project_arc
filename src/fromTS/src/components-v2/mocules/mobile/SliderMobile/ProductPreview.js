import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardActions } from '@material-ui/core';
import clsx from 'clsx';
import { ICON_MOBILE_ICON_SLIDE_ARROW_LEFT, ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT } from 'constants/Images/mobile/Icons';
import { swiperSettings } from 'constants/data';
import { memo } from 'react';
import ProductCardVertical from '../Skeleton/ProductCardVertical';
import Slider from './index';
import styles from './styles.module.css';

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CardActions className={className} style={style} onClick={onClick}>
      <FontAwesomeIcon className={clsx(styles.arrowIcon, styles.arrowLeft)} icon={faAngleRight} />
    </CardActions>
  );
};
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CardActions className={className} style={style} onClick={onClick}>
      <FontAwesomeIcon className={clsx(styles.arrowIcon, styles.arrowRight)} icon={faAngleLeft} />
    </CardActions>
  );
};

const StoreSlideNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CardActions className={clsx(className, styles.store_arrowLeft)} style={style} onClick={onClick}>
      <ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT />
    </CardActions>
  );
};
const StoreSlidePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CardActions className={clsx(className, styles.store_arrowRight)} style={style} onClick={onClick}>
      <ICON_MOBILE_ICON_SLIDE_ARROW_LEFT />
    </CardActions>
  );
};

const settings = {
  ...swiperSettings,
  pagination: false,
  navigation: {
    enable: true,
    nextEl: <CustomNextArrow />,
    prevEl: <CustomPrevArrow />,
  },
};

const settingsStore = {
  ...swiperSettings,
  pagination: false,
  navigation: {
    enable: true,
    nextEl: <StoreSlideNextArrow />,
    prevEl: <StoreSlidePrevArrow />,
  },
};

function ProductPreview({ slideItems = [], isLoading = false, appendSettings = {}, isMobileSeller = false }) {
  const numProductSlide = 2;
  // create array every element is an array item product with ${numProductSlide} element
  const SlideItemsGroup = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Math.ceil(slideItems.length / numProductSlide); ++i) {
    const arr = [];
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < numProductSlide; ++j) {
      const cI = numProductSlide * i;
      arr.push(slideItems[cI + j]);
    }
    SlideItemsGroup.push(arr);
  }
  const SlideItems = SlideItemsGroup.map((item, index) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className={clsx(styles.wrapperProductPreview)}
    >
      {item[0] && <div style={{ flex: 1, width: '100px' }}>{item[0]}</div>}
      {item[1] && <div style={{ flex: 1, width: '100px' }}>{item[1]}</div>}
      {item[2] && <div style={{ flex: 1, width: '100px' }}>{item[2]}</div>}
      {item[3] && <div style={{ flex: 1, width: '100px' }}>{item[3]}</div>}
      {item[4] && <div style={{ flex: 1, width: '100px' }}>{item[4]}</div>}
    </div>
  ));

  if (isLoading)
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '13px', padding: '10px' }}>
        <ProductCardVertical />
        <ProductCardVertical />
      </div>
    );

  if (slideItems.length === 0 && !isLoading) return <div className={styles.emptyProduct}>Danh sách sản phẩm đang cập nhật</div>;

  if (isMobileSeller) {
    return <Slider slideItems={SlideItems} options={{ ...settingsStore, ...appendSettings }} isMobileSeller />;
  }
  return <Slider slideItems={SlideItems} options={{ ...settings, ...appendSettings }} />;
}

export default memo(ProductPreview);
