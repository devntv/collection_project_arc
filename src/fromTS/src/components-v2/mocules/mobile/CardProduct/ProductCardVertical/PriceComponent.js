import styles from './styles.module.css';

/*
  RULES 
  1. isSellerList
  2. isCampaign && percentDealSold < 100
    + ((productType === 'FLASH_SALES' && isHappeningCampaign) || productType === 'MEGA_DAY') && percentDealSold < 100
      || (!isHappeningCampaign &&  !isCampaignPage) => displayPriceFormated
    + ((productType === 'FLASH_SALES' && isHappeningCampaign) || productType === 'MEGA_DAY') && percentDealSold === 100 => salePriceFormatted
    + !isHappeningCampaign && isCampaignPage => `${hiddenPrice}`đ
    + !isHappeningCampaign && isCampaignPage && displayPrice => displayPriceFormatted
    + isHappeningCampaign && salePrice && percentDealSold < 100 => salePriceFormatted
  3. isDeal && deal 
    + => displayPriceFormated
    + => salePriceFormated
  4. else   
    + => displayPriceFormated
    + isDeal && deal => salePriceFormated
*/

const isCampaignPage = true;

const PriceComponent = ({ propsProduct }) => {
  const {
    isCampaign,
    percentDealSold,
    isHappeningCampaign,
    salePriceFormated,
    displayPriceFormated,
    displayPrice,
    salePrice,
    productType,
    campaign,
    deal,
    isDeal,
    errorMessageProduct,
  } = propsProduct;
  const isHappening = (productType === 'FLASH_SALE' && isHappeningCampaign) || productType === 'MEGA_DAY';
  const campaignPage = !isHappeningCampaign && isCampaignPage;

  const Wrapper = ({ children }) => <div className={styles.priceSection}>{children}</div>;

  let hiddenPrice = campaign?.salePriceLabel;
  if (isCampaign && campaign?.isValid === false) {
    const lengthSalePriceLabel = campaign?.salePriceLabel?.length;
    if (lengthSalePriceLabel > 3)
      hiddenPrice = `${campaign?.salePriceLabel?.slice(0, lengthSalePriceLabel - 3)}.${campaign?.salePriceLabel?.slice(lengthSalePriceLabel - 3)}`;
  }

  // nếu có lỗi sku

  if (errorMessageProduct) {
    return <Wrapper />;
  }

  if (isCampaign && percentDealSold < 100) {
    return (
      <Wrapper>
        {((isHappening && percentDealSold < 100) || (!isHappeningCampaign && !isCampaignPage)) && (
          <strong className={styles.productPrice}>{displayPriceFormated}</strong>
        )}
        {isHappening && percentDealSold === 100 && <strong className={styles.productPrice}>{salePriceFormated}</strong>}
        {campaignPage && <strong className={styles.productPrice}>{`${hiddenPrice}đ`}</strong>}
        {campaignPage && displayPrice && <span className={styles.productPriceSale}>{displayPriceFormated}</span>}
        {isHappeningCampaign && salePrice && percentDealSold < 100 && <span className={styles.productPriceSale}>{salePriceFormated}</span>}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <strong className={styles.productPrice}>{displayPriceFormated}</strong>
      {isDeal && deal && <span className={styles.productPriceSale}>{salePriceFormated}</span>}
    </Wrapper>
  );
};

export default PriceComponent;
