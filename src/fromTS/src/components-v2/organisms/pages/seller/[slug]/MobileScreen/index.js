/* eslint-disable no-nested-ternary */
import { Box, Typography } from '@material-ui/core';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductPreview from 'components-v2/mocules/mobile/SliderMobile/ProductPreview';
import { LinkComp } from 'components/atoms';
import { SECTION_STORE_ICON } from 'constants/Images';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import HeaderWrapper from '../HeaderWrapper';
import styles from './styles.module.css';

const SellerMobileScreen = ({ sellerInfo, slug, infoBanner, videoIntroduces, info, feedbacks, isMobileV2, blocks, dataSections }) => {
  const ProductBlock = ({ name, data, sectionInfo }) => {
    const Products = data.map((item) => <ProductCardVertical key={item?.code} {...item} />);
    const redirect = sectionInfo ? `/seller/${slug}/list-product?section=${sectionInfo?.code}` : undefined;

    return (
      <Box sx={{ backgroundColor: '#ffffff', marginBottom: '20px', padding: '17px 10px' }}>
        <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {sectionInfo && <ImageFallbackStatic src={SECTION_STORE_ICON} width={30} height={30} alt="icon" />}
          <Typography className={styles.titleName} fontFamily="ggsm">
            {name}
          </Typography>
        </Box>
        <ProductPreview slideItems={Products} />
        {sectionInfo && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LinkComp className={styles.redirect} href={redirect}>
              Xem tất cả
            </LinkComp>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <HeaderWrapper
      sellerInfo={sellerInfo}
      slug={slug}
      infoBanner={infoBanner}
      videoIntroduces={videoIntroduces}
      info={info}
      feedbacks={feedbacks}
      isMobileV2={isMobileV2}
    >
      {blocks.map((block) => (
        <ProductBlock key={uuidv4()} {...block} />
      ))}
      {dataSections.map(({ nameSection = '', data = [], ...sectionInfo }) => (
        <ProductBlock key={uuidv4()} name={nameSection} data={data} sectionInfo={sectionInfo} />
      ))}
    </HeaderWrapper>
  );
};

export default SellerMobileScreen;
