import {
  BUSINESS_ICON,
  ICON_MOBILE_LOGO,
  MOBILE_DOUBLE_ARROW_RIGHT,
  MOBILE_ICON_ALERT_SUCCESS,
  MOBILE_ICON_ALERT_WARNING,
  MOBILE_ICON_AVATAR_CS,
  MOBILE_ICON_BACK,
  MOBILE_ICON_CART,
  MOBILE_ICON_CHAT,
  MOBILE_ICON_COUPON,
  MOBILE_ICON_DISCOVERY,
  MOBILE_ICON_EMPTY_CHAT,
  MOBILE_ICON_FILTER,
  MOBILE_ICON_HOME,
  MOBILE_ICON_RANK_DIAMOND,
  MOBILE_ICON_RANK_GOLD,
  MOBILE_ICON_RANK_PLATIUM,
  MOBILE_ICON_RANK_SILVER,
  MOBILE_ICON_SEARCH,
  MOBILE_ICON_SEARCH_WHITE,
  MOBILE_ICON_SENDING,
  MOBILE_ICON_SENT,
  MOBILE_ICON_SLIDE_ARROW_LEFT,
  MOBILE_ICON_SLIDE_ARROW_RIGHT,
  MOBILE_ICON_SORT,
  MOBILE_ICON_STORE,
  MOBILE_ICON_TS_POINT,
  MOBILE_ICON_WALLET,
} from 'constants/Images/mobile';
import Image from 'next/image';
// TODO: refactor contanst
import { memo } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';

export const SEARCH_ICON = '/icons/mobile/search_icon.svg';
export const MOBILE_LOGO = memo(() => <ImageFallbackStatic src={ICON_MOBILE_LOGO} width={50} height={50} priority />);
export const ICON_MOBILE_ICON_CART = memo(() => <ImageFallbackStatic src={MOBILE_ICON_CART} width={50} height={50} priority />);
export const ICON_MOBILE_ICON_DISCOVERY = memo(() => <ImageFallbackStatic src={MOBILE_ICON_DISCOVERY} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_STORE = memo(() => <ImageFallbackStatic src={MOBILE_ICON_STORE} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_HOME = memo(() => <ImageFallbackStatic src={MOBILE_ICON_HOME} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_COUPON = memo(() => <ImageFallbackStatic src={MOBILE_ICON_COUPON} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_BACK = memo(({ width = 24, height = 24 }) => (
  <ImageFallbackStatic src={MOBILE_ICON_BACK} width={width} height={height} priority />
));
export const ICON_MOBILE_ICON_SEARCH = memo(() => <ImageFallbackStatic src={MOBILE_ICON_SEARCH} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_DIAMOND = memo(() => <ImageFallbackStatic src={MOBILE_ICON_RANK_DIAMOND} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_GOLD = memo(() => <ImageFallbackStatic src={MOBILE_ICON_RANK_GOLD} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_PLATIUM = memo(() => <ImageFallbackStatic src={MOBILE_ICON_RANK_PLATIUM} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_SILVER = memo(() => <ImageFallbackStatic src={MOBILE_ICON_RANK_SILVER} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_TS_POINT = memo(() => <ImageFallbackStatic src={MOBILE_ICON_TS_POINT} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_WALLET = memo(() => <ImageFallbackStatic src={MOBILE_ICON_WALLET} width={24} height={24} priority />);
export const ICON_MOBILE_BUSINESS_ICON = memo(() => <ImageFallbackStatic src={BUSINESS_ICON} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_SEARCH_WHITE = memo(() => <ImageFallbackStatic src={MOBILE_ICON_SEARCH_WHITE} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_SORT = memo(() => <ImageFallbackStatic src={MOBILE_ICON_SORT} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_FILTER = memo(() => <ImageFallbackStatic src={MOBILE_ICON_FILTER} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_ALERT_WARNING = memo(() => <ImageFallbackStatic src={MOBILE_ICON_ALERT_WARNING} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_ALERT_SUCCESS = memo(() => <ImageFallbackStatic src={MOBILE_ICON_ALERT_SUCCESS} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_DOUBLE_ARROW_RIGHT = memo(() => <ImageFallbackStatic src={MOBILE_DOUBLE_ARROW_RIGHT} width={12} height={9} priority />);
export const ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT = memo(() => (
  <ImageFallbackStatic src={MOBILE_ICON_SLIDE_ARROW_RIGHT} width={12} height={12} priority />
));
export const ICON_MOBILE_ICON_SLIDE_ARROW_LEFT = memo(() => (
  <ImageFallbackStatic src={MOBILE_ICON_SLIDE_ARROW_LEFT} width={12} height={12} priority />
));

export const ICON_MOBILE_AVATAR_CS = memo(() => <Image src={MOBILE_ICON_AVATAR_CS} width={40} height={40} priority />);
export const ICON_MOBILE_ICON_CHAT = memo(() => <Image src={MOBILE_ICON_CHAT} width={44} height={44} priority />);
export const ICON_MOBILE_ICON_EMPTY_CHAT = memo(() => <Image src={MOBILE_ICON_EMPTY_CHAT} width={250} height={183} priority />);
export const ICON_MOBILE_ICON_SENT = memo(() => <Image src={MOBILE_ICON_SENT} width={13} height={13} priority />);
export const ICON_MOBILE_ICON_SENDING = memo(() => <Image src={MOBILE_ICON_SENDING} width={13} height={13} priority />);
