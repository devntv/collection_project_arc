/* eslint-disable react/no-danger */
import { Button, Collapse, Divider, Tab, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { MISSING_IMAGE } from 'constants/Images';
import { INGREDIENT } from 'constants/Paths';
import { useSetting } from 'context';
import { useEffect, useRef, useState } from 'react';
import { formatNumber } from 'utils/FormatNumber';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import useMobileV2 from 'zustand-lib/storeMobile';
import ManufacturerInfo from '../ManufacturerInfo';
import TagType from '../TagType';
import styles from './styles.module.css';

export default function ProductDetailTabsV2({ data, product, handleChange, value, ingredients = [], coutriesName, comboList, files }) {
  const { manufacturerCode } = product || {};
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);
  });

  const { description = {} } = product || {};
  const tabData = data?.filter((item) => item.value === value)[0] || {};
  const des = description && description[tabData.code] !== '' ? description[tabData.code] : '';
  const { mapIngredients = null } = useSetting();
  const [seeMore, setSeeMore] = useState(false);

  const ingredientEle =
    ingredients &&
    ingredients?.map(({ ingredientCode, volume: ingredientVolume }) => {
      const { slug, name: ingredientName = '' } = mapIngredients?.get(ingredientCode) || {};
      return (
        <div key={uuidv4()} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <LinkComp className={styles.ingredient} href={`${INGREDIENT}/${slug}`}>
              {ingredientName}
            </LinkComp>
          </div>
          <div>{ingredientVolume}</div>
        </div>
      );
    });

  return (
    <div className={styles.root}>
      <TabContext value={value}>
        <div>
          <TabList
            TabIndicatorProps={{ className: styles.indicator }}
            onChange={handleChange}
            aria-label="product details tabs"
            variant="scrollable"
            className={styles.tabs}
          >
            {data.map((item) => (
              <Tab
                key={uuidv4()}
                classes={{
                  root: styles.tab,
                }}
                label={item.label}
                value={item.value}
              />
            ))}
          </TabList>
        </div>

        <TabPanel
          className={clsx(styles.tab_panel, {
            [styles.tab_panel_mv2]: isMobileV2,
          })}
          value={tabData?.value}
          key={uuidv4()}
        >
          {tabData?.value === '1' && (
            <div>
              <Collapse in={seeMore} collapsedSize="130px">
                <div ref={ref}>
                  {comboList.length > 0 && (
                    <div style={{ marginBottom: '1.2rem' }}>
                      <Typography style={{ marginBottom: '5px', fontSize: 16, color: '#292929', fontWeight: 'bold' }}>Mua combo gồm: </Typography>
                      {comboList.map((item) => {
                        const { nameNormal, slug, isGift, tags, quantity = 0, salePriceFormated } = item;
                        return (
                          <div key={uuidv4()} style={{ display: 'flex', marginBottom: '5px' }}>
                            <div
                              style={{
                                border: '1px solid #E3E3E3',
                                borderRadius: '8px',
                                marginRight: '8px',
                                width: '43px',
                                height: '43px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <ImageFallbackProductImage
                                src={item?.originalImages?.length > 0 ? item?.originalImages[0] : MISSING_IMAGE} // lay hinh goc, ko lay hinh
                                fallbackSrc={item?.originalImages[0]}
                                width={35}
                                height={35}
                                alt=""
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <div>
                              <div>
                                {isGift ? (
                                  <Typography className={styles.cb_link}>{nameNormal} </Typography>
                                ) : (
                                  <LinkComp className={styles.cb_link} href={`/product/${slug}`} prefetch={false}>
                                    {nameNormal}
                                  </LinkComp>
                                )}
                                <div className={styles.product_tags}>
                                  {tags && tags.filter((tag) => tag === 'HOADONNHANH')?.map((tag) => <TagType key={uuidv4()} item={tag} />)}
                                </div>
                              </div>
                              <Typography style={{ fontSize: '12px', paddingLeft: '5px' }}>
                                {isGift ? 'Quà tặng' : salePriceFormated} x{formatNumber(quantity)}
                              </Typography>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {files.length > 0 && (
                    <div key={uuidv4()} style={{ marginBottom: '1.2rem' }}>
                      <Typography style={{ marginBottom: '5px', fontSize: 16, color: '#292929', fontWeight: 'bold' }}>Hồ sơ sản phẩm: </Typography>
                      {files.map(({ fileName, link }) => (
                        <div key={uuidv4()}>
                          <Typography style={{ color: '#0E1983', fontSize: '14px' }}>
                            <a target="_blank" href={link} rel="noreferrer">
                              {fileName}
                            </a>
                          </Typography>
                        </div>
                      ))}
                    </div>
                  )}
                  {manufacturerCode && <ManufacturerInfo code={manufacturerCode} />}

                  {coutriesName && (
                    <div className={styles.warpper}>
                      <Typography
                        className={clsx(styles.manufactureInfo, {
                          [styles.manufactureInfo_mv2]: isMobileV2,
                        })}
                      >
                        Nước sản xuất
                      </Typography>
                      <Typography className={styles.manufactureInfoLink}>{coutriesName}</Typography>
                    </div>
                  )}
                  {des && (
                    <>
                      <Typography
                        className={clsx(styles.manufactureInfo, {
                          [styles.manufactureInfo_mv2]: isMobileV2,
                        })}
                      >
                        Thông tin{' '}
                      </Typography>
                      <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{
                          __html: des,
                        }}
                      />
                    </>
                  )}
                </div>
              </Collapse>
              <div className={styles.warpperIcon}>
                {height > 120 && (
                  <Button endIcon={seeMore ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={() => setSeeMore(!seeMore)}>
                    {seeMore ? 'Ẩn' : 'Xem thêm'}
                  </Button>
                )}
              </div>
            </div>
          )}

          {tabData?.value === '2' && (
            <div className={styles.ingredientList}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <Typography>Thành phần</Typography>
                <Typography>Hàm lượng</Typography>
              </div>
              <Divider />
              <div style={{ minHeight: 20, marginTop: 10 }}>{ingredientEle}</div>
            </div>
          )}
          {tabData?.value !== '2' && tabData?.value !== '1' && des && (
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: des,
              }}
            />
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
}
