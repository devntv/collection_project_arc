import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import ProductCardNew from 'components/mocules/ProductCardNew';
import SliderProduct from 'components/mocules/SliderProduct';
import BannerSlider from 'components/organisms/BannerSlider';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerProductSliderSection from 'components/organisms/SellerProductSliderSection';
import SellerTabs from 'components/organisms/SellerTabs';
import { SECTION_STORE_ICON } from 'constants/Images';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SellerPCScreen = ({ isMobile, sellerInfo, slug, landingPage, info, infoBanner, infoStore, name, blocks, dataSections }) => (
  <div className={styles.container}>
    <Container maxWidth="lg" className={isMobile ? styles.containerMobile : ''}>
      <SellerHeader sellerInfo={sellerInfo} />
      <Divider />
      <SellerTabs slug={slug} />

      {/* old */}
      {landingPage && landingPage?.startsWith('https://try.thuocsi.vn') ? (
        <iframe src={landingPage} width="100%" title="landingpage" id="myFrame" height="3000px" frameBorder="0" scrolling="no" />
      ) : (
        <div style={{ paddingTop: 20 }}>
          <Grid container spacing={2}>
            {info.length > 0 && infoBanner.length > 0 ? (
              <>
                <Grid item xs={12} lg={infoStore ? 7 : 12}>
                  <BannerSlider banners={infoBanner} isSeller />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <div className={styles.infoWrap}>
                    <Typography variant="h6" component="h6" className={styles.name}>
                      {name}
                    </Typography>
                    <div style={{ overflow: 'auto', height: '200px' }}>
                      <div dangerouslySetInnerHTML={{ __html: infoStore }} />
                    </div>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                {infoBanner?.length > 0 && (
                  <Grid item xs={12}>
                    <BannerSlider banners={infoBanner} isSeller />
                  </Grid>
                )}
                {info.length > 0 && (
                  <Grid item xs={12}>
                    <div className={styles.infoWrap}>
                      <Typography variant="h6" component="h6" className={styles.name}>
                        {name}
                      </Typography>
                      <div dangerouslySetInnerHTML={{ __html: infoStore }} />
                    </div>
                  </Grid>
                )}
              </>
            )}
          </Grid>

          <div className="SliderProductWrap">
            {blocks && blocks.map((item) => <SellerProductSliderSection key={uuidv4()} products={item.data} name={item.name} />)}
          </div>
          <Box style={{ marginTop: '30px' }}>
            {dataSections &&
              dataSections.length > 0 &&
              dataSections.map((item) => (
                <SliderProduct
                  iconWidth="40px"
                  iconHeight="41px"
                  icon={SECTION_STORE_ICON}
                  name={item?.nameSection}
                  key={`flagship-${item?.nameSection}`}
                  viewMore
                  redirect={`/seller/${slug}/list-product?section=${item?.code}`}
                  page="PRD_DETAIL"
                >
                  {item?.data &&
                    item?.data.length > 0 &&
                    item.data.map((ele) => (
                      <ProductCardNew
                        isBestProduct={item?.type === 'fav'}
                        product={ele}
                        key={`item-product-${ele.slug}`}
                        tag
                        category
                        isMobile={isMobile}
                      />
                    ))}
                </SliderProduct>
              ))}
          </Box>
        </div>
      )}
    </Container>
  </div>
);

export default SellerPCScreen;
