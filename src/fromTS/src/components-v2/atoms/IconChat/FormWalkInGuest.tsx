/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputAdornment, Typography } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getFirst } from 'clients';
import { addGuest } from 'clients/ChatClient';
import { ButtonDefault, Input } from 'components/atoms';
import { LOGO_SHORT_BLUE_20, PAPER_PLANE } from 'constants/Icons';
import { CALL_ICON } from 'constants/Images';
import { CONVERSATIONS } from 'constants/Paths';
import { useRouter } from 'next/dist/client/router';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { phoneNumberPattern } from 'utils/StringUtils';
import { IChatGuest, IInitialStateChatGuest } from 'zustand-lib/InterfaceZustand';
import useChatGuest from 'zustand-lib/useChatGuest';
import styles from './styles.module.css';

const IconAccount = (
  <InputAdornment position="start">
    <AccountCircleOutlined htmlColor="#3b438f" />
  </InputAdornment>
);
const IconPhone = (
  <InputAdornment position="start" className={styles.phoneIcon}>
    <ImageFallbackStatic src={CALL_ICON} width="19" height="19" />
  </InputAdornment>
);

function FormWalkInGuest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IInitialStateChatGuest>();

  const setInfoGuest = useChatGuest((state: IChatGuest) => state.setInfoGuest);
  const { push } = useRouter();
  const setGuestId = useChatGuest((state: any) => state.setGuestId);

  const onSubmit = async (data: IInitialStateChatGuest) => {
    const { guestID = null } = getFirst(await addGuest(data)) || {};
    if (guestID) {
      setInfoGuest({
        ...data,
        guestID,
      });
      setGuestId(guestID);
      push(CONVERSATIONS);
    }
  };
  return (
    <div className={styles.rootGuest}>
      <div className={styles.rootHeader}>
        <div className={styles.logo}>
          <LOGO_SHORT_BLUE_20 />
        </div>
        <Typography className={styles.headerText} variant="body1">
          Hỗ trợ khách hàng
        </Typography>
        <CheckCircleIcon htmlColor="#0cba69" />
      </div>
      <Typography className={styles.headerDescription} variant="body2">
        Vui lòng cung cấp thông tin để bắt đầu cuộc trò chuyện
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.contentGuest}>
        <FormControl fullWidth>
          <Input
            error={!!errors.fullName}
            // type={showPassword ? 'text' : 'password'}
            startAdornment={IconAccount}
            placeholder="Họ và tên"
            autoComplete="fullName"
            variant="outlined"
            className={styles.inputGuest}
            {...register('fullName', { required: 'Bạn cần nhập thông tin họ và tên' })}
          />
          {errors.fullName && <div className={styles.errorMesGuest}>{errors.fullName?.message}</div>}
        </FormControl>
        <FormControl fullWidth>
          <Input
            error={!!errors.phoneNumber}
            // type={showPassword ? 'text' : 'password'}
            startAdornment={IconPhone}
            placeholder="Số điện thoại"
            autoComplete="phoneNumber"
            variant="outlined"
            className={styles.inputGuest}
            {...register('phoneNumber', {
              required: {
                value: true,
                message: 'Bạn cần nhập thông tin số điện thoại',
              },
              pattern: {
                value: phoneNumberPattern,
                message: 'Số điện thoại chưa đúng định dạng',
              },
              onChange: (event) => {
                const regex = /[^0-9+]/g;
                const { value } = event.target;
                setValue('phoneNumber', value.replace(regex, ''));
              },
            })}
          />
          {errors.phoneNumber && <div className={styles.errorMesGuest}>{errors.phoneNumber.message}</div>}
        </FormControl>
        <ButtonDefault type="submit" classes={{ root: styles.buttonGuest }} fullWidth size="large">
          <Typography className={styles.btnTextGuest} variant="caption">
            BẮT ĐẦU CHAT
          </Typography>
          <PAPER_PLANE />
        </ButtonDefault>
      </form>
    </div>
  );
}

export default memo(FormWalkInGuest);
