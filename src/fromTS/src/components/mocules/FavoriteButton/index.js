import { Fab, IconButton, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { WISHLIST_IMAGE_ACTIVE, WISHLIST_IMAGE_INACTIVE } from 'constants/Icons';
import { useWishList } from 'context';
import useEffectOnce from 'lib/useEffecOnce';
import { useState } from 'react';
import styles from './styles.module.css';

const FavoriteButton = ({ product, isProductCard = false }) => {
  const [isBookmarked, setIsFavorite] = useState(false);
  const { getWishlistBySkus, handleDeleteProductWishlist, handleUpdateWishlist, loading } = useWishList();

  const loadData = async () => {
    const res = await getWishlistBySkus(product);
    setIsFavorite(res);
  };

  useEffectOnce(() => {
    async function fetchData() {
      if (!loading) {
        loadData();
      }
    }
    fetchData();
  }, [loading]);

  const handleUpdateFavorite = async (item) => {
    const res = await handleUpdateWishlist(item);
    setIsFavorite(res);
  };

  const handleDeleteFavorite = async (item) => {
    const res = await handleDeleteProductWishlist(item);
    setIsFavorite(res);
  };

  if (isProductCard) {
    return (
      <Tooltip title={!isBookmarked ? 'Đánh dấu sản phẩm quan tâm' : 'Bỏ đánh dấu sản phẩm'}>
        {isBookmarked ? (
          <IconButton
            className={styles.favorite_icon_wrapper}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDeleteFavorite(product);
            }}
          >
            <WISHLIST_IMAGE_ACTIVE className={styles.favorite_icon} />
          </IconButton>
        ) : (
          <IconButton
            className={styles.favorite_icon_wrapper}
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateFavorite(product);
            }}
          >
            <WISHLIST_IMAGE_INACTIVE />
          </IconButton>
        )}
      </Tooltip>
    );
  }

  return (
    <Tooltip title={!isBookmarked ? 'Đánh dấu sản phẩm quan tâm' : 'Bỏ đánh dấu sản phẩm'}>
      <Fab
        className={styles.icon}
        size="small"
        aria-label="like"
        onClick={(e) => {
          e.stopPropagation();
          if (isBookmarked) {
            handleDeleteFavorite(product);
          } else {
            handleUpdateFavorite(product);
          }
        }}
      >
        {isBookmarked ? (
          <FavoriteIcon style={{ fontSize: 24 }} className={styles.like} />
        ) : (
          <FavoriteBorderIcon style={{ fontSize: 24, color: '#AFAFAF' }} />
        )}
      </Fab>
    </Tooltip>
  );
};

export default FavoriteButton;
