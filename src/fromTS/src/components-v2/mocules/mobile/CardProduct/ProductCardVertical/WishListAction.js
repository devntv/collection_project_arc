import { CardActions } from '@material-ui/core';
import { WISHLIST_ICON_1, WISHLIST_ICON_4 } from 'constants/Images';
import { useWishList } from 'context';
import { useCallback, useEffect, useState } from 'react';
import { ImageFallback } from 'utils';

const WishListAction = ({ propsProduct }) => {
  const [wishList, setWishList] = useState(false); // state button thêm vào ds yêu thích
  const { getWishlistBySkus, handleDeleteProductWishlist, handleUpdateWishlist } = useWishList();

  useEffect(() => {
    (async () => {
      const isActive = await getWishlistBySkus(propsProduct);
      setWishList(isActive);
    })();
  }, []);

  // thêm/xóa khỏi danh sách yêu thích
  const toggleWishList = useCallback(() => {
    if (wishList) {
      handleDeleteProductWishlist(propsProduct);
      setWishList(false);
    } else {
      handleUpdateWishlist(propsProduct);
      setWishList(true);
    }
  }, [wishList]);

  return (
    <CardActions
      style={{ padding: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishList();
      }}
    >
      <ImageFallback src={wishList ? WISHLIST_ICON_4 : WISHLIST_ICON_1} width={18} height={16} />
    </CardActions>
  );
};

export default WishListAction;
