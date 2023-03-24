import { CardActions } from '@material-ui/core';
import PopupMultilImage from 'components-v2/mocules/PopupMultilImage';
import { useMultiImageBox, useToggle } from 'hooks';
import Slider from 'react-slick';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const ImageProducts = ({ images = [], title = '', imageName = '' }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { selectedImage, handleImageSelection, handlePrevious, handleNext } = useMultiImageBox({ images });
  const { open, handleOpen, handleClose } = useToggle();
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  return (
    <div className={styles.root}>
      <Slider {...settings}>
        {images?.map((image) => (
          <CardActions key={uuidv4()} className={styles.image_items} onClick={handleOpen}>
            <ImageFallbackProductImage
              width={288}
              height={227}
              alt={title}
              src={image && `${image}`}
              fallbackSrc={image}
              quality={100}
              className={styles.image}
              placeholder="blur"
              blurDataURL={image && `${image}`}
            />
          </CardActions>
        ))}
      </Slider>
      {open && (
        <PopupMultilImage
          isMobile={isMobileV2}
          images={images}
          open={open}
          handleClose={handleClose}
          imageName={imageName}
          selectedImage={selectedImage}
          handleClickImage={handleImageSelection}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default ImageProducts;
