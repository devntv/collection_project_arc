import { Grid, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { useMultiImageBox } from 'hooks';
import useToggle from 'hooks/useToggle';
import { memo } from 'react';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { isEmpty } from 'utils/ValidateUtils';
import PopupMultilImage from '../PopupMultilImage';
import styles from './styles.module.css';

function ListPromoGift({ srcImagesProxy, width, height, imageName, isMobile = false, name = '', lengthList }) {
  const { open, handleClose, handleOpen } = useToggle();
  // const [stateImgClick, setStateImgClick] = useState([]);
  const { selectedImage, handleImageSelection, handlePrevious, handleNext } = useMultiImageBox({ images: srcImagesProxy });
  // const [dataPromoProduct] = useState([]);
  const handleOpenPopup = () => {
    handleOpen();
  };
  // const handleGetDataProduct = async (slug) => {
  //   const resultPromoData = getFirst(await ProductServiceV2.loadDataProductDetailWithoutCTX({ slug }));
  //   setStateImgClick(resultPromoData);
  //   if (resultPromoData) {
  //     if (isMobile) window.location.assign(link, '_blank', 'noopener,noreferrer');
  //     window.open(link, '_blank', 'noopener,noreferrer');
  //   } else if ((!stateImgClick || stateImgClick.length === 0) && !open) {
  //     handleOpen();
  //   }
  // };
  return (
    <Grid
      className={clsx(styles.wrapPromoImg, isMobile && styles.wrapPromoImgMobile, lengthList > 3 && styles.wrapPromoResize)}
      // onClick={() => handleGetDataProduct(slugProduct)}
    >
      {/* <LinkComp href={link}> */}
      <Tooltip title={name} arrow>
        <Grid onClick={handleOpenPopup} role="presentation" style={{ cursor: 'pointer' }}>
          <ImageFallbackProductImage
            src={!isEmpty(srcImagesProxy) && `${srcImagesProxy[0]}?size=400`}
            width={width}
            height={height}
            objectFit="contain"
          />
        </Grid>
      </Tooltip>
      {/* <div className={clsx(styles.plus, lengthList <= 3 && styles.hidePlus)}>+</div> */}
      {/* </LinkComp> */}
      {open && (
        <PopupMultilImage
          isMobile={isMobile}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleClickImage={handleImageSelection}
          selectedImage={selectedImage}
          open={open}
          handleClose={handleClose}
          images={srcImagesProxy}
          imageName={imageName}
        />
      )}
    </Grid>
  );
}

export default memo(ListPromoGift);
