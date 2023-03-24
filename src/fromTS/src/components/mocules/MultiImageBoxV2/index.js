import { ButtonBase, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import PopupMultilImage from 'components-v2/mocules/PopupMultilImage';
import { settingsMultiImageBoxV2 } from 'constants/data';
import { MISSING_IMAGE } from 'constants/Images';
import useMultiImageBox from 'hooks/useMultiImageBox';
import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import { myLoader } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const MultiImageBoxV2 = ({ loading, images = null, title = '', isMobile = false, imageName = '' }) => {
  const { selectedImage, handleHoverImage, handleImageSelection, handlePrevious, handleNext } = useMultiImageBox({ images });
  const { open, handleOpen, handleClose } = useToggle();
  const [mainImg, setMainImg] = useState(null);

  const handleOpenImageModal = () => {
    setMainImg(images[selectedImage]);
    handleOpen();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapperImg}>
          {loading ? (
            <Skeleton variant="rect" classes={{ root: styles.imageMain }} />
          ) : (
            <>
              {images && images.length > 0 ? (
                <ButtonBase onClick={handleOpenImageModal} className="openImg">
                  <ImageFallbackProductImage
                    width={288}
                    height={227}
                    alt={title}
                    fallbackSrc={images[selectedImage]}
                    className={styles.imageMain}
                    src={`${open ? mainImg : images[selectedImage]}`}
                    quality={100}
                    // placeholder="blur"
                    // blurDataURL={`${open ? mainImg : images[selectedImage]}`}
                  />
                </ButtonBase>
              ) : (
                <Image width={227} height={227} alt="Image Not Found" loader={myLoader} className={styles.imageNotFound} src={MISSING_IMAGE} />
              )}
            </>
          )}
        </div>
        <Slider className={styles.slider} {...settingsMultiImageBoxV2}>
          {images &&
            images.map((src, index) => (
              <div className={styles.thumbnail} key={uuidv4()}>
                {loading ? (
                  <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                ) : (
                  <ButtonBase onClick={handleOpenImageModal} onMouseOver={() => handleHoverImage(index)}>
                    <ImageFallbackProductImage
                      width={60}
                      height={60}
                      alt={title}
                      className={clsx(styles.thumbnailImage, {
                        [styles.thumbnailSelected]: index === selectedImage,
                      })}
                      src={`${src}`}
                      fallbackSrc={src}
                      quality={100}
                      // placeholder="blur"
                      // blurDataURL={src}
                    />
                  </ButtonBase>
                )}
              </div>
            ))}
        </Slider>
        <Typography className={styles.descImg}>* Hình sản phẩm có thể thay đổi theo thời gian</Typography>
      </div>
      {open && (
        <PopupMultilImage
          isMobile={isMobile}
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
    </>
  );
};

export default MultiImageBoxV2;
