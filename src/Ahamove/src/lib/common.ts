import type { AxiosError } from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { Category, PostTag } from '@/api/cms/posts/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import type { FormatCategory, FormatPostTag } from 'types.d/post-format';
import { sendTelegramMessage } from './telegram';

export function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const formatNumber = (num = 0): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatCurrency = (num = 0): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  }).format(num);
};

function repeat(s: string, times: number): string {
  return new Array(times + 1).join(s);
}

export const pad = (num: number, maxLength: number): string => {
  return repeat('0', maxLength - num.toString().length) + num;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadJS = (src: string, attr?: { [key: string]: any }) => {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.setAttribute('src', src);
    tag.setAttribute('type', 'text/javascript');
    if (attr) {
      for (const key in attr) {
        tag.setAttribute(key, attr[key]);
      }
    }
    tag.onload = resolve;

    tag.onerror = reject;

    document.head.appendChild(tag);
  });
};

export const cleanAccents = (str: string): string => {
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // huyền, sắc, hỏi, ngã, nặng
  // eslint-disable-next-line no-misleading-character-class
  str = str.replace(/[\u02C6\u0306\u031B]/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uniqueArray = (arr: Array<any> = []) => {
  const uniqueIds = new Set();

  const unique = arr.filter((element) => {
    const isDuplicate = uniqueIds.has(element._id);
    uniqueIds.add(element._id);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });

  return unique;
};

export const generateLetterAvatar = (name = '') =>
  `${name.split(' ')[0] ? name.split(' ')[0][0] : ''}${
    name.split(' ')[1] ? name.split(' ')[1][0] : ''
  }`;

export const formatCategories = (
  categories: DefaultCmsDataResponse<Category>[]
) => {
  const postCategoriesData: FormatCategory[] = [];
  categories.map((item) => {
    postCategoriesData.push({
      id: item.id,
      name: item.attributes.name,
      slug: item.attributes.slug,
    });
  });
  return postCategoriesData;
};

export const formatPostTags = (tags: DefaultCmsDataResponse<PostTag>[]) => {
  const postTagsData: FormatPostTag[] = [];
  tags?.map((item) => {
    postTagsData.push({
      id: item.id,
      name: item.attributes.name,
      slug: item.attributes.slug,
    });
  });
  return postTagsData;
};

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    // If a regex pattern
    if (
      Object.prototype.toString.call(str).toLowerCase() === '[object regexp]'
    ) {
      return this.replace(str, `${newStr}`);
    }

    // If a string
    return this.replace(new RegExp(str, 'g'), `${newStr}`);
  };
}

export const formatPostStr = (str: string) => {
  let formattedStr = str;

  ['&#038;', '&#8221', '&#8220;', '&#8211;', '&#8217;'].forEach((key) => {
    formattedStr = formattedStr.replaceAll(key, '');
  });
  return formattedStr;
};

export const objectId = () => {
  const length = 16;
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const logger = (error: AxiosError) => {
  if (!error) return;

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const msg = `‼️ Error ${error.response?.status?.toString()} ${error.config?.method?.toUpperCase()} ${
    error.config?.url
  } - ${dayjs(new Date())
    .tz('Asia/Ho_Chi_Minh')
    .format('dddd, MMMM D, YYYY h:mm A')}`;

  console.log(msg);

  sendTelegramMessage(msg);
};
