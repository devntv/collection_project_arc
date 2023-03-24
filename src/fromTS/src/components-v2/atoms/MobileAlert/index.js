import { Button, Drawer, Fab, FormControlLabel, Grid, IconButton, Radio, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import Close from '@material-ui/icons/Close';
import clsx from 'clsx';
import { CheckBox } from 'components/atoms';
import { palette } from 'constants/Colors';
import { SORT_PRODUCT, SORT_PRODUCT_NOT_LOGIN } from 'constants/data';
import {
  MOBILE_ICON_SORT_HOT_SALE,
  MOBILE_ICON_SORT_NAME_ASC,
  MOBILE_ICON_SORT_NAME_DESC,
  MOBILE_ICON_SORT_NEWEST,
  MOBILE_ICON_SORT_PRICE_ASC,
  MOBILE_ICON_SORT_PRICE_DESC,
} from 'constants/Images/mobile';
import { useSetting } from 'context';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { EnumFilterOption, FilterOptionList, MOBILE_EXTRA_CATEGORY } from './constants';

import styles from './styles.module.css';

const GreenRadioButton = (props) => {
  const { checked } = props;
  return (
    <Radio
      classes={{
        root: checked ? styles.mobileRadioButton : '',
      }}
      color="default"
      {...props}
    />
  );
};

const arrayIconSort = [
  MOBILE_ICON_SORT_HOT_SALE,
  MOBILE_ICON_SORT_NEWEST,
  MOBILE_ICON_SORT_PRICE_DESC,
  MOBILE_ICON_SORT_PRICE_ASC,
  MOBILE_ICON_SORT_NAME_ASC,
  MOBILE_ICON_SORT_NAME_DESC,
];

const MobileAlert = ({
  isOpen,
  handleClose,
  type = 'success' || 'warning' || '',
  title = '',
  subTitle = '',
  isSort = false,
  isFilter = false,
  sort,
  isAuthenticated = false,
  filterWithOption,
  drugOption,
  manufacturerOption,
  setFilterWithOption,
  setDrugOption,
  setManufacturerOption,
  tabsCategory = [],
  height, // default = unset
  tagOption,
  setTagOption,
  children,
  ...restProps
}) => {
  const router = useRouter();
  const { categories, topManufacturers } = useSetting();
  const { isAvailable, isShowHideAll = false, isMobileFilter = false } = restProps;

  const SORT_LIST = isAuthenticated
    ? SORT_PRODUCT.map((child, idx) => ({ ...child, icon: arrayIconSort[idx] }))
    : SORT_PRODUCT_NOT_LOGIN.map((child, idx) => ({ ...child, icon: arrayIconSort[idx] }));
  const CategoryDrugs = categories?.map((category) => ({ name: category.name, slug: category.slug, code: category.code }));
  const ManufacturersCategories =
    topManufacturers?.map((manufacture) => ({
      name: manufacture?.shortName || manufacture?.name || '',
      slug: manufacture?.slug,
      code: manufacture?.code,
    })) || [];
  const [optionSort, setOptionSort] = useState(SORT_LIST?.find((item) => item.value === sort) || SORT_LIST[0]);
  const [tabFilter, setTabFilter] = useState(FilterOptionList[0].pathName);

  useEffect(() => {
    if (sort) {
      setOptionSort(SORT_LIST?.find((item) => item.value === sort));
    }
  }, [sort]);

  const defaultOption = {
    name: '',
    ordinalNumber: '',
    slugTab: '',
    slug: '',
    code: '',
  };

  const [tempFilterWithOption, setTempFilterWithOption] = useState(filterWithOption);
  const [tempDrugOption, setTempDrugOption] = useState(drugOption);
  const [tempManufacturerOption, setTempManufacturerOption] = useState(manufacturerOption);
  const [tempTagOption, setTempTagOption] = useState(tagOption);
  const [tempHideOutStock, setTempOutStock] = useState(isAvailable);

  const handleReload = () => {
    window?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeCheckbox = (e, filterTab) => {
    const { value } = e.target;
    switch (filterTab) {
      case EnumFilterOption.NHOMTHUOC: {
        const optionChecked = CategoryDrugs?.find((option) => option.code === value);
        setTempDrugOption(optionChecked);
        break;
      }
      case EnumFilterOption.NHACUNGCAP: {
        const optionChecked = ManufacturersCategories?.find((option) => option.code === value);
        setTempManufacturerOption(optionChecked);
        break;
      }
      case EnumFilterOption.EXTRA_CATEGORY: {
        const optionChecked = MOBILE_EXTRA_CATEGORY.find((option) => option.code === value);
        setTempTagOption(optionChecked);
        break;
      }
      case EnumFilterOption.HIDE_ALL: {
        setTempOutStock(!tempHideOutStock);
        break;
      }
      default: {
        const optionChecked = tabsCategory?.find((option) => option.slug === value);
        setTempFilterWithOption(optionChecked);
        break;
      }
    }
  };

  const handleChangeSort = (value) => {
    router.replace({
      ...router,
      query: {
        ...router.query,
        sort: value || undefined,
      },
    });
    handleClose();
  };
  const handleApplyFilter = () => {
    // TODO: Should set default page when apply new filter
    setFilterWithOption(tempFilterWithOption);
    setDrugOption(tempDrugOption);
    setManufacturerOption(tempManufacturerOption);
    setTagOption(tempTagOption);
    delete router.query.page;
    router.replace({
      query: {
        ...router.query,
        currentTab: tempFilterWithOption?.slug,
        category: tempDrugOption?.code,
        manufacturer: tempManufacturerOption?.code,
        tag: tempTagOption?.code,
        isAvailable: tempHideOutStock,
      },
    });
    handleReload();
    handleClose();
  };

  const handleClearFilter = () => {
    // TODO:
    // When clear filter, will remove all filter option and close modal then refetch data
    // Only remove opt Filter and Sort. Keep search value
    setFilterWithOption(defaultOption);
    setDrugOption(defaultOption);
    setManufacturerOption(defaultOption);
    setTagOption(defaultOption);
    router.replace({
      query: {
        text: router.query.text,
        page: 1,
        sort: router.query.sort,
      },
    });
    handleReload();
    handleClose();
  };

  const handleCloseAlert = () => {
    setTempFilterWithOption(filterWithOption);
    setTempDrugOption(drugOption);
    setTempManufacturerOption(manufacturerOption);
    setTempTagOption(tagOption);
    setTempOutStock(isAvailable);
    handleClose();
  };

  const RenderFilterOption = () => {
    switch (tabFilter) {
      case EnumFilterOption.NHOMTHUOC: {
        return (
          <>
            {CategoryDrugs?.map((option) => (
              <Grid className={styles.optionFilter_container} key={`category-drug-${option.code}`} item xs={12} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value={option.code}
                    control={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <GreenRadioButton
                        checked={tempDrugOption.slug === option.slug}
                        value={option.code}
                        onChange={(e) => handleChangeCheckbox(e, EnumFilterOption.NHOMTHUOC)}
                      />
                    }
                    label={option.name}
                  />
                </div>
              </Grid>
            ))}
          </>
        );
      }
      case EnumFilterOption.NHACUNGCAP: {
        return (
          <>
            {ManufacturersCategories?.map((option) => (
              <Grid className={styles.optionFilter_container} key={`manufacturer-${option.code}`} item xs={12} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value={option.code}
                    control={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <GreenRadioButton
                        checked={tempManufacturerOption.code === option.code}
                        value={option.code}
                        onChange={(e) => handleChangeCheckbox(e, EnumFilterOption.NHACUNGCAP)}
                      />
                    }
                    label={option.name}
                  />
                </div>
              </Grid>
            ))}
          </>
        );
      }
      case EnumFilterOption.EXTRA_CATEGORY: {
        return (
          <>
            {MOBILE_EXTRA_CATEGORY.map((option) => (
              <Grid className={styles.optionFilter_container} key={`extra-category-${option.code}`} item xs={12} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value={option.code}
                    control={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <GreenRadioButton
                        checked={tempTagOption.code === option.code}
                        value={option.code}
                        onChange={(e) => handleChangeCheckbox(e, EnumFilterOption.EXTRA_CATEGORY)}
                      />
                    }
                    label={option.name}
                  />
                </div>
              </Grid>
            ))}
          </>
        );
      }
      default: {
        return (
          <>
            {tabsCategory?.map((option) => (
              <Grid className={styles.optionFilter_container} key={`tab-category-${option.value}`} item xs={12} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FormControlLabel
                    value={option.code}
                    control={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <GreenRadioButton
                        checked={tempFilterWithOption.value === option.value}
                        value={option.slug}
                        onChange={(e) => handleChangeCheckbox(e, EnumFilterOption.LOCTHEO)}
                      />
                    }
                    label={option.name}
                  />
                </div>
              </Grid>
            ))}
          </>
        );
      }
    }
  };
  const RenderAlertContent = () => {
    const RenderFilterTitle = (option) => {
      switch (option.pathName) {
        case EnumFilterOption.LOCTHEO: {
          if (tempFilterWithOption?.slug !== '') {
            return `${option.title} (${1})`;
          }
          return option.title;
        }
        case EnumFilterOption.NHOMTHUOC: {
          if (tempDrugOption?.code !== '') {
            return `${option.title} (${1})`;
          }
          return option.title;
        }
        case EnumFilterOption.EXTRA_CATEGORY: {
          if (tempTagOption?.code !== '') {
            return `${option.title} (${1})`;
          }
          return option.title;
        }
        default: {
          if (tempManufacturerOption?.code !== '') {
            return `${option.title} (${1})`;
          }
          return option.title;
        }
      }
    };
    if (isSort) {
      return (
        <div className={styles.mobileAlert_divContainer}>
          <div className={styles.alertSort_title}>{title}</div>
          <Grid container>
            {SORT_LIST?.map((option) => (
              <Grid
                onClick={() => handleChangeSort(option.value)}
                className={styles.optionSort_container}
                key={`sort-${option.value}`}
                item
                xs={12}
                sm={12}
              >
                <div className={styles.optionSort_title}>
                  <div className={styles.optionSort_title_content}>
                    <ImageFallbackStatic width={20} height={20} src={option.icon} alt={option.label} />
                    <Typography>{option.label}</Typography>
                  </div>
                  {optionSort.value === option.value && <Check style={{ color: palette.success.dark }} />}
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
    if (isFilter) {
      const indexActiveTag = FilterOptionList.findIndex((option) => option.pathName === tabFilter);
      return (
        <div style={{ height: height ? `${height}` : 'unset' }} className={styles.alertFilter_box}>
          <div className={styles.alertFilter_container}>
            <Typography className={styles.alertFilter_title}>{title}</Typography>
            <Typography className={clsx(styles.alertFilter_removeAll, !isMobileFilter && styles.btnHideAll_hidden)} onClick={handleClearFilter}>
              Xóa tất cả
            </Typography>
          </div>
          <Grid container item xs={12} className={clsx(!isShowHideAll && styles.btnHideAll_hidden)}>
            <div className={styles.mobileHideAll_container}>
              <CheckBox
                name="filter-out-of-stock"
                label="Ẩn Sản Phẩm Hết Hàng"
                onChange={(e) => handleChangeCheckbox(e, EnumFilterOption.HIDE_ALL)}
                isChecked={tempHideOutStock}
              />
            </div>
          </Grid>

          <div
            className={styles.filterSlide_tag}
            style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap', overflowX: 'scroll', width: 'auto', gap: '10px', display: 'flex' }}
          >
            {FilterOptionList &&
              FilterOptionList.map((item) => (
                <Grid key={`tabs-${item.id}`} onClick={() => setTabFilter(item.pathName)}>
                  <Fab
                    variant="extended"
                    aria-label="all"
                    className={clsx(FilterOptionList[indexActiveTag].pathName === item.pathName && styles.active, styles.filter_option)}
                  >
                    {RenderFilterTitle(item)}
                  </Fab>
                </Grid>
              ))}
          </div>

          <Grid style={{ maxHeight: '260px' }} container className={styles.filterWith_option}>
            <RenderFilterOption />
          </Grid>
        </div>
      );
    }
    return (
      <div className={styles.mobileAlert_divContainer}>
        {title !== '' && <div className={type === 'success' ? styles.alert_success_title : styles.alert_warning_title}>{title}</div>}
        {subTitle !== '' && <div className={styles.alert_subTitle}>{subTitle}</div>}
        <span>{children}</span>
      </div>
    );
  };

  useEffect(() => {
    if (filterWithOption && drugOption && manufacturerOption) {
      setTempFilterWithOption(filterWithOption);
      setTempDrugOption(drugOption);
      setTempManufacturerOption(manufacturerOption);
      setTempTagOption(tagOption);
    }
  }, [filterWithOption, drugOption, manufacturerOption, tagOption]);
  return (
    <>
      <Drawer
        ModalProps={{
          disableEscapeKeyDown: true,
        }}
        classes={{ paper: clsx(styles.alert_container_paper, height && styles.mobileAlert_heightDefault) }}
        anchor="bottom"
        open={isOpen}
        onClose={(_, reason) => {
          // TODO: prevent close when click outside
          if (reason !== 'backdropClick') {
            handleCloseAlert();
          }
        }}
      >
        <div style={{ margin: '15px 20px', display: 'flex', justifyContent: 'right' }}>
          <IconButton style={{ width: '12px ', height: '12px', padding: 0 }} onClick={handleCloseAlert}>
            <Close />
          </IconButton>
        </div>
        {RenderAlertContent()}
        {isFilter && (
          <div style={{ margin: '61px 15px 32px' }}>
            <Button className={styles.alertButton_action} onClick={() => handleApplyFilter()}>
              Áp Dụng
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default React.memo(MobileAlert);
