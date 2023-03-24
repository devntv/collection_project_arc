/* eslint-disable no-param-reassign */
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faGripfire } from '@fortawesome/free-brands-svg-icons';
import {
  faBaby,
  faBahai,
  faBirthdayCake,
  faBolt,
  faCloud,
  faFileInvoiceDollar,
  faGift,
  faHeart,
  faMedal,
  faMusic,
  faPlane,
  faPlus,
  faShippingFast,
  faSnowflake,
  faStar,
  faSun,
  faThumbsUp,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
import { gtag } from 'utils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './tag.module.css';

export const iconList = [
  {
    label: '✯ Ngôi sao',
    value: 'star',
    icon: faStar,
  },
  {
    label: '＋ Cộng',
    value: 'plus',
    icon: faPlus,
  },
  {
    label: '♫ Nốt nhạc',
    value: 'music',
    icon: faMusic,
  },
  {
    label: '❄ Tuyết',
    value: 'snowflake',
    icon: faSnowflake,
  },
  {
    label: '✈ Máy bay',
    value: 'plane',
    icon: faPlane,
  },
  {
    label: '❤ Trái tim',
    value: 'heart',
    icon: faHeart,
  },
  {
    label: 'ϟ Sét',
    value: 'bolt',
    icon: faBolt,
  },
  {
    label: '☀ Mặt trời',
    value: 'sun',
    icon: faSun,
  },
  {
    label: '☁ Mây',
    value: 'cloud',
    icon: faCloud,
  },
  {
    label: '♨ Lửa',
    value: 'fab gripfire',
    icon: faGripfire,
  },
  {
    label: 'Quà tặng',
    value: 'gift',
    icon: faGift,
  },
  {
    label: 'Giao nhanh',
    value: 'shipping-fast',
    icon: faShippingFast,
  },
  {
    label: 'Hóa đơn',
    value: 'file-invoice-dollar',
    icon: faFileInvoiceDollar,
  },
  {
    label: 'Bánh sinh nhật',
    value: 'birthday-cake',
    icon: faBirthdayCake,
  },
  {
    label: 'Huy chương',
    value: 'medal',
    icon: faMedal,
  },
  {
    label: 'Thích',
    value: 'thumbs-up',
    icon: faThumbsUp,
  },
  {
    label: 'Trẻ em',
    value: 'baby',
    icon: faBaby,
  },
  {
    label: 'Giọt nước',
    value: 'tint',
    icon: faTint,
  },
  {
    label: 'Bùng nổ',
    value: 'bahai',
    icon: faBahai,
  },
];

iconList.forEach((icon) => {
  library.add(icon.icon);
});

dom.watch();

const getUrlTag = ({ slug, url, code }) => {
  if (url) return url;
  if (slug) return `/tag/${slug}`;
  return `${PRODUCTS_LOADING_URL}?tag=${code}`;
};

export default function ProductTag({
  name,
  preIcon,
  Icon = null,
  nameAsTooltip,
  textColor,
  style,
  styleName,
  code,
  backgroundColor,
  date,
  isTooltip = false,
  url = null,
  borderColor,
  isStyleV2 = false,
  slug,
  link,
  isLinkTagDeal,
}) {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // // set cho mobile version 2
  // if (!isDesktop && beta) {
  //   return (
  //     <MobileProductTag
  //       style={{
  //         borderColor: borderColor || backgroundColor,
  //         color: textColor,
  //         backgroundColor,
  //         ...(style || {}),
  //       }}
  //       name={name}
  //       Icon={Icon}
  //       preIcon={preIcon}
  //     />
  //   );
  // }

  // parse preIcon
  if (preIcon) {
    if (typeof preIcon === 'string') {
      if (preIcon.indexOf(' ') > 0) {
        preIcon = preIcon.split(' ');
      }
    } else if (typeof preIcon === 'object' && preIcon.value) {
      preIcon = preIcon.value;
    }
  }
  // capitalize
  name = name
    ?.split(' ')
    ?.map((word) => (word.length > 1 ? word.charAt(0).toUpperCase() + word.substr(1) : word.toUpperCase()))
    ?.join(' ');

  if (isTooltip && (Icon || preIcon)) {
    const urlTag = getUrlTag({ code, url: code === 'DEAL' && isLinkTagDeal ? link : url, slug });

    return (
      <LinkComp stopProp removeStyles href={urlTag} data-test={`tags-${code}`}>
        <Tooltip title={name || ''}>
          <Grid
            style={{
              borderColor: borderColor || backgroundColor,
              color: textColor,
              backgroundColor,
              ...(style || {}),
            }}
            // className={isStyleV2 ? styles.tag_containerv2 : styles.icon_tag_container}
            className={clsx({
              [styles.icon_tag_container]: !isStyleV2,
              [styles.tag_containerv2]: isStyleV2,
              [styles.tag_container_mobilev2]: isMobileV2,
            })}
            onClick={() => {
              gtag.clickTagInProduct(name);
            }}
          >
            {Icon && Icon}
            {preIcon && <FontAwesomeIcon icon={preIcon} />}
          </Grid>
        </Tooltip>
      </LinkComp>
    );
  }

  // normal display
  if (!nameAsTooltip && name) {
    const urlTag = getUrlTag({ code, url: code === 'DEAL' && isLinkTagDeal ? link : url, slug });

    return (
      <LinkComp stopProp removeStyles href={urlTag} data-test={`tags-${code}`} prefetch={false}>
        <Grid
          style={{
            borderColor: borderColor || backgroundColor,
            color: textColor,
            backgroundColor,
            ...(style || {}),
          }}
          // className={clsx(isStyleV2 ? styles.tag_containerv2 : styles.tag_container, date ? styles.date_tag_container : styles.normal_tag_container)}
          className={clsx({
            [styles.tag_container]: !isStyleV2,
            [styles.tag_containerv2]: isStyleV2,
            [styles.normal_tag_container]: !date,
            [styles.date_tag_container]: date,
            [styles.tag_container_mobilev2]: isMobileV2,
          })}
          onClick={() => {
            gtag.clickTagInProduct(name);
          }}
        >
          {Icon && Icon}
          {preIcon && <FontAwesomeIcon icon={preIcon} />}
          <Typography
            className={clsx({
              [styles.nameTag]: true,
              [styles.nameTagMobileV2]: isMobileV2,
            })}
            style={{ ...(styleName || {}) }}
          >
            {name}
          </Typography>
        </Grid>
      </LinkComp>
    );
  }

  // quick order display
  return (
    <>
      {preIcon && name && (
        <Tooltip title={name}>
          <div
            style={{
              borderColor: borderColor || backgroundColor,
              color: textColor,
              backgroundColor,
              ...(style || {}),
            }}
            className={isStyleV2 ? styles.tag_containerv2 : styles.tag_container}
            data="no link"
          >
            {Icon && Icon}
            {preIcon && <FontAwesomeIcon icon={preIcon} />}
          </div>
        </Tooltip>
      )}
    </>
  );
}
