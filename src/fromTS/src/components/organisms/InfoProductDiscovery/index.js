import { Button, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DiscoveryModal from 'components/mocules/DiscoveryModal';
import { useProduct } from 'context';
import { useModal } from 'hooks';
import { useState } from 'react';
import { ProductServiceV2 } from 'services';
import { gtag } from 'utils';
import styles from './styles.module.css';

const InfoProductDiscovery = ({ sku = '', postInfo = {} }) => {
  const { title, description = '' } = postInfo;
  const [isMore, setIsMore] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, toggleModal] = useModal();
  const { getProductBySkus } = useProduct();
  const [infoProduct, setInfoProduct] = useState(null);
  const [descriptionPrd, setDescriptionPrd] = useState(null);
  const handleClick = async () => {
    // show discovery
    gtag.showModalDiscovery({ sku });
    toggleModal();
    const mapProduct = await getProductBySkus({ skus: [sku], getPrice: true });
    const descriptionProduct = await ProductServiceV2.getDescriptionBySkus({ sku });
    setInfoProduct(mapProduct.get(sku));
    setDescriptionPrd(descriptionProduct);
  };

  return (
    <>
      <div style={{ padding: '1.25rem' }}>
        <Typography className={styles.title}>{title}</Typography>
        {description && (
          <>
            <Typography className={!isMore && styles.info}>{description}</Typography>
            <div role="presentation" onClick={() => setIsMore(!isMore)} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={styles.seeMore}>{isMore ? 'Thu gọn' : 'Xem thêm'}</Typography>
              {isMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </>
        )}

        <div className={styles.infoWrapper}>
          <div className={styles.favWrapper}>
            {/* <IconButton aria-label="favorite" onClick={() => setIsFavorite(!isFavorite)}>
              {isFavorite ? <FavoriteIcon style={{ marginRight: '5px', color: 'red' }} /> : <FavoriteBorderIcon style={{ marginRight: '5px' }} />}
            </IconButton>
            38 */}
          </div>
          <div>
            <Button className={styles.btn} startIcon={<VisibilityOutlinedIcon />} onClick={handleClick}>
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
      <DiscoveryModal
        descriptionPrd={descriptionPrd}
        infoProduct={infoProduct}
        visible={showModal}
        onClose={toggleModal}
        className={styles.modal}
        postInfo={postInfo}
      />
    </>
  );
};

export default InfoProductDiscovery;
