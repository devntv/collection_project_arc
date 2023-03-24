import { Typography } from '@material-ui/core';
import { getData } from 'clients';
import { getFiles } from 'clients/ChatClient';
import { ATTACH } from 'constants/Icons';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IChatMessage, IFiles, IStatusLoading } from '../IfcConversation';
import { renderLoading } from '../LinksTab';
import FileItem from './FileItem';
import styles from './styles.module.css';

interface Props {
  conversationID: string;
  isGuest: boolean;
  guestID: number;
  isWebView: boolean;
  setTab: Dispatch<
    SetStateAction<{
      param: string;
      name: string;
    }>
  >;
  chatMessages: IChatMessage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChatMessages: Dispatch<any>;
  action: IStatusLoading;
  setAction: Dispatch<SetStateAction<IStatusLoading>>;
  setCurrentDisplayDay: Dispatch<SetStateAction<string>>;
}

function EmptyFile() {
  return (
    <div className={styles.rootEmpty}>
      <ATTACH />
      <Typography className={styles.emptyText} variant="subtitle2">
        Chưa có files hoặc hình ảnh nào
      </Typography>
    </div>
  );
}
const LIMIT = 20;

export default function LinkTab({ conversationID, isWebView, setTab, setChatMessages, action, setAction, isGuest, guestID, chatMessages }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [files, setFiles] = useState<Array<IFiles>>([]);
  const [empty, setEmpty] = useState<boolean>(false);
  const [fistLoad, setFirstLoad] = useState<boolean>(false);
  const refPage = useRef(1);
  // FIRST FETCH
  useEffect(() => {
    (async () => {
      setFirstLoad(true);
      const filesRes = getData(await getFiles({ conversationID, limit: LIMIT, offset: 0, isGuest, guestID }));
      setFirstLoad(false);
      if (filesRes.length === 0) {
        setEmpty(true);
        return;
      }
      setFiles((prev) => [...prev, ...filesRes]);
    })();
  }, []);
  // FOR THE NEXT FETCHS
  const fetchMoreFiles = async () => {
    const filesRes = getData(await getFiles({ conversationID, limit: LIMIT, offset: refPage.current * LIMIT, isGuest, guestID }));
    setFiles((prev) => [...prev, ...filesRes]);
    // setPage(page + 1);
    refPage.current += 1;
    return !(filesRes.length < LIMIT); // return false to stop loadmore
  };
  const { isFetching } = useInfiniteScroll(fetchMoreFiles, 'bottom', wrapperRef.current as null);

  return (
    <div id="chatMobile_listFile" className={styles.root} ref={wrapperRef}>
      {empty && <EmptyFile />}
      {!empty &&
        files.map((file: IFiles) => (
          <FileItem
            key={file?.resourceID}
            {...file}
            isGuest={isGuest}
            guestID={guestID}
            isWebView={isWebView}
            setTab={setTab}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            action={action}
            setAction={setAction}
          />
        ))}
      {(fistLoad || isFetching) && renderLoading()}
    </div>
  );
}
