import { Backdrop, ButtonBase, Grid, Modal } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { MISSING_IMAGE } from 'constants/Images';
import useMultiImageBox from 'hooks/useMultiImageBox';
import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import React from 'react';
import { myLoader } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const MultiImageBox = ({ loading, images = null, title = '' }) => {
  const { selectedImage, handleKeyDown, handleImageSelection } = useMultiImageBox({ images });
  const { open, handleOpen, handleClose } = useToggle();

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" classes={{ root: styles.container }}>
        <Grid item xs={12} style={{ flex: '80%' }}>
          {loading ? (
            <Skeleton variant="rect" classes={{ root: styles.imageMain }} />
          ) : (
            <>
              {images && images.length > 0 ? (
                <ButtonBase classes={{ root: styles.imgButtonBase }} onClick={handleOpen}>
                  <ImageFallbackProductImage
                    width={227}
                    height={143}
                    alt={title}
                    fallbackSrc={images[selectedImage]}
                    className={styles.imageMain}
                    src={`${images[selectedImage]}`}
                    quality={100}
                  />
                </ButtonBase>
              ) : (
                <Image width={227} height={227} alt="Image Not Found" loader={myLoader} className={styles.imageNotFound} src={MISSING_IMAGE} />
              )}
            </>
          )}
        </Grid>
        <Grid>
          {images &&
            images.map((src, index) => (
              <Grid
                item
                spacing={1}
                container
                direction="column"
                classes={{ root: styles.thumbnail }}
                key={uuidv4()}
                alignItems="flex-start"
                alignContent="flex-start"
              >
                <Grid item key={uuidv4()}>
                  {loading ? (
                    <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
                  ) : (
                    <ButtonBase classes={{ root: styles.imgButtonBase }} onClick={() => index !== selectedImage && handleImageSelection(index)}>
                      <ImageFallbackProductImage
                        width={70}
                        height={70}
                        alt={title}
                        className={clsx(styles.thumbnailImage, {
                          [styles.thumbnailSelected]: index === selectedImage,
                        })}
                        src={`${src}`}
                        fallbackSrc={src}
                        quality={100}
                      />
                    </ButtonBase>
                  )}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>

      {images && (
        <Modal open={open} onClose={handleClose} hideBackdrop aria-labelledby="image-gallery-title" aria-describedby="image-gallery-description">
          <Backdrop className={styles.modalBackdrop} open={open} onClick={handleClose} onKeyDown={handleKeyDown}>
            <Grid container alignItems="center" justifyContent="center" direction="row">
              <img
                alt={title}
                // layout="fill"
                className={styles.modalImage}
                src={images[selectedImage]}
                // quality={100}
              />
            </Grid>
          </Backdrop>
        </Modal>
      )}
    </>
  );
};

export default React.memo(MultiImageBox);
