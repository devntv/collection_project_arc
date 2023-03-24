/* eslint-disable no-param-reassign */
import { getData, getFirst } from 'clients';
import { listMessage, postListScrollDown, postOne } from 'clients/ChatClient';
import { tagList } from 'constants/data/mobile';
import { DateTimeUtils } from 'utils';
import { TABS } from './constants';
import conversationStyles from './styles.module.css';

export const DEAL_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const groupChatByDate = (chatMessages = [], isGuest) => {
  const CS_TO_ME = isGuest ? 'CS_TO_GUEST' : 'CS_TO_CUSTOMER';
  const ME_TO_CS = isGuest ? 'GUEST_TO_CS' : 'CUSTOMER_TO_CS';
  const sortTime = chatMessages.sort((objA, objB) => Number(new Date(objB.createdTime)) - Number(new Date(objA.createdTime)));

  const groups = sortTime.reduce((group, mess) => {
    const createdTime = DateTimeUtils.getFormattedDate(new Date(mess?.createdTime), 'DD/MM/YYYY');

    if (!group[createdTime]) {
      group[createdTime] = [];
    }
    group[createdTime].push(mess);
    return group;
  }, {});

  const findLatestCSMessage = (arr) => {
    const arrLatest = [];

    if (arr.length === 0) return [];

    for (let i = 0; i < arr.length; i += 1) {
      if (i === arr.length - 1 && arr[i].messageType === CS_TO_ME) {
        arrLatest.push(arr[i].messageID);
      } else if (arr[i].messageType === CS_TO_ME && arr[i].messageType !== arr[i + 1].messageType) {
        arrLatest.push(arr[i].messageID);
      }
    }
    return arrLatest;
  };

  const latestMonth = Object.keys(groups)[0];
  const findShowSent = (arr) => {
    const arrShowSent = [];
    if (arr.length === 0) return [];
    const latestMess = arr[0];
    if (latestMess.messageType === ME_TO_CS) {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].messageID === latestMess.messageID) {
          arrShowSent.push(arr[i].messageID);
        }
      }
    }
    return arrShowSent;
  };
  const getPrevDate = (key, arr) => {
    if (arr.length === 0) return '';
    const values = Object.values(arr);
    let index = values.indexOf(key);
    if (index > 0) {
      index -= 1;
    } else {
      return '';
    }
    return values[index];
  };

  const groupArrays = Object.keys(groups).map((date) => ({
    date,
    mess: groups[date],
    messShowIcon: findLatestCSMessage(groups[date]),
    messShowSent: findShowSent(groups[latestMonth]),
    prevDate: getPrevDate(date, groups),
  }));
  const getListDate = groupArrays.map((item) => item.date);
  return groupArrays.map((child) => ({ ...child, prevDate: getPrevDate(child.date, getListDate) }));
};

const isInUseDeal = (deal) => {
  const d = new Date();
  if (deal && deal.canUse) {
    return deal.canUse;
  }
  if (!deal.endTime) {
    return false;
  }
  const end = new Date(deal.endTime);
  if (!deal.readyTime && !deal.startTime) {
    return false;
  }
  const ready = new Date(deal.readyTime || deal.startTime);
  return deal.status === DEAL_STATUS.ACTIVE && d.getTime() <= end.getTime() && d.getTime() >= ready.getTime();
};
const findDiscountPercent = (salePrice, displayPrice) => {
  if (salePrice === displayPrice || displayPrice > salePrice) return 0;
  let percentDiscountProduct = ((salePrice - displayPrice) / salePrice) * 100;
  if (percentDiscountProduct > 100) percentDiscountProduct = 100;
  return Math.floor(percentDiscountProduct);
};

export const handleProductPrice = (product) => {
  const price = {};
  if (product.sku) {
    price.originalPrice = product.sku.retailPriceValue || product.sku.purchasePrice || product.sku.rawPrice;
  } else if (product.skuItem) {
    price.originalPrice = product.skuItem.retailPriceValue || product.skuItem.purchasePrice || product.skuItem.rawPrice;
  } else {
    price.originalPrice = 0;
  }
  price.currentPrice = price.originalPrice;
  price.percentageDiscount = 0;
  if (product.campaign && product.campaign.isActive && product.campaign.isValid) {
    price.originalPrice = product.campaign.price;
    price.currentPrice = product.campaign.retailPriceValue;
    // price.percentageDiscount = product.campaign.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
  }
  if (product.deal && isInUseDeal(product.deal)) {
    price.currentPrice = product.deal.price;
    if (product.deal.name) {
      product.product.name = product.deal.name;
    }
    if (product.deal.imageUrls && product.deal.imageUrls.length) {
      product.product.imageUrls = product.deal.imageUrls;
    }
  }
  price.percentageDiscount = findDiscountPercent(price.originalPrice, price.currentPrice);
  return price;
};

export const handleSellerInfo = (sellerInfo) => {
  if (sellerInfo) {
    return {
      name: sellerInfo.name || '',
      code: sellerInfo.code,
      sellerType: sellerInfo.sellerType,
      sellerClass: sellerInfo.sellerClass,
      sellerID: sellerInfo.sellerID,
    };
  }
  return {
    name: '',
    code: '',
    sellerType: '',
    sellerClass: '',
    sellerID: 0,
  };
};

export const handleSkuInfo = (item) => {
  if (!item) {
    return {
      name: '',
      productID: '',
      sku: '',
      price: {
        originalPrice: -1, // Giá gốc
        currentPrice: -1, // Giá sau giảm giá
        percentageDiscount: -1, // Phần trăm giảm giá
      },
      nextPrice: -1, // Giá khi thăng hạng
      tagTime: new Date(),
      tags: [], // danh sách tag của sản phẩm,
      amountInCart: -1, // Số lượng trong giỏ hàng
      volume: '', // Cách thức đóng gói
      manufacturer: '', // Nhà sản xuất
      seller: '', // Nhà bán hàng,
      slug: '',
      imageUrls: [],
      productCode: '',
      lotDates: [],
      status: '',
      type: '',
      statusData: {},
    };
  }
  const { product, skuItem, displayPrice, moreInfo, nextPriceLevel, deal, campaign } = item;
  const sellerInfo = skuItem?.sellerInfo || {};
  return {
    name: product.name,
    productID: product.productID,
    sku: skuItem?.sku,
    price: {
      originalPrice: displayPrice ? displayPrice.originalPrice : 0, // Giá gốc
      currentPrice: displayPrice ? displayPrice.currentPrice : 0, // Giá sau giảm giá
      percentageDiscount: displayPrice ? displayPrice.percentageDiscount : 0, // Phần trăm giảm giá
    },
    nextPrice: nextPriceLevel ? nextPriceLevel.price || 0 : 0, // Giá khi thăng hạng
    tagTime: new Date(),
    tags: skuItem?.tags, // danh sách tag của sản phẩm,
    amountInCart: moreInfo?.amountInCart || -1, // Số lượng trong giỏ hàng
    volume: product.volume, // Cách thức đóng gói
    manufacturer: moreInfo?.manufacturer, // Nhà sản xuất
    seller: moreInfo?.seller, // Nhà bán hàng,
    slug: skuItem?.slug || product.slug,
    imageUrls: product.imageUrls,
    productCode: product.code,
    sellerInfo: handleSellerInfo(sellerInfo),
    lotDates: skuItem?.lotDates,
    status: skuItem?.status || '',
    type: skuItem?.type || '',
    statusData: skuItem?.statusData,
    ...(campaign && { campaignCode: campaign.campaignCode }),
    ...(deal && { dealCode: deal.code }),
    ...(campaign && { campaign }),
    ...(deal && { deal }),
    isActive: skuItem?.isActive,
  };
};
export const startTagMenuCommandAt = (text) => {
  const n = tagList.length;
  for (let index = -1; index < text.length; index += 1) {
    index = text.indexOf('@', index + 1);
    if (index < 0) {
      return -1;
    }

    const sub = text.substring(index);
    for (let i = 0; i < n; i += 1) {
      if (index >= 0 && tagList[i].code.includes(sub.toUpperCase())) {
        return index;
      }
    }
  }
  return -1;
};
export const searchTagCode = (str) => {
  const result = [];
  tagList.forEach((tag) => {
    if (tag.code.includes(str.toUpperCase())) {
      result.push(tag);
    }
  });
  return result;
};
export const startTagAt = (text, tag = '') => {
  if (tag.length > 0) {
    let index = text.indexOf(tag);
    index = index >= 0 ? index : text.indexOf(tag.toLowerCase());
    return {
      start: index,
      tag,
    };
  }
  const n = tagList.length;
  let first = text.length;
  let resultTag = null;
  for (let i = 0; i < n; i += 1) {
    let index = text.indexOf(tagList[i].code);
    index = index >= 0 ? index : text.indexOf(tagList[i].code.toLowerCase());
    if (index >= 0 && index < first) {
      first = index;
      resultTag = tagList[i];
    }
  }
  if (first === text.length || first < 0) {
    return null;
  }
  return {
    start: first,
    tag: resultTag.code,
  };
};

export const splitTextMessage = (string) => string.split(/\r?\n/).filter((item) => item);

export const isStartTag = (text) => {
  const n = tagList.length;
  let first = text.length;
  let j = -1;
  for (let i = 0; i < n; i += 1) {
    // let index = text.indexOf(tagList[i].code);
    const index = text.toLowerCase().indexOf(tagList[i].code.toLowerCase());
    if (index >= 0 && index < first) {
      first = index;
      j = i;
    }
  }
  if (first < text.length && j >= 0) {
    return tagList[j];
  }
  return null;
};

export const scrollToMessage = async (chatMessages, setChatMessages, messageID, setTab, conversationID) => {
  const isExistMessage = chatMessages.some((message) => message.messageID === messageID);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const moveAndTick = async () => {
    let messageElement;
    while (!messageElement) {
      messageElement = document?.querySelector(`#message-${messageID}`);
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }

    messageElement?.scrollIntoView({ block: 'center' });
    messageElement?.classList.add(conversationStyles.listMessage_module_message_animation);
  };

  setTab(TABS.chat);
  // the message had already loaded in the chat
  if (isExistMessage) {
    moveAndTick();
    return;
  }

  // the message hasn't loaded in the chat
  const [infoCurrentMes, resListMessage, resListScrollDown] = await Promise.all([
    postOne(messageID),
    listMessage({ ctx: '', conversationID, lastMessageID: messageID }),
    postListScrollDown({ conversationID, lastMessageID: messageID }),
  ]);
  const currentMesData = getFirst(infoCurrentMes, {}); // get current mess
  const preMess = getData(resListMessage, []); // previous messages
  const bottomMess = getData(resListScrollDown, []); // following message

  setChatMessages([...preMess, currentMesData, ...bottomMess]);
  moveAndTick();
};

export default {
  groupChatByDate,
  handleProductPrice,
  scrollToMessage,
};
