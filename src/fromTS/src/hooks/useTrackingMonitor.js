/* eslint-disable react-hooks/rules-of-hooks */
import { MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import MonitorUtils from 'utils/MonitorUtils';
import useSellers from 'zustand-lib/useSellers';
import useHover from './useHover';
import useOnScreen from './useOnScreen';

export default function useTrackingMonitor(ref, product, isMobile) {
  const timeoutRef = useRef(null);
  const isSendEvent = useRef(false);
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const [isHover] = useHover(ref, !isMobile || !isSendEvent.current, isMobile);
  const isOnScreen = useOnScreen(ref, isMobile || !isSendEvent.current);
  const router = useRouter();

  const sendEvent = async () => {
    const sellerInfo = await getSellerByCode({ code: product?.sellerCode, tags: product?.tags || [] });
    const res = await MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.SKU_IMPRESSION, { ...product, sellerInfo }, router.pathname);
    if (res?.status === 'OK') isSendEvent.current = true;
  };

  if (!isSendEvent.current) {
    if (isMobile && isOnScreen) {
      timeoutRef.current = setTimeout(sendEvent, 2000);
    } else if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isHover) {
      sendEvent();
    }
  }
}
