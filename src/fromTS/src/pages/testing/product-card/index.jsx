import { Box, Card, CardContent, Chip, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { LinkComp } from 'components/atoms';
import ProductCardInput from 'components/mocules/ProductCardInput';
import ProductCardContentNew from 'components/mocules/ProductCartContentNew';
import { MISSING_IMAGE } from 'constants/Images';
import { useWishList } from 'context';
import { memo, useEffect, useRef, useState } from 'react';
import { FEATURE_WISHLIST } from 'sysconfig';
import { ImageFallback } from 'utils';
import styles from './styles.module.css';

// eslint-disable-next-line no-unused-vars
const data = {
  categoryCodes: null,
  deal: {
    autoOffSku: true,
    autoOnSkuCombo: true,
    code: '6RAV84FW',
    createdTime: '2021-08-04T13:29:58.186Z',
    dealID: 55893,
    dealType: 'DEAL',
    discountPercent: 10,
    endTime: '2021-08-14T13:28:00Z',
    imageUrls: null,
    lastUpdatedTime: '2021-08-04T13:34:55.265Z',
    maxDiscountValue: 0,
    maxQuantity: 50,
    name: 'COMBO_FIXED_REVENUE_001',
    owner: 'SELLER',
    price: 162000,
    pricingType: 'PERCENTAGE',
    quantity: 0,
    readyTime: '2021-08-04T13:28:00Z',
    sellerCode: 'QWBQ777777',
  },
  dealPrice: 162000,
  defaultImage: 'https://img-proxy.thuocsi.vn/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172',
  description: null,
  displayPrice: 162000,
  documentFiles: [],
  errorMessageProduct: null,
  imageUrls: ['https://storage.googleapis.com/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172'],
  imagesProxy: ['https://img-proxy.thuocsi.vn/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172'],
  ingredientCodes: [],
  ingredients: [],
  isDeal: true,
  isGift: false,
  kind: 'FIXED_PRICE',
  manufacturerCode: '',
  maxQuantity: 50,
  name: 'COMBO_FIXED_REVENUE_001',
  origin: '',
  priority: 3,
  productId: 55892,
  productSkuType: 'COMBO',
  quantity: 0,
  salePrice: 180000,
  seller: { code: 'QWBQ777777', slug: 'qwbq777777-combo_fixed_revenue_001' },
  sellerCode: 'QWBQ777777',
  sku: 'QWBQ777777.4W2FW961',
  skuId: '4W2FW961',
  skus: (2)[({ productID: 55269, quantity: 1, sku: 'QWBQ777777.1EKAXHR2' }, { productID: 55125, quantity: 1, sku: 'QWBQ777777.REKAXHR2' })],
  slug: 'qwbq777777-combo_fixed_revenue_001',
  status: 'NORMAL',
  statusData: null,
  tags: ['V2U1', 'V2U1', 'V2U1', 'V2U1'],
  type: '',
  volume: '1 combo',
  weight: 0,
  unit: 'Hop',
};

const TestingProductCardNew = ({ product, type, category, tag, cart, onIncrement, index, isCampaign = false }) => {
  const { isNew, name, slug, imagesProxy = [] } = product;
  const searchInput = useRef([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const { loadWishList, handleDeleteProductWishlist, handleUpdateWishlist } = useWishList();

  useEffect(() => {
    async function fetchData() {
      const res = await loadWishList(product);
      setIsFavorite(res);
    }
    fetchData();
  }, []);

  const handleUpdateFavorite = async (item) => {
    const res = await handleUpdateWishlist(item);
    setIsFavorite(res);
  };

  const handleDeleteFavorite = async (item) => {
    const res = await handleDeleteProductWishlist(item);
    setIsFavorite(res);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.product_card}>
        <div>
          {isNew && FEATURE_WISHLIST && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Chip label="Mới" className={styles.product_tag} />
              {isFavorite ? (
                <IconButton className={styles.favorite_icon_withnew} onClick={() => handleDeleteFavorite(product)}>
                  <FavoriteIcon className={styles.favorite_icon} />
                </IconButton>
              ) : (
                <IconButton className={styles.favorite_icon_withnew} onClick={() => handleUpdateFavorite(product)}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </Box>
          )}
          {!isNew && FEATURE_WISHLIST && (
            <Box display="flex" justifyContent="flex-end">
              {isFavorite ? (
                <IconButton className={styles.favorite_icon_withoutnew} onClick={() => handleDeleteFavorite(product)}>
                  <FavoriteIcon className={styles.favorite_icon} />
                </IconButton>
              ) : (
                <IconButton className={styles.favorite_icon_withoutnew} onClick={() => handleUpdateFavorite(product)}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </Box>
          )}

          <div className={styles.product_image}>
            <CardContent>
              <LinkComp href={`/product/${slug || ''}`} prefetch={false}>
                <ImageFallback
                  fallbackSrc={MISSING_IMAGE}
                  src={(imagesProxy && `${imagesProxy[0]}`) || MISSING_IMAGE}
                  alt={name && name}
                  width={100}
                  height={100}
                  loading="lazy"
                  title={name && name}
                  className={styles.image}
                />
              </LinkComp>
            </CardContent>
          </div>
          {/* components tên, số lượng, hạn... */}
          <ProductCardContentNew tag={tag} cate={category} row {...product} isCampaign={isCampaign} />
        </div>
        {/* components giá tiền, inputs, buttons */}
        {/* truyền thêm type của productLên  */}
        <div>
          <ProductCardInput
            searchInput={searchInput}
            index={index}
            product={product}
            onIncrement={onIncrement}
            cart={cart}
            type={type}
            row
            {...product}
            isCampaign={isCampaign}
          />
        </div>
      </Card>
    </div>
  );
};

export default memo(TestingProductCardNew);
