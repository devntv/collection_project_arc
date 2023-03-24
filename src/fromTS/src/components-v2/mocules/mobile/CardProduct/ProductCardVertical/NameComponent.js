import { LinkComp } from 'components/atoms';
import { FLAGSHIP_LABEL } from 'constants/Enums';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
import { TAG_NEW } from 'sysconfig';
import styles from './styles.module.css';

/*
 RULES 
 1.isGift = true 
  + isVip && isStore || tags có DUREX  => SellerVip
  + isDeal && deal ? deal.name : name
 2.isGift = false
  + isNew && !isVip && render => mới
  + isVip && isStore || tags có DUREX  => SellerVip
  + isDeal && deal ? deal?.name : name
*/

const NameComponent = ({ propsProduct, sellerInfo }) => {
  const SellerVip = () => (
    <>
      <span style={{ color: '#B98F0F', fontSize: '12px' }}>{FLAGSHIP_LABEL}</span>
      <span style={{ fontSize: '12px' }}> - </span>
    </>
  );

  const { isGift, deal, isNew, isDeal, tags, name } = propsProduct;
  const { isVip = null, isStore = false } = sellerInfo || {};

  const Wrapper = ({ children }) => <div className={styles.productName}>{children}</div>;
  const NewLinkComp = () => (
    <LinkComp className={styles.linkNew} href={`${PRODUCTS_LOADING_URL}?tag=${TAG_NEW}`}>
      <span>Mới</span> <span>-</span>{' '}
    </LinkComp>
  );

  const hasStoreVip = (isVip && isStore) || tags?.indexOf('DUREX') >= 0;
  const productName = isDeal && deal ? deal?.name : name;
  const justNew = isNew && !isVip;

  if (isGift) {
    return (
      <Wrapper>
        {hasStoreVip && <SellerVip />}
        <span>{productName}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {justNew && <NewLinkComp />}
      {hasStoreVip && <SellerVip />}
      <span>{productName}</span>
    </Wrapper>
  );
};

export default NameComponent;
