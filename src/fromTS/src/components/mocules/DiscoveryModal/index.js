import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import clsx from 'clsx';
import { Button, Modal } from 'components/atoms';
import ProductDetailTabs from 'components/mocules/ProductDetailTabs';
import ImageSlide from 'components/organisms/ImageSlide';
import VideoDiscovery from 'components/organisms/VideoDiscovery';
import { tabsProductData } from 'constants/data';
import { useCart, useProduct } from 'context';
import { useState } from 'react';
import { formatDate } from 'utils/FormatDate';
import { formatCurrency } from 'utils/FormatNumber';
import styles from './styles.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DiscoveryModal = ({ infoProduct, className, visible, onClose, postInfo = {}, restProps, descriptionPrd }) => {
  const classes = useStyles();
  const { updateCartItem } = useCart();
  const { getProductError } = useProduct();
  const { errorRequiredCertificate, errorRequiredCertificateMessage } = getProductError({ product: infoProduct });
  const handleAddProduct = (product) => {
    updateCartItem({ product, q: parseFloat(1) }, true);
  };
  const { imagesProxy = [], video = null, ytbEmbeddedUrl = null, contentType } = postInfo;
  const [value, setValue] = useState('1');
  const [valuePrd, setValuePrd] = useState('1');

  // const handlers = useSwipeable({
  //   onSwipedDown: () => {
  //     onClose();
  //   },
  // });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTab = (event, newValue) => {
    setValuePrd(newValue);
  };

  const product = {
    description: descriptionPrd,
  };
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div
        // {...handlers}
        className={clsx(classes.root, styles.root)}
      >
        <IconButton aria-label="close" className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <TabContext value={value}>
          <div>
            <TabList onChange={handleChange} aria-label="simple tabs example" TabIndicatorProps={{ className: styles.indicator }}>
              <Tab label="Về sản phẩm" value="1" classes={{ root: styles.tab }} />
              {contentType === 'IMAGE' ? (
                <Tab label="Hình ảnh" value="2" classes={{ root: styles.tab }} />
              ) : (
                <Tab label="Video" value="3" classes={{ root: styles.tab }} />
              )}
            </TabList>
          </div>
          <TabPanel value="1" className={styles.tab_panel}>
            {infoProduct && (
              <div>
                <div style={{ padding: '15px' }}>
                  <ImageSlide images={infoProduct?.imagesProxy || []} />
                  <Typography className={styles.name}>{infoProduct?.name || ''}</Typography>
                  <Typography className={styles.info}>
                    {infoProduct?.volume || ''} {infoProduct?.unit || ''}
                    {infoProduct?.statusData?.date &&
                      ` - HSD tham khảo 
                  ${formatDate(infoProduct?.statusData?.date)}`}
                  </Typography>
                  <div className={styles.price}>
                    <Typography className={styles.displayPrice}>{formatCurrency(infoProduct?.displayPrice)}</Typography>
                    <Typography className={styles.salePrice}>
                      {infoProduct?.salePrice !== infoProduct?.displayPrice && formatCurrency(infoProduct?.salePrice)}
                    </Typography>
                    <Typography className={styles.percent}>{infoProduct?.discountPercent > 0 && `${infoProduct?.discountPercent}%`}</Typography>
                  </div>
                  {infoProduct?.errorMessageProduct && <Typography className={styles.errorMessage}>{infoProduct?.errorMessageProduct}</Typography>}
                  {errorRequiredCertificate && <Typography className={styles.errorMessage}>{errorRequiredCertificateMessage}</Typography>}

                  <div className={styles.tabs}>
                    <ProductDetailTabs handleChange={handleChangeTab} data={tabsProductData} product={product} value={valuePrd} />
                  </div>
                </div>
                <div className={styles.btnWrap}>
                  <Button
                    onClick={() => handleAddProduct(infoProduct)}
                    startIcon={<LocalMallOutlinedIcon />}
                    className={styles.orderBtn}
                    disabled={infoProduct?.errorMessageProduct || errorRequiredCertificate}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            )}
          </TabPanel>
          {contentType === 'IMAGE' ? (
            <TabPanel className={styles.tab_panel} value="2">
              <div className={styles.media}>
                <ImageSlide images={imagesProxy} />
              </div>
            </TabPanel>
          ) : (
            <TabPanel className={styles.tab_panel} value="3">
              <div className={styles.media}>
                <VideoDiscovery video={video} ytbEmbeddedUrl={ytbEmbeddedUrl} />
              </div>
            </TabPanel>
          )}
        </TabContext>
      </div>
    </Modal>
  );
};

export default DiscoveryModal;
