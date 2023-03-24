import ProductCardNew from 'components/mocules/ProductCardNew';
// styleContainer, isCampaignPage = false, ...propsProduct

// comment card mới -> sử dụng card cũ (restyle theo mobile v2)

function ProductCardVertical({ styleContainer, isCampaignPage = false, isHalfProgress = false, ...propsProduct }) {
  // const { getNameSeller } = useSetting();
  // const sellerInfo = getNameSeller({
  //   seller: propsProduct?.seller,
  //   tags: propsProduct?.tags,
  // });
  // const flagshipStore = getHardcodeStoreByTagList(propsProduct?.tags);

  // const { isCampaign, isHappeningCampaign, productType, percentDealSold, campaign, displayPrice } = propsProduct;
  // // handle label hợp đồng/deal
  // let labelName;
  // if (propsProduct?.isContractPrice) {
  //   labelName = 'Giá Hợp Đồng';
  // }
  // if (propsProduct?.discountPercent) {
  //   labelName = `-${propsProduct?.discountPercent}%`;
  // }

  // function OrderMaximumProduct() {
  //   if (
  //     (isCampaign && isHappeningCampaign && percentDealSold < 100) ||
  //     (isCampaign && productType === 'MEGA_DAY' && isHappeningCampaign && percentDealSold < 100)
  //   ) {
  //     return <Typography>{/* Đặt tối đa {formatNumber(availableProducts)} {unit || 'sản phẩm'} với giá khuyến mãi */}</Typography>;
  //   }
  //   if (isHappeningCampaign && percentDealSold === 100 && isCampaignPage) {
  //     return <Typography className={styles.errorMessage}>Bạn đã bỏ lỡ giá khuyến mãi {formatCurrency(campaign?.retailPriceValue) || ''}</Typography>;
  //   }
  //   if (isHappeningCampaign && productType === 'NORMAL' && percentDealSold === 100 && isCampaignPage) {
  //     return <Typography className={styles.errorMessage}>Bạn đã bỏ lỡ giá khuyến mãi {formatCurrency(displayPrice) || ''}</Typography>;
  //   }

  //   return (
  //     <div className={styles.text_danger} styles={{ height: '18px' }}>
  //       {' '}
  //     </div>
  //   );
  // }

  // return (
  //   <LinkComp href={`product/${propsProduct?.slug || ''}/loading`} className={styles.root} style={styleContainer}>
  //     <div className={styles.imgWrapper}>
  //       <ImageFallbackProductImage
  //         className={styles.image}
  //         fallbackSrc={propsProduct?.imagesProxy?.length >= 1 ? propsProduct?.imagesProxy[0] : MISSING_IMAGE}
  //         src={propsProduct?.imagesProxy?.length >= 1 ? `${propsProduct?.imagesProxy[0]}` : MISSING_IMAGE}
  //         width={150}
  //         height={100}
  //         loading="lazy"
  //         title={propsProduct?.name && propsProduct?.name}
  //       />
  //     </div>
  //     <div className={styles.wrapperContent}>
  //       <div style={{ height: '20px' }}>
  //         {propsProduct?.point > 0 && (
  //           <div>
  //             <strong style={{ color: '#0E1983', fontSize: '12px' }}>+{propsProduct?.point}</strong>
  //             <span style={{ margin: '0px 5px', color: '#0E1983', fontSize: '10px' }}>Điểm Tích Lũy</span>
  //             {propsProduct?.pointMultiplier > 1 && <strong className={styles.productCardMultiple}>x{propsProduct?.pointMultiplier}</strong>}
  //           </div>
  //         )}
  //       </div>
  //       <NameComponent propsProduct={propsProduct} sellerInfo={sellerInfo} />
  //       <div className={styles.productVolume}>{propsProduct?.volume}</div>
  //       <div className={styles.alignCenter}>
  //         {flagshipStore ? (
  //           <Tooltip title={flagshipStore?.name}>
  //             <LinkComp className={styles.wrapperSeller} href={flagshipStore?.url}>
  //               <div style={{ flexShrink: 0, display: 'flex' }}>
  //                 <ImageFallback src={SELLER_ICON} />
  //               </div>
  //               <span className={styles.storeName}>{flagshipStore?.name}</span>
  //             </LinkComp>
  //           </Tooltip>
  //         ) : (
  //           sellerInfo?.sellerName && (
  //             <Tooltip title={sellerInfo?.sellerName}>
  //               <LinkComp className={styles.wrapperSeller} href={sellerInfo?.linkStore}>
  //                 <div style={{ flexShrink: 0, display: 'flex' }}>
  //                   <ImageFallback src={SELLER_ICON} />
  //                 </div>
  //                 <span className={styles.storeName}>{sellerInfo?.sellerName}</span>
  //               </LinkComp>
  //             </Tooltip>
  //           )
  //         )}
  //       </div>
  //       <div
  //         role="button"
  //         tabIndex={-1}
  //         className={styles.tagSection}
  //         onClick={(e) => {
  //           e.preventDefault();
  //         }}
  //         onKeyDown={(e) => {
  //           e.preventDefault();
  //         }}
  //       >
  //         <TagComponent
  //           product={{ tags: propsProduct?.tags, statusData: propsProduct?.statusData }}
  //           isMobile
  //           isProductCard
  //           isGift={propsProduct?.isGift}
  //         />
  //       </div>

  //       <CountDownSellout propsProduct={propsProduct} />
  //       {/* khi sku đang bị lỗi */}
  //     </div>
  //     {propsProduct?.errorMessageProduct ? (
  //       <Typography className={styles.errorMessage} style={{ padding: '0px 13.5px' }}>
  //         {propsProduct?.errorMessageProduct || propsProduct?.errorMessage || 'Đang cập nhật giá'}
  //       </Typography>
  //     ) : (
  //       <div className={styles.wrapperTextPrice}>
  //         {OrderMaximumProduct()}
  //         <PriceComponent propsProduct={propsProduct} />

  //         {productType === 'FLASH_SALE' ? (
  //           <div className="lineLimit2" style={{ minHeight: '34px' }} />
  //         ) : (
  //           <div className="lineLimit2" style={{ minHeight: '34px' }}>
  //             {propsProduct?.messageLimitOrder && <small>{propsProduct?.messageLimitOrder}</small>}
  //           </div>
  //         )}

  //         <div className={styles.addWishlist}>
  //           <WishListAction propsProduct={propsProduct} />
  //         </div>
  //         {labelName && (
  //           <div
  //             className={clsx({
  //               [styles.discount]: true,
  //               [styles.contractStyles]: propsProduct?.isContractPrice,
  //             })}
  //           >
  //             {labelName}
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </LinkComp>
  // );
  return <ProductCardNew product={propsProduct} isMobile isHalfProgress={isHalfProgress} isCampaignPage={isCampaignPage} />;
}

export default ProductCardVertical;
