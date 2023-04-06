export const __prod__ = process.env.NODE_ENV === 'production';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;

export const apiGoshopUrl = process.env.NEXT_PUBLIC_GOSHOP_API_URI;
export const isStaging = process.env.NEXT_PUBLIC_IS_STAGING === 'true';
export const baseUrl = process.env.NEXT_PUBLIC_APP_URI || 'https://ahamove.com';
export const domainUrl = process.env.NEXT_PUBLIC_APP_DOMAIN || 'ahamove.com';

export const PAGE_INDEX = 0;
export const PAGE_SIZE = 24;
export const MIN_PAGE_SIZE = 10;

export const API_FETCH_TIMEOUT = 7;

export const DEFAULT_CATEGORY_ID = '-1';

export const FACEBOOK_SHARE_URL =
  'https://www.facebook.com/sharer/sharer.php?u=';
export const LINKED_SHARE_URL =
  'https://www.linkedin.com/shareArticle?mini=true&url=';
export const TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet?url=';

export const URL_PATTERN = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(:\\d+)?(\\/[-\\w%.~+]*)*' + // port and path
    '(\\?[;&\\w%.~+=-]*)?' + // query string
    '(#[-\\w]*)?$',
  'i'
);

export const TELEGRAM_DEPLOY_CHAT_ID = '-738422370';
export const TELEGRAM_BOT_TOKEN =
  '6191423287:AAHPeKe2bri8ROcilM7FBRZsMhdk-Mce_s4';
