import { Button, Chip, Grid, TableCell, TableRow } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { AddCommentOutlined, Assignment, AssignmentLate, AssignmentReturned, AssignmentTurnedIn, MoreHoriz } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import clsx from 'clsx';
import { InfoTable } from 'components/atoms';
import { TicketDetailModal, TicketFormModal } from 'components/mocules';
import { ALIGN, EnumsTicket } from 'constants/Enums';
import { useSetting } from 'context';
import { useModal } from 'hooks';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DateTimeUtils, NotifyUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const heads = [
  { text: 'Loại yêu cầu', align: ALIGN.LEFT },
  // { text: 'Mã đơn hàng', align: ALIGN.LEFT },
  { text: 'Lí do', align: ALIGN.LEFT },
  { text: 'Thời gian tạo', align: ALIGN.LEFT },
  { text: 'Trạng thái', align: ALIGN.LEFT },
  { text: 'Hành động', align: ALIGN.CENTER },
];

export const TICKET_STATUS = [
  {
    value: 'PENDING',
    label: 'Chưa xử lý',
    color: '#cc5555',
    iconColor: '#cc5555',
    icon: <MoreHoriz />,
  },
  {
    value: 'ASSIGNED',
    label: 'Đã tiếp nhận',
    color: '#00CCFF',
    iconColor: '#55cccc',
    icon: <Assignment />,
  },
  {
    value: 'IN_PROCESS',
    label: 'Đang xử lý',
    color: '#0081CF',
    iconColor: '#55cccc',
    icon: <AssignmentReturned />,
  },
  {
    value: 'REPLIED',
    label: 'Đã trả lời',
    color: '#0081CF',
    iconColor: '#55cccc',
    icon: <AssignmentReturned />,
  },
  {
    value: 'DONE',
    label: 'Đã xử lý',
    color: '#5b5',
    iconColor: '#5b5',
    icon: <AssignmentTurnedIn />,
  },
  {
    value: 'CANCELLED',
    label: 'Đã huỷ',
    color: '#bbb',
    iconColor: '#bbb',
    icon: <AssignmentLate />,
  },
  // old status
  {
    value: 'NEW',
    label: 'Mới',
    color: '#cc5555',
    iconColor: '#cc5555',
    icon: <MoreHoriz />,
  },
  {
    value: 'DEFAULT',
    label: 'Khác',
    color: '#cc5555',
    iconColor: '#cc5555',
    icon: <MoreHoriz />,
  },
];

const DEFAULT_TIME = '';

function TicketTable({ pageSize, ticketList, filter: filterProps, page: currentPage, user }) {
  const router = useRouter();
  const { id = '' } = router?.query;
  const [ticketId, setTicketId] = useState(id);
  const [open, toggle] = useModal(!!id);
  const [isShowNewTicket, toggleNewTicket] = useModal();
  const [filter, setFilter] = useState(filterProps);

  const { mapReasonsTicket = new Map() } = useSetting();

  const handleViewDetail = (ticket) => {
    setTicketId(ticket.ticketId);
    toggle();
    router.replace(
      {
        pathname: '/users/my-ticket',
        query: { ...router.query, id: ticket.ticketId },
      },
      null,
      {
        shallow: true,
      },
    );
  };

  useEffect(() => {
    if (id) {
      setTicketId(id);
      if (!open) toggle();
    }
  }, [id]);

  const handleCloseDetail = () => {
    toggle();
    // router.push('/users/my-ticket');
    router.replace(
      {
        pathname: '/users/my-ticket',
        query: { ...router.query, id: null },
      },
      null,
      {
        shallow: true,
      },
    );
  };

  const reloadFunc = () => {
    router.push('/users/my-ticket');
  };

  const handleChangePage = (_, page) => {
    const limit = LIMIT_DEFAULT;
    const offset = (page - 1) * limit;
    Router.push({
      pathname: Router.pathname,
      query: {
        ...filter,
        offset,
        limit,
      },
    });
  };

  const handleFilter = () => {
    if (filter.fromTime && filter.toTime && new Date(filter.fromTime) > new Date(filter.toTime)) {
      NotifyUtils.error('Không thể nhập thời gian bắt đầu lớn hơn thời gian kết thúc');
      return;
    }
    Router.push({
      pathname: Router.pathname,
      query: {
        offset: OFFSET_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...filter,
      },
    });
  };

  const handleRemoveFilter = () => {
    Router.push({
      pathname: Router.pathname,
      query: {
        offset: OFFSET_DEFAULT,
        limit: LIMIT_DEFAULT,
      },
    });
    setFilter({
      fromTime: DEFAULT_TIME,
      toTime: DEFAULT_TIME,
    });
  };

  const handleChangeDate = (key, value) => {
    setFilter({ ...filter, [key]: value });
  };

  const handleClosePopup = () => {
    toggleNewTicket();
    router.push('/users/my-ticket');
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <Grid container justifyContent="flex-start">
        <Grid item xs={6} md={3}>
          <TextField
            id="fromTime"
            label="Từ ngày"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              style: {
                lineHeight: '1rem',
              },
            }}
            fullWidth
            size="small"
            className={clsx(styles.date_time, styles.from_time)}
            value={filter?.fromTime || ''}
            onChange={(e) => handleChangeDate('fromTime', e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            id="toTime"
            label="Đến ngày"
            type="date"
            value={filter?.toTime || ''}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            className={clsx(styles.date_time, styles.to_time)}
            inputProps={{
              style: {
                lineHeight: '1rem',
              },
            }}
            onChange={(e) => handleChangeDate('toTime', e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" style={{ marginBottom: '20px', marginRight: '10px' }} onClick={handleFilter}>
            Lọc
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="default" style={{ marginBottom: '20px', marginRight: '20px' }} onClick={handleRemoveFilter}>
            Xoá
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" style={{ marginBottom: '20px', marginRight: '20px' }} onClick={toggleNewTicket}>
            <AddCommentOutlined /> Tạo yêu cầu
          </Button>
        </Grid>
      </Grid>
      <InfoTable heads={heads} className={styles.bottom_square}>
        {ticketList?.length > 0 ? (
          ticketList?.map((ticket) => {
            const ticketStatus = TICKET_STATUS.find((ticketStt) => ticketStt.value === ticket.status) || TICKET_STATUS.DEFAULT;
            const ticketReasons = ticket?.reasonCodes?.map((reasonCode) => mapReasonsTicket.get(reasonCode))?.filter((reasons) => reasons);
            return (
              <TableRow hover key={uuidv4()} onClick={() => handleViewDetail(ticket)} className={styles.detail_text}>
                <TableCell align="left">{EnumsTicket.TicketLabelEnums[ticket?.type]?.label || ''}</TableCell>
                {/* <TableCell align="left">{ticket.orderCode}</TableCell> */}
                <TableCell align={ALIGN.LEFT}>
                  <Grid container direction="column" spacing={1}>
                    {ticketReasons?.length > 0 ? (
                      ticketReasons?.map((reasons) => (
                        <Grid item key={uuidv4()}>
                          <Button variant="contained" key={uuidv4()} disabled className={styles.reason_button}>
                            {reasons.name || ''}
                          </Button>
                        </Grid>
                      ))
                    ) : (
                      <> - </>
                    )}
                  </Grid>
                </TableCell>
                <TableCell align="left">{DateTimeUtils.getFormattedDate(new Date(ticket?.createdTime || null), 'DD/MM/YYYY HH:mm:ss')}</TableCell>

                <TableCell align={ALIGN.LEFT}>
                  <Chip
                    icon={ticketStatus?.icon || null}
                    label={ticketStatus?.label || null}
                    className={styles.ticket_status_chip}
                    style={{ backgroundColor: ticketStatus?.color || null }}
                  />
                </TableCell>
                <TableCell align={ALIGN.CENTER}>
                  <Button onClick={() => handleViewDetail(ticket)} className={styles.detail_text}>
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow hover key={uuidv4()}>
            <TableCell component="th" scope="row" colSpan={6} align={ALIGN.CENTER}>
              Bạn chưa gửi phản hồi
            </TableCell>
          </TableRow>
        )}
        {open && <TicketDetailModal visible={open} onClose={handleCloseDetail} ticketId={ticketId} user={user} reloadFunc={reloadFunc} />}
      </InfoTable>
      {ticketList.length > 0 && (
        <div className={styles.justify_center}>
          <Pagination count={pageSize} onChange={handleChangePage} page={currentPage} />
        </div>
      )}
      {isShowNewTicket && <TicketFormModal onClose={handleClosePopup} visible={isShowNewTicket} user={user} reloadFunc={reloadFunc} />}
    </div>
  );
}

export default TicketTable;
