/* eslint-disable no-unused-expressions */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
import { Box, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Zoom from '@material-ui/core/Zoom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import SendIcon from '@material-ui/icons/Send';
import { getFirst } from 'clients';
import {
  completeUploadToGCS,
  createUploadFileLinkToGCS,
  customterToCS,
  tagSearchOrder,
  tagSearchProduct,
  tagSearchTicket,
  uploadFile,
  uploadFileToGCS,
} from 'clients/ChatClient';
import clsx from 'clsx';
import ScrollToBottom from 'components-v2/atoms/ScrollToBottom';
import { TagCode, tagList } from 'constants/data/mobile';
import { GALLERY, ICON_MOBILE_ICON_ATTACH_FILE, MORE } from 'constants/Icons';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import { useEffect, useMemo, useRef, useState } from 'react';
import AddressService from 'services/AddressService';
import { isPrd } from 'sysconfig';
import { NotifyUtils } from 'utils';
import { groupTypeofFileByExtension } from 'utils/ValidateUtils';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import useChat from 'zustand-lib/useChat';
import useChatGuest from 'zustand-lib/useChatGuest';
import { ENUM_CONVERSATION_STATUS } from 'constants/Chat';
import { handleSellerInfo, handleSkuInfo, isStartTag, searchTagCode, splitTextMessage, startTagAt, startTagMenuCommandAt } from './func';
import ListTag from './ListTag';
import OrderItem from './OrderItem';
import ProductItem from './ProductItem';
import TicketItem from './TicketItem';
import styles from './styles.module.css';

const UploadFileButton = ({ handleRequestPermission, handleOpenUploadFile }) => (
  <div>
    <label htmlFor="icon-button-file">
      <input
        style={{ display: 'none' }}
        multiple
        id="icon-button-file"
        type="file"
        onClick={handleRequestPermission}
        onChange={handleOpenUploadFile}
      />
      <IconButton color="primary" component="span" size="medium">
        <ICON_MOBILE_ICON_ATTACH_FILE />
      </IconButton>
    </label>
  </div>
);
const UploadFileIMG = ({ handleRequestPermission, handleOpenUploadFile }) => (
  <div style={{ marginTop: '4px' }}>
    <label htmlFor="icon-button-img">
      <input
        style={{ display: 'none' }}
        multiple
        id="icon-button-img"
        type="file"
        accept="image/*"
        onClick={handleRequestPermission}
        onChange={handleOpenUploadFile}
      />
      {/* <IconButton color="primary" component="span" size="medium">
        <ImageIcon fontSize="large" />
      </IconButton> */}
      <GALLERY />
    </label>
  </div>
);
// default comp
const FormSendMessage = ({
  conversationID,
  setConversationID,
  sessionID,
  setStatusLoading,
  isGuest,
  scrollBottomRef,
  scrollAutoBottom,
  conversationStatus,
  handleInitRatingValue,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const { guestID, sessionID: guestSectionID } = useChatGuest((state) => state.getInfoGuest());
  const [selectedTagItem, setSelectedTagItem] = useState(null);
  const [selectedTagMenuItem, setSelectedTagMenuItem] = useState(null);
  const [openTagMenu, setOpenTagMenu] = useState(false);
  const [tagMenu, setTagMenu] = useState(tagList);
  const [searchText, setSearchText] = useState('');
  const [isMore, setIsMore] = useState(false);
  // upload files
  const [uploadFiles, setUploadFiles] = useState([]);

  const { setRAWListMessageChat, triggerScrollBottom, setTriggerFocusInput, isWebView } = useChat((state) => state);
  const rawId = `raw-message-${uuidv4()}`;
  const rawFile = [];
  const user = useStore((state) => state?.user) || null;

  const scrollToBottomReverse = () => {
    document.querySelector('#chatMobile_container')?.scrollTo({
      top: -1,
      behavior: 'smooth',
    });
  };

  if (uploadFiles.length !== 0) {
    uploadFiles.forEach((file) => {
      let tempFile = null;
      const extension = file.name.split('.').pop().toLowerCase();
      const groupType = groupTypeofFileByExtension(extension).toLowerCase();
      if (file.type.includes('image')) {
        tempFile = {
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'image',
          file,
        };
      } else if (file.type.includes(groupType)) {
        tempFile = {
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'video',
          file,
        };
      } else {
        tempFile = {
          name: file.name,
          type: 'file',
          file,
        };
      }
      rawFile.push(tempFile);
    });
  }
  // const MAX_LENGTH_FILES = 6;

  const handleSelectMenuItem = (item) => {
    setSelectedTagMenuItem(item);
    setNewMessage(item?.code);
  };
  const isTagSearching = useMemo(() => {
    if (!selectedTagItem && selectedTagMenuItem) {
      return selectedTagMenuItem?.code.toUpperCase();
    }
    return null;
  }, [selectedTagItem, selectedTagMenuItem]);

  const handleChangeMessage = (event) => {
    const newValue = event.target.value;
    setNewMessage(newValue);

    if (!selectedTagItem && !isGuest) {
      const startCommand = startTagMenuCommandAt(newValue);
      if (startCommand >= 0) {
        const end = newValue.indexOf('\n', startCommand);
        let tagCode = [];
        if (end <= startCommand) {
          tagCode = searchTagCode(newValue.substring(startCommand));
        } else {
          tagCode = searchTagCode(newValue.substring(startCommand, end));
        }
        if (tagCode.length > 0) {
          setOpenTagMenu(true);
        }
        setTagMenu(tagCode);
        setIsMore(false);
      } else {
        setOpenTagMenu(false);
        setTagMenu(tagList);
      }
      const lines = splitTextMessage(newValue);
      const n = lines.length;
      let tag = null;
      for (let i = 0; i < n; i += 1) {
        tag = isStartTag(lines[i]);
        if (tag) {
          setSelectedTagMenuItem(tag);
          break;
        }
      }
      if (!tag) {
        setSelectedTagMenuItem(null);
      }
      const res = startTagAt(newValue);
      if (res) {
        const { start, tag: tagCode } = res;
        const end = newValue.indexOf('\n', start);
        let searchString = '';
        if (end <= start) {
          searchString = newValue.substring(start + tagCode.length);
        } else {
          searchString = newValue.substring(start + tagCode.length, end);
        }
        setSearchText(searchString);
      }
    }
  };

  const handleRequestPermission = () => {
    const messageEventApp = `PERMISSION~request_permission`;
    window?.ReactNativeWebView?.postMessage(messageEventApp);
    window?.postMessage(messageEventApp);
    !isPrd && NotifyUtils.success('send postMessage PRODUCT ', messageEventApp);
  };

  const handleOpenUploadFile = (e) => {
    // validate
    const cvFiles = Array.from(e?.target?.files) || [];
    if (cvFiles.length === 0) return;
    // if (cvFiles.length > MAX_LENGTH_FILES) {
    //   NotifyUtils.error('Vui lòng chọn tối đa 6 tệp');
    //   return;
    // }

    const newFiles = cvFiles.map((file) => {
      const newFile = file;
      newFile.id = uuidv4();

      return newFile;
    });
    if (uploadFiles.length === 0) {
      setUploadFiles(newFiles);
    } else {
      // merge 2 arr
      const newUpdateFiles = [...uploadFiles, ...newFiles];
      setUploadFiles(newUpdateFiles);
      // if (newUpdateFiles.length > MAX_LENGTH_FILES) {
      //   NotifyUtils.error('Vui lòng chọn tối đa 6 tệp');
      // } else {
      // }
    }
  };

  const handleDeleteFile = (delFile) => {
    const newFiles = uploadFiles?.filter((file) => file?.id !== delFile?.id);
    setUploadFiles(newFiles);
  };

  const conversationSendToCS = async () => {
    if (newMessage?.trim() === '' && uploadFiles.length === 0 && !selectedTagItem) return;
    setStatusLoading((prev) => ({ ...prev, isSent: false, isDisplaySent: false }));
    const tagItem = {};
    const files = [];
    if (selectedTagItem) {
      const { tag, item } = selectedTagItem;
      switch (tag?.code) {
        case TagCode.SP:
          tagItem.skuInfo = handleSkuInfo(item);
          break;
        case TagCode.DH:
          tagItem.orderInfo = item;
          break;
        case TagCode.HOTRO: {
          tagItem.ticketInfo = item || {};
          tagItem.ticketInfo.createdBy = item.createdBy ? item.createdBy.fullname : '';
          const skuInfo = tagItem.ticketInfo.skuInfo || null;
          if (skuInfo) {
            skuInfo.sellerInfo = handleSellerInfo(skuInfo.sellerInfo);
            tagItem.ticketInfo.skuInfo = skuInfo;
          }
          break;
        }
        default:
          break;
      }
      // lấy địa chỉ chi tiết
      if (tag?.code === TagCode.DH) {
        const detailAddress = await AddressService.getMasterAddressObject({
          provinceCode: selectedTagItem?.item?.customerProvinceCode,
          districtCode: selectedTagItem?.item?.customerDistrictCode,
          wardCode: selectedTagItem?.item?.customerWardCode,
        });
        tagItem.orderInfo.detailAddress = detailAddress;
      }
    }
    const message = {
      content: newMessage?.replace(/^\s+|\s+$/g, '')?.trim() || '',
      type: rawFile.length > 0 ? rawFile[0].type.toUpperCase() : 'TEXT',
      conversationID: conversationID || null,
      sessionID: isGuest ? guestSectionID : sessionID,
      createdTime: new Date().toISOString(),
      status: 'RAW',
      messageID: rawId,
      senderID: isGuest ? guestID : user.accountID,
      ...(rawFile.length && {
        media: [...rawFile],
      }),
      ...(selectedTagItem && {
        tagItem: selectedTagItem.tag.item,
      }),
      ...tagItem,
      messageType: isGuest ? 'GUEST_TO_CS' : 'CUSTOMER_TO_CS',
      isScrollDown: true,
    };

    setNewMessage('');
    setSelectedTagItem(null);
    setSelectedTagMenuItem(null);
    setRAWListMessageChat(message);
    setStatusLoading((prev) => ({ ...prev, isDisplaySent: true }));
    setUploadFiles([]);

    if (uploadFiles.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      const n = uploadFiles.length;
      for (let i = 0; i < n; i += 1) {
        const file = uploadFiles[i];
        const uploadFileObject = {
          file,
        };
        if (file.size === 0) {
          continue;
        } else if (file.size / 1024 / 1024 / 1024 >= 1) {
          continue;
        }
        uploadFileObject.callAPIGetUploadLink = function (body) {
          if (body) {
            body.directory = `integration/chat`;
          }
          return createUploadFileLinkToGCS(body, isGuest);
        };

        uploadFileObject.callAPIUploadFileToGCS = uploadFileToGCS;
        uploadFileObject.callAPICompleteUpload = completeUploadToGCS;
        // uploadFileObject.onUploadError = function () {
        //   enqueueSnackbar('Đã có lỗi xảy ra, vui lòng thử lại', {
        //     anchorOrigin: {
        //       vertical: 'top',
        //       horizontal: 'right',
        //     },
        //     autoHideDuration: 2000,
        //     TransitionComponent: Fade,
        //     variant: 'error',
        //   });
        // };
        // uploadFileObject.onUploadSuccess = function () {};
        const uploadRes = await uploadFile(uploadFileObject, isGuest);

        if (uploadRes.status === 'OK') {
          // realFile = {
          // 	name: file.name,
          // 	url: uploadRes.data[0].link,
          // 	file: file,
          // 	type: rawFile[i].type,
          // };
          // isError = false;
          files.push({
            name: file.name,
            url: uploadRes.data[0].link,
            file,
            type: rawFile[i].type,
            size: file.size,
          });
        }
      }
      // clear after upload
    }
    const bodyRequest = {
      conversationID: conversationID || null,
      sessionID: isGuest ? guestSectionID : sessionID,
      type: files.length > 0 ? files[0].type.toUpperCase() : 'TEXT',
      content: newMessage,
      senderID: isGuest ? guestID : user?.accountID,
      ...(selectedTagItem && {
        tagItem: selectedTagItem?.tag.item,
      }),
      ...tagItem,
      ...(files.length && {
        URLMedia: files.map((file) => file.url),
        fileName: files.map((file) => file.name),
        size: files.map((file) => `${file.size}`),
      }),
    };
    const conversationRes = await customterToCS(bodyRequest, isGuest);

    const data = getFirst(conversationRes);
    if (data && !conversationID) {
      setConversationID(data?.conversationID);
    }

    scrollToBottomReverse();
    setTimeout(() => {
      setStatusLoading((prev) => ({ ...prev, isSent: true }));
    }, 500);
  };

  const sendMessageOnClick = (event) => {
    scrollAutoBottom.current?.scrollTo({ top: 0, behavior: 'auto' });
    event.preventDefault();
    conversationSendToCS();
    if (conversationStatus === ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE || conversationStatus === ENUM_CONVERSATION_STATUS.COMPLETED) {
      setStatusLoading((prev) => ({ ...prev, isHideRating: true }));
      handleInitRatingValue();
    }
  };

  // handle open more
  const handleMore = () => {
    setIsMore((prev) => !prev);
  };

  const validateFileName = (text) => {
    if (text?.length > 0 && text?.length < 30) return text;
    if (text?.length >= 30) return `${text.slice(0, 20)}...`;
    return '(Không có)';
  };
  useDidUpdateEffect(() => {
    if (scrollBottomRef && scrollBottomRef.current) {
      scrollBottomRef.current.scrollToBottom();
      scrollToBottomReverse();
    }
  }, [triggerScrollBottom]);

  useEffect(() => {
    if (selectedTagMenuItem) {
      setOpenTagMenu(false);
    }
  }, [selectedTagMenuItem]);
  // fix mobile keyboard in safari browser hide input chat
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    e.preventDefault();
    try {
      inputRef.current.focus();
      if (!newMessage || newMessage?.length <= 0) {
        setNewMessage(' ');
      }
      setTriggerFocusInput(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlurChatInput = (e) => {
    e.preventDefault();
    inputRef.current.blur();
    setTriggerFocusInput(false);
  };

  const handleClearTagProduct = () => {
    setNewMessage('');
    setSearchText('');
    setSelectedTagMenuItem(null);
  };
  const handleSelectTagItem = (item) => {
    setNewMessage('');
    setSelectedTagItem({
      item,
      tag: selectedTagMenuItem,
    });
    setSelectedTagMenuItem(null);
  };

  const handleCloseTag = () => {
    setSelectedTagItem(null);
  };

  const handleSelect = (item) => {
    setSearchText('');
    if (item === TagCode.SP) {
      setSelectedTagMenuItem(tagList[0]);
    }
    if (item === TagCode.DH) {
      setSelectedTagMenuItem(tagList[1]);
    }
    if (item === TagCode.HOTRO) {
      setSelectedTagMenuItem(tagList[2]);
    }
    setNewMessage(item);
    setIsMore(false);
  };

  return (
    <div id="chatMobile_formChat" className={clsx(styles.formChat_container, uploadFiles.length > 0 && styles.formChat_containerWithFile)}>
      {uploadFiles.length > 0 && (
        <Grid container className={styles.files_wrapper}>
          {/* convert files to array */}
          {uploadFiles.map((file) => (
            <Grid item xs={12} container key={file?.id} alignItems="center" style={{ borderTop: '1px solid #c7c5c5', padding: '0px 5px 0px 10px' }}>
              <Grid item xs={1}>
                <InsertDriveFileSharpIcon color="primary" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={styles.text_file_name}>{validateFileName(file?.name)}</Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="flex-end" onClick={() => handleDeleteFile(file)}>
                <CloseIcon />
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}

      {isTagSearching === TagCode.SP && (
        <ListTag
          text={searchText}
          type="PRODUCT"
          handleSelectItem={(product) => {
            if (product) {
              handleSelectTagItem(product, product?.product?.name);
            }
          }}
          searchTag={tagSearchProduct}
        />
      )}
      {isTagSearching === TagCode.DH && (
        <ListTag
          text={searchText}
          type="ORDER"
          handleSelectItem={(order) => {
            if (order) {
              handleSelectTagItem(order, order?.orderId || order?.orderID);
            }
          }}
          searchTag={tagSearchOrder}
        />
      )}

      {isTagSearching === TagCode.HOTRO && (
        <ListTag
          text={searchText}
          type="TICKET"
          handleSelectItem={(ticket) => {
            if (ticket) {
              handleSelectTagItem(ticket, ticket.code);
            }
          }}
          searchTag={tagSearchTicket}
        />
      )}

      {selectedTagItem && (
        <>
          {selectedTagItem.tag.code.toUpperCase() === TagCode.SP && (
            <div className={styles.boxItem}>
              <ProductItem product={selectedTagItem.item} />
              <IconButton onClick={handleCloseTag} className={styles.iconClearSelectTag}>
                <ClearIcon />
              </IconButton>
            </div>
          )}
          {selectedTagItem.tag.code.toUpperCase() === TagCode.DH && (
            <div className={styles.boxItem}>
              <OrderItem order={selectedTagItem.item} />
              <IconButton onClick={handleCloseTag} className={styles.iconClearSelectTagOrder}>
                <ClearIcon />
              </IconButton>
            </div>
          )}
          {selectedTagItem.tag.code.toUpperCase() === TagCode.HOTRO && (
            <div className={styles.boxItem}>
              <TicketItem ticket={selectedTagItem.item} />
              <IconButton onClick={handleCloseTag} className={styles.iconClearSelectTagOrder}>
                <ClearIcon />
              </IconButton>
            </div>
          )}
        </>
      )}

      {!selectedTagItem && !selectedTagMenuItem && openTagMenu && (
        <Paper variant="outlined" className={styles.rootList}>
          <List disablePadding>
            {tagMenu.map((item) => (
              <ListItem
                key={item.code}
                button
                className={styles.listItem}
                onClick={() => {
                  handleSelectMenuItem(item);
                }}
              >
                <Grid container>
                  <Grid item xs={1}>
                    <CardMedia className={styles.icon} image={item?.image} />
                  </Grid>
                  <Grid item xs={7} className={styles.grid_textInfo}>
                    <ListItemText className={styles.textInfo}>{item?.title}</ListItemText>
                  </Grid>
                  <Grid item xs={4} className={styles.grid_textCommand}>
                    <ListItemText className={styles.textCommand}>{item?.guide}</ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <form id="inputForm" className={styles.containerForm}>
        {/* <MoreHorizIcon color="primary" onClick={handleMore} /> */}
        <div className={clsx(styles.more_ic_container, (openTagMenu || isTagSearching || selectedTagItem) && styles.hiddenActionMore)}>
          <Box onClick={handleMore}>
            <MORE />
          </Box>
        </div>
        <TextField
          id="chatMobile_textInput"
          inputRef={inputRef}
          className={styles.root_input}
          placeholder="Tin Nhắn"
          multiline
          value={newMessage}
          onChange={handleChangeMessage}
          variant="standard"
          onFocus={handleFocus}
          onBlur={handleBlurChatInput}
          maxRows={5}
        />

        {isTagSearching ? (
          <ClearIcon onClick={handleClearTagProduct} />
        ) : (
          <>
            {newMessage?.trim() === '' && uploadFiles.length === 0 && !selectedTagItem ? (
              <Zoom in>
                <div className={styles.iconRight}>
                  <UploadFileButton
                    handleRequestPermission={isWebView ? handleRequestPermission : undefined}
                    handleOpenUploadFile={handleOpenUploadFile}
                  />
                  <UploadFileIMG
                    handleRequestPermission={isWebView ? handleRequestPermission : undefined}
                    handleOpenUploadFile={handleOpenUploadFile}
                  />
                </div>
              </Zoom>
            ) : (
              <Zoom in>
                <Box>
                  <SendIcon color="primary" onClick={sendMessageOnClick} />
                </Box>
              </Zoom>
            )}
          </>
        )}
      </form>
      {isMore && (
        <Grid
          container
          justifyContent="flex-start"
          alignItems="stretch"
          style={{ width: '100%', columnGap: '10px', padding: '10px 20px', rowGap: '5px' }}
        >
          <Grid container justifyContent={isGuest ? 'flex-start' : 'space-between'}>
            {!isGuest && ( // khách vãng lai =>  disabled tính năng tag
              <>
                <Grid item>
                  <label htmlFor="product">
                    <Grid item container direction="column" justifyContent="center" alignItems="center" style={{ width: '66px', gap: '4px' }}>
                      <input id="product" style={{ display: 'none' }} onClick={() => handleSelect(TagCode.SP)} />
                      <div className={styles.ic_product_container}>
                        <IconButton component="span" style={{ color: '#ffffff' }}>
                          <CardMedia className={styles.icon} image="/icons/mobile/chat/SP.svg" />
                        </IconButton>
                      </div>
                      <Grid item xs={12}>
                        <Typography className={styles.text_ic}>
                          @SP <br /> Sản phẩm
                        </Typography>
                      </Grid>
                    </Grid>
                  </label>
                </Grid>
                <Grid item>
                  <label htmlFor="order">
                    <Grid item container direction="column" justifyContent="center" alignItems="center" style={{ width: '66px', gap: '4px' }}>
                      <input id="order" style={{ display: 'none' }} onClick={() => handleSelect(TagCode.DH)} />
                      <div className={styles.ic_order_container}>
                        <IconButton component="span" style={{ color: '#ffffff' }}>
                          <CardMedia className={styles.icon} image="/icons/mobile/chat/order.svg" />
                        </IconButton>
                      </div>
                      <Grid item xs={12}>
                        <Typography className={styles.text_ic}>
                          @DH <br />
                          Đơn hàng
                        </Typography>
                      </Grid>
                    </Grid>
                  </label>
                </Grid>
                <Grid item>
                  <label htmlFor="ticket">
                    <Grid item container direction="column" justifyContent="center" alignItems="center" style={{ width: '66px', gap: '4px' }}>
                      <input id="ticket" style={{ display: 'none' }} onClick={() => handleSelect(TagCode.HOTRO)} />
                      <div className={styles.ic_ticket_container}>
                        <IconButton component="span" style={{ color: '#ffffff' }}>
                          <CardMedia className={styles.icon} image="/icons/mobile/chat/ticket.svg" />
                        </IconButton>
                      </div>
                      <Grid item xs={12}>
                        <Typography className={styles.text_ic}>
                          @HOTRO <br />
                          Phiếu hỗ trợ
                        </Typography>
                      </Grid>
                    </Grid>
                  </label>
                </Grid>
              </>
            )}
            <Grid item>
              <label htmlFor="icon-button-img">
                <Grid item container direction="column" justifyContent="center" alignItems="center" style={{ width: '66px', gap: '4px' }}>
                  <input style={{ display: 'none' }} multiple id="icon-button-img" type="file" accept="image/*" onChange={handleOpenUploadFile} />
                  <div className={styles.ic_img_container}>
                    <IconButton component="span" style={{ color: '#ffffff' }}>
                      <ImageIcon fontSize="large" />
                    </IconButton>
                  </div>
                  <Grid item xs={12}>
                    <Typography className={styles.text_ic}>Phương tiện</Typography>
                  </Grid>
                </Grid>
              </label>
            </Grid>
            <Grid item>
              <label htmlFor="icon-button-file">
                <Grid item container direction="column" justifyContent="center" alignItems="center" style={{ width: '66px', gap: '4px' }}>
                  <input style={{ display: 'none' }} multiple id="icon-button-file" type="file" onChange={handleOpenUploadFile} />
                  <div className={styles.ic_file_container}>
                    <IconButton component="span" style={{ color: '#ffffff' }}>
                      <AttachFileIcon fontSize="large" style={{ transform: 'rotate(52deg)' }} />
                    </IconButton>
                  </div>
                  <Grid item xs={12}>
                    <Typography className={styles.text_ic}>Tài liệu</Typography>
                  </Grid>
                </Grid>
              </label>
            </Grid>
          </Grid>
        </Grid>
      )}
      {uploadFiles.length === 0 && !isMore && <ScrollToBottom ref={scrollBottomRef} element={scrollAutoBottom?.current} />}
    </div>
  );
};

export default FormSendMessage;
