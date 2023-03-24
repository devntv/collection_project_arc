/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */

import {
  ADD_GUEST,
  CONFIG,
  CUSTOMER_TO_CS,
  DATE,
  DATE_GUEST,
  FILE_RESUMABLE,
  FILE_RESUMABLE_GUEST,
  GUEST_TO_CS,
  LIST_FILE,
  LIST_FILE_GUEST,
  LIST_FOR_CUSTOMER,
  LIST_FOR_GUEST,
  LIST_LINK,
  LIST_MESSAGE,
  LIST_SCROLL_DOWN,
  LIST_SCROLL_DOWN_GUEST,
  MESSAGE_FOR_GUEST,
  ONE,
  ONE_GUEST,
  PING,
  PING_FOR_GUEST,
  RATING,
  RATING_STATUS,
  SEARCH_FUZZY_CHAT,
  SEARCH_TICKET,
  SEEN,
  GUEST_RATING_STATUS,
  GUEST_RATING,
} from 'constants/APIintegration';
import { SEARCH_ORDER } from 'constants/APIUriV2';
import { GET, POST, PUT } from './Clients';

export const listMessage = ({ ctx, conversationID, lastMessageID, isGuest = false, guestID = 0 }) => {
  const body = {
    conversationID,
    limit: 20,
    getTotal: false,
    lastMessageID,
  };

  if (isGuest) body.guestID = guestID;

  const url = isGuest ? MESSAGE_FOR_GUEST : LIST_MESSAGE;

  return POST({ url, ctx, body, isAuth: !isGuest, isBasic: true });
};

export const listForCustomer = ({ ctx }) => {
  const url = LIST_FOR_CUSTOMER;
  const body = {
    limit: 1000,
    offset: 0,
    page: 1,
  };
  return POST({ url, ctx, body });
};

export const customterToCS = (bodyRequest, isGuest = false) => {
  const url = isGuest ? GUEST_TO_CS : CUSTOMER_TO_CS;
  const body = bodyRequest;
  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};

export const pingToStayInConnect = ({ sessionID, isGuest = false }) => {
  const url = isGuest ? PING_FOR_GUEST : PING;
  const body = {
    sessionID,
  };
  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};

// export const createUploadFileLinkToGCS = ({ file = {} }) => {
//   const url = FILE_RESUMABLE;
//   const body = file;
//   return POST({ url, body });
// };
export const createUploadFileLinkToGCS = (body, isGuest = false) => {
  const url = isGuest ? FILE_RESUMABLE_GUEST : FILE_RESUMABLE;
  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};

export const uploadFileToGCS = (url, binaryBody, headers) =>
  fetch(url, {
    method: 'PUT',
    body: binaryBody,
    headers,
  });

export const completeUploadToGCS = (body, isGuest = false) => {
  const url = isGuest ? FILE_RESUMABLE_GUEST : FILE_RESUMABLE;
  return PUT({ url, body, isAuth: !isGuest, isBasic: true });
};

export const addGuest = (body) => {
  const url = ADD_GUEST;
  return POST({ url, body, isAuth: false, isBasic: true });
};

export const listForGuest = (body) => {
  const url = LIST_FOR_GUEST;
  return POST({ url, body, isAuth: false, isBasic: true });
};
export const messageForGuest = (body) => {
  const url = MESSAGE_FOR_GUEST;
  return POST({ url, body, isAuth: false, isBasic: true });
};

export const seenConversation = (body) => {
  const url = SEEN;
  return POST({ url, body });
};
export const postDate = (body, isGuest = false) => {
  const url = isGuest ? DATE_GUEST : DATE;
  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};

export const postListScrollDown = (bodyRequest, isGuest, guestID) => {
  const url = isGuest ? LIST_SCROLL_DOWN_GUEST : LIST_SCROLL_DOWN;
  const body = {
    ...bodyRequest,
    limit: null,
  };
  if (isGuest) body.guestID = guestID;
  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};
export const postRatingStatus = (conversationID, isGuest = false) => {
  const url = isGuest ? GUEST_RATING_STATUS : RATING_STATUS;
  const body = {
    conversationID,
  };
  return POST({ url, body, isAuth: !isGuest });
};

export const postRating = (conversationID, feedback = '', rating = 1, guestID, isGuest = false) => {
  const url = isGuest ? GUEST_RATING : RATING;
  const body = {
    conversationID,
    feedback,
    rating,
  };
  if (isGuest) {
    body.guestID = guestID;
  }
  return POST({ url, body, isAuth: !isGuest });
};
export const postConfigChat = () => {
  const url = CONFIG;
  const body = {
    conversationType: 'CUSTOMER_WITH_CS',
  };
  return POST({ url, body, isBasic: true });
};
export const postOne = (messageID, isGuest = false) => {
  const url = isGuest ? ONE_GUEST : ONE;
  const body = {
    messageID,
  };
  return POST({ url, body, isAuth: !isGuest });
};
/**
 * Upload a file to Google Cloud Storage
 * @param file a file object to upload. Example: event.target.files[0]
 * @param beforeUploadHandler some action for before uploading, example: setLoadingScreen(false)
 * @param callAPIUploadLink this is the function call to backend service to get the uploadlink, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param callAPIUploadFileToGCS this is the function for uploading file to GCS, params:
 * - url: the upload url
 * - body: the binary of file
 * - headers: the object for the headers to upload to GCS
 * this function return a fetch object like this:
 * ```javascript
 * fetch(url, {
 *  method: 'PUT',
 *  body,
 *  headers
 * })
 * ```
 * @param callAPICompleteUpload this is the function call to our backend service to get the update upload status, params is the object for request body, make sure this function return the APIResponse object:
 *  - status
 *  - data
 *  - message
 * @param onUploadSuccess the action when upload successfully, example: setLoading(false); alert('Successfully')
 * @param onUploadError the action when upload error, example: setLoading(false); alert('Upload fail....')
 */

function createChunks(file, cSize) {
  let startPointer = 0;
  const endPointer = file.size;
  const chunks = [];
  while (startPointer < endPointer) {
    const newStartPointer = startPointer + cSize;
    chunks.push(file.slice(startPointer, newStartPointer));
    startPointer = newStartPointer;
  }
  return chunks;
}
export const uploadFile = async (
  { file, callAPIGetUploadLink, callAPIUploadFileToGCS, callAPICompleteUpload, onUploadError, onUploadSuccess },
  isGuest,
) => {
  try {
    const reqUploadVideo = {
      filename: file.name,
      mime: file.type || 'application/octet-stream',
    };

    const resUploadVideo = await callAPIGetUploadLink(reqUploadVideo);
    if (resUploadVideo?.status === 'OK') {
      const data = resUploadVideo.data[0];
      const { uploadLink } = data;
      const chunks = createChunks(file, 256 * 1024 * 1024);
      let chunkFirstByte = 0;

      for (let i = 0; i < chunks.length; i += 1) {
        const headers = {};
        headers['Content-Type'] = file.type;
        headers['Content-Range'] = `bytes ${chunkFirstByte}-${chunkFirstByte + chunks[i].size - 1}/${file.size}`;
        const res = await callAPIUploadFileToGCS(uploadLink, chunks[i], headers);
        if (res.status !== 308 && res.status !== 200 && res.status !== 201) {
          onUploadError(res.message);
          return res;
        }
        chunkFirstByte += chunks[i].size;
      }

      const reqCompleUploadVideo = {
        uploadCode: data.uploadCode,
      };
      const resCompleteUploadVideo = await callAPICompleteUpload(reqCompleUploadVideo, isGuest);
      if (resCompleteUploadVideo?.status !== 'OK') {
        onUploadError(resCompleteUploadVideo.message);
      }
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      return resCompleteUploadVideo;
    }
    onUploadError(resUploadVideo.message);
    return resUploadVideo;
  } catch (error) {
    console.error('uploadFile error', error?.message);
  }
};

export const getFiles = ({ conversationID, offset = 0, limit = 20, isGuest = false, guestID = 0 }) => {
  const url = isGuest ? LIST_FILE_GUEST : LIST_FILE;
  const body = {
    isOver: false,
    conversationID,
    offset,
    limit,
  };
  if (isGuest) body.guestID = guestID;

  return POST({ url, body, isAuth: !isGuest, isBasic: true });
};

export const tagSearchProduct = async (pagination, customerInfo, text = '') => {
  const url = SEARCH_FUZZY_CHAT;
  const body = {
    limit: pagination.limit,
    offset: (pagination.page - 1) * pagination.limit,
    ...(text.length && { text }),
    filter: {
      locationCodes: [customerInfo.provinceCode],
      statusIn: ['NORMAL', 'LIMIT'],
      isActive: true,
    },
    customerID: `${customerInfo.customerID}`,
  };

  return POST({ url, body });
};

export const tagSearchOrder = async (pagination, customerInfo, text = '') => {
  const url = SEARCH_ORDER;
  const params = {
    limit: pagination.limit,
    offset: (pagination.page - 1) * pagination.limit,
    q: JSON.stringify({
      customerId: customerInfo.customerID,
      ...(text.length && { search: text.trim() }),
    }),
  };
  const result = await GET({ url, params });
  return result;
};

export const tagSearchTicket = async (pagination, customerInfo, code = '') => {
  const url = SEARCH_TICKET;
  const body = {
    limit: pagination.limit,
    offset: (pagination.page - 1) * pagination.limit,
    customerId: customerInfo.customerID,
    ...(code.length && { search: code.trim() }),
  };
  const result = await POST({ url, body });
  return result;
};

export const getLinks = ({ conversationID, offset = 0, limit = 20 }) => {
  const url = LIST_LINK;
  const body = {
    conversationID,
    isOver: true,
    limit,
    offset,
  };

  return POST({ url, body });
};
