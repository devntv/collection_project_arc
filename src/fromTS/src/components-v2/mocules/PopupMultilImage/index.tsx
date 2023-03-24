import { Backdrop, ButtonBase, Fade, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import shimmer from 'components-v2/atoms/Shimmer';
import { settingsMobileMultiImageBoxV2 } from 'constants/data';
import { MISSING_IMAGE } from 'constants/Images';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallback, StringUtils } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

type PopupMultilImageProps = {
  isMobile: boolean;
  images: string[];
  open: boolean;
  handleClose: () => void;
  imageName: string;
  selectedImage: number;
  handleClickImage: (idx: number) => void;
  handlePrevious: (e: object) => void;
  handleNext: (e: object) => void;
};

export const BLUR_DATA_URL = {
  DART_PC: `data:image/svg+xml;base64,${StringUtils.toBase64(shimmer(300, 300, '#bcbcbc1c'))}`,
  DART_MOBILE: `data:image/svg+xml;base64,${StringUtils.toBase64(shimmer(42, 42, '#bcbcbc1c'))}`,
  BRIGHT_PC: `data:image/svg+xml;base64,${StringUtils.toBase64(shimmer(545, 545, '#f3f3f3'))}`,
  BRIGHT_MOBILE: `data:image/svg+xml;base64,${StringUtils.toBase64(shimmer(42, 42, '#f3f3f3'))}`,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      width: '940px',
      height: '651px',
      borderRadius: '10px',
      boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.05)',
    },
    mobileModal: {
      position: 'absolute',
      display: 'flex',
      width: '95%',
      height: '400px',
      borderRadius: '10px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.05)',
    },
    closeBtn: {
      width: '30px',
      height: '30px',
      color: '#C0C0C0',
    },
    nameBoxText: {
      display: 'box',
      lineClamp: 2,
      boxOrient: 'vertical',
      overflow: 'hidden',
    },
    navigateBtn: {
      width: '40px',
      height: '40px',
      background: 'rgba(0, 0, 0, 0.15)',
      position: 'absolute',
      color: '#ffffff',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.15)',
        color: '#2CD888',
      },
    },
    navigateIc: {
      width: '40px',
      height: '40px',
    },
    navBtnMobile: {
      background: 'rgba(0, 0, 0, 0.15)',
      width: '40px',
      height: '40px',
    },
  }),
);

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const PopupMultilImage: React.FC<PopupMultilImageProps> = ({
  isMobile = false,
  images = [],
  open = false,
  handleClose,
  imageName = '',
  selectedImage = 0,
  handleClickImage,
  handlePrevious,
  handleNext,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  if (isMobile) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-gallery-title"
        aria-describedby="image-gallery-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={modalStyle} className={classes.mobileModal}>
          <Grid container direction="row">
            {/* Image Gallery */}
            <Grid item container justifyContent="center">
              <div className={styles.wrapperMobileImg}>
                <IconButton onClick={handlePrevious} aria-label="prev" className={clsx(classes.navBtnMobile, styles.leftNavBtn)}>
                  <NavigateBeforeIcon className={classes.navigateIc} />
                </IconButton>
                <ImageFallbackProductImage
                  width={300}
                  height={300}
                  layout="fill"
                  alt="image-gallery-item"
                  fallbackSrc={MISSING_IMAGE}
                  className={styles.imageMainMobile}
                  src={`${images[selectedImage]}?size=origin`}
                  quality={100}
                  isUseLoaderCache
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL.DART_PC}
                />
                <IconButton onClick={handleNext} aria-label="next" className={clsx(classes.navBtnMobile, styles.rightNavBtn)}>
                  <NavigateNextIcon className={classes.navigateIc} />
                </IconButton>
              </div>
            </Grid>
            {/* Thumbnail */}
            <Grid item container justifyContent="center">
              <div className={styles.wrapper_mobile_thumbnail}>
                {images?.length === 1 ? (
                  <div className={styles.flex_center}>
                    <ButtonBase className={clsx(styles.thumbnail_image_wrapper_mobile, styles.thumbnail_selected)}>
                      <ImageFallbackProductImage
                        width={42}
                        height={42}
                        alt="thumbnailImage"
                        className={styles.thumbnail_image}
                        src={images && `${images[0]}`}
                        fallbackSrc={images[0]}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL.DART_MOBILE}
                      />
                    </ButtonBase>
                  </div>
                ) : (
                  <Slider className={styles.slider} {...settingsMobileMultiImageBoxV2}>
                    {images?.map((img, idx) => (
                      <ButtonBase
                        key={img}
                        onClick={() => handleClickImage(idx)}
                        className={clsx(styles.thumbnail_image_wrapper_mobile, idx === selectedImage && styles.thumbnail_selected)}
                      >
                        <ImageFallbackProductImage
                          width={42}
                          height={42}
                          alt="thumbnailImage"
                          className={styles.thumbnail_image}
                          src={`${img}`}
                          fallbackSrc={MISSING_IMAGE}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL.DART_MOBILE}
                        />
                      </ButtonBase>
                    ))}
                  </Slider>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-gallery-title"
      aria-describedby="image-gallery-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div style={modalStyle} className={classes.modal}>
          <div className={styles.closeWrapper}>
            <IconButton onClick={handleClose} aria-label="close" style={{ height: '18px', width: '18px' }}>
              <CloseIcon className={classes.closeBtn} />
            </IconButton>
          </div>
          <div>
            <Grid container direction="row">
              {/* Image Gallery */}
              <Grid item>
                <div className={styles.wrapperImg}>
                  <IconButton onClick={handlePrevious} className={classes.navigateBtn} aria-label="prev" style={{ left: '40px', zIndex: 10 }}>
                    <NavigateBeforeIcon className={classes.navigateIc} />
                  </IconButton>
                  <ImageFallback
                    width={545}
                    height={545}
                    // layout="fill"
                    alt="image-gallery-item"
                    fallbackSrc={MISSING_IMAGE}
                    className={styles.imageMain}
                    src={`${images[selectedImage]}?size=origin`}
                    quality={100}
                    isUseLoaderCache
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL.BRIGHT_PC}
                  />
                  <IconButton onClick={handleNext} className={classes.navigateBtn} aria-label="next" style={{ left: '590px', zIndex: 10 }}>
                    <NavigateNextIcon className={classes.navigateIc} />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ width: '250px', marginLeft: '50px' }}>
                {/* Thumbnail */}
                <Typography className={clsx(styles.imageNameText, classes.nameBoxText)}>{imageName}</Typography>
                <div className={clsx(styles.wrapper_thumbnail, images?.length > 21 && styles.scroll_vertical)}>
                  {images?.map((img, idx) => (
                    <ButtonBase
                      onClick={() => handleClickImage(idx)}
                      className={clsx(styles.thumbnail_image_wrapper, idx === selectedImage && styles.thumbnail_selected)}
                    >
                      <ImageFallbackProductImage
                        width={42}
                        height={42}
                        alt="thumbnailImage"
                        className={styles.thumbnail_image}
                        src={img && `${img}`}
                        fallbackSrc={img}
                        quality={100}
                        isUseLoaderCache
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL.BRIGHT_MOBILE}
                      />
                    </ButtonBase>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default PopupMultilImage;
