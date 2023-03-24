import { Grid, makeStyles, Step, StepConnector, StepContent, StepLabel, Stepper, Typography, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import {
  ICON_STEP_COMPLETED,
  ICON_STEP_CONFIRMED,
  ICON_STEP_DELIVERED,
  ICON_STEP_DELIVERING,
  ICON_STEP_EXIT,
  ICON_STEP_PROCESSING,
  ICON_STEP_TRANSPORTING,
  ICON_STEP_WAIT_TO_CONFIRM,
} from 'constants/Icons';
import { DateTimeUtils } from 'utils';
import styles from './styles.module.css';

const ColorlibConnector = withStyles({
  active: {
    '& $line': {
      backgroundColor: '#DCDBDB!important',
      maxWidth: '2px',
      marginLeft: '-1px !important',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#DCDBDB!important',
      maxWidth: '2px',
    },
  },
  line: {
    border: 'none !important',
    backgroundColor: 'transparent',
    width: '5px !important',
    maxWidth: '1px ',
    borderLeft: '2px  dashed #DCDBDB !important',
    marginLeft: '-1px !important',
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    border: '4px solid #ced4da',
    zIndex: 1,
    color: '#ced4da',
    width: 2,
    height: 2,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '11px',
  },
  active: {
    border: '1px solid #ced4da',
    background: 'white',
    color: '#ced4da',
  },
  completed: {
    border: '1px solid #ced4da',
    background: 'white',
    color: '#ced4da',
  },
  StepContent: {
    borderLeft: '2px dashed #DCDBDB',
    marginBottom: '2px',
  },
});
const MapStep = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 0,
  [ENUM_ORDER_STATUS.CONFIRMED]: 1,
  [ENUM_ORDER_STATUS.PROCESSING]: 2,
  [ENUM_ORDER_STATUS.WAIT_TO_DELIVER]: 2,
  [ENUM_ORDER_STATUS.TRANSPORTING]: 3,
  [ENUM_ORDER_STATUS.DELIVERING]: 4,
  [ENUM_ORDER_STATUS.DELIVERED]: 5,
  [ENUM_ORDER_STATUS.COMPLETED]: 6,
};

const ColorlibStepIcon = ({ icon, active, completed }) => {
  const iconsStep = {
    1: <ICON_STEP_WAIT_TO_CONFIRM />,
    2: <ICON_STEP_CONFIRMED />,
    3: <ICON_STEP_PROCESSING />,
    4: <ICON_STEP_TRANSPORTING />,
    5: <ICON_STEP_DELIVERING />,
    6: <ICON_STEP_DELIVERED />,
    7: <ICON_STEP_COMPLETED />,
  };
  return <div className={clsx(styles.connector, active && styles.activeStep, completed && styles.completedStep)}>{iconsStep[String(icon)]}</div>;
};

// processStartTime: ngày bắt đầu xử lý
// deliveredTime: ngày đã giao
// outboundDate: ngày giao hàng
// confirmationDate: ngày đã xác nhận
// completedTime: ngày hoàn tất
function OrderDetailStep({ order, logs = [] }) {
  const {
    createdTime,
    deliveryDate,
    status,
    processStartTime,
    deliveredTime,
    // outboundDate,
    confirmationDate,
    completedTime,
    lastUpdatedTime,
    cancelTime,
    saleOrderStatus,
  } = order;

  // khi tplStatus là picked & status đơn là delivering => transsporting => lấy thời gian
  const timeTransporting = logs?.find((item) => item.status === ENUM_ORDER_STATUS.DELIVERING && item.extraData.tplStatus === 'PICKED')?.actionTime;

  // khi tplStatus là delivering & status đơn là delivering => delivering => lấy thời gian
  const timeDelivering = logs?.find(
    (item) => item.status === ENUM_ORDER_STATUS.DELIVERING && item.extraData.tplStatus === ENUM_ORDER_STATUS.DELIVERING,
  )?.actionTime;

  const statusOrder = status === 'DELIVERING' && saleOrderStatus === 'TRANSPORTING' ? 'TRANSPORTING' : status;

  let newStepsExit = [];
  const classes = useColorlibStepIconStyles();

  const steps = [
    {
      label: 'Chờ xác nhận',
      value: [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM],
      timeField: createdTime,
    },
    {
      label: 'Đã xác nhận',
      value: [ENUM_ORDER_STATUS.CONFIRMED],
      timeField: confirmationDate || '',
    },

    {
      label: 'Đang xử lý',
      value: [ENUM_ORDER_STATUS.PROCESSING],
      timeField: processStartTime || '',
    },
    {
      label: 'Đang trung chuyển',
      value: [ENUM_ORDER_STATUS.TRANSPORTING],
      timeField: timeTransporting ? timeTransporting * 1000 : '',
    },
    {
      label: 'Đang giao hàng',
      value: [ENUM_ORDER_STATUS.DELIVERING],
      timeField: timeDelivering ? timeDelivering * 1000 : '',
    },
    {
      label: 'Đã giao',
      value: [ENUM_ORDER_STATUS.DELIVERED],
      timeField: deliveredTime || '',
    },
    {
      label: 'Hoàn tất',
      value: [ENUM_ORDER_STATUS.COMPLETED],
      timeField: completedTime || '',
    },
  ];

  const stepsExit = [
    {
      label: 'Chờ xác nhận',
      value: [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM],
      timeField: createdTime,
    },
    {
      label: 'Đã xác nhận',
      value: [ENUM_ORDER_STATUS.CONFIRMED],
      timeField: confirmationDate || null,
    },
    {
      label: 'Đang xử lý',
      value: [ENUM_ORDER_STATUS.PROCESSING],
      timeField: processStartTime || null,
    },
    {
      label: 'Đã hủy',
      value: [ENUM_ORDER_STATUS.CANCEL],
      timeField: cancelTime || lastUpdatedTime || '',
    },
  ];

  const checkExitOrder = () => {
    if (statusOrder === 'CANCEL') {
      newStepsExit = stepsExit.filter((obj) => obj.timeField !== null);
    }
  };
  checkExitOrder();

  const ColorlibStepIconCancel = ({ icon, active, completed }) => {
    const iconsStep = {
      1: <ICON_STEP_WAIT_TO_CONFIRM />,
    };
    let newIconSteps = { ...iconsStep };

    switch (newStepsExit.length) {
      case 2:
        newIconSteps = { ...newIconSteps, 2: <ICON_STEP_EXIT /> };
        break;
      case 3:
        newIconSteps = { ...newIconSteps, 2: <ICON_STEP_CONFIRMED />, 3: <ICON_STEP_EXIT /> };
        break;
      default: {
        newIconSteps = { ...newIconSteps, 2: <ICON_STEP_CONFIRMED />, 3: <ICON_STEP_PROCESSING />, 4: <ICON_STEP_EXIT /> };
        break;
      }
    }
    return <div className={clsx(styles.connector, active && styles.exitStep, completed && styles.completedStep)}>{newIconSteps[String(icon)]}</div>;
  };
  const checkActiveStepExit = () => newStepsExit.findIndex((item) => item.label === 'Đã hủy');

  const checkRenderOrderCancel = () => {
    if (statusOrder === 'CANCEL') {
      return (
        <Stepper
          orientation="vertical"
          activeStep={statusOrder === 'CANCEL' && checkActiveStepExit()}
          style={{ padding: 0 }}
          connector={<ColorlibConnector />}
        >
          {newStepsExit.map(({ label, value, timeField }) => (
            <Step key={value} style={{ minHeight: '40px' }}>
              <StepLabel StepIconComponent={ColorlibStepIconCancel} className={styles.label}>
                {label}
                <StepLabel className={styles.timeLine}>
                  {timeField &&
                    `${DateTimeUtils.getFormattedDate(new Date(timeField), 'HH:mm:ss')} Ngày ${DateTimeUtils.getFormattedDate(
                      new Date(timeField),
                      'DD/MM/YYYY',
                    )}`}
                </StepLabel>
              </StepLabel>

              <StepContent className={statusOrder !== 'COMPLETED' ? classes.StepContent : ''}>
                <Typography className={styles.Timeline} />
              </StepContent>
            </Step>
          ))}
        </Stepper>
      );
    }
    return (
      <Stepper
        orientation="vertical"
        activeStep={statusOrder !== 'CANCEL' && MapStep[statusOrder]}
        style={{ padding: 0 }}
        connector={<ColorlibConnector />}
      >
        {steps.map(({ label, value, timeField }) => (
          <Step key={value} style={{ minHeight: '40px' }}>
            <StepLabel StepIconComponent={ColorlibStepIcon} className={styles.label}>
              {label}
              <StepLabel className={styles.timeLine}>
                {timeField &&
                  `${DateTimeUtils.getFormattedDate(new Date(timeField), 'HH:mm:ss')} Ngày ${DateTimeUtils.getFormattedDate(
                    new Date(timeField),
                    'DD/MM/YYYY',
                  )}`}
              </StepLabel>
            </StepLabel>

            <StepContent className={statusOrder !== 'COMPLETED' ? classes.StepContent : ''}>
              <Typography className={styles.Timeline} />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    );
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6} sm={3} className={styles.contentDetail}>
        Ngày mua
      </Grid>
      <Grid item xs={6} sm={9} className={styles.contentValue}>
        {createdTime &&
          `${DateTimeUtils.getFormattedDate(new Date(createdTime), 'HH:mm:ss')} ${DateTimeUtils.getFormattedWithDate(new Date(createdTime))}`}
      </Grid>
      <Grid item xs={6} sm={3} className={styles.contentDetail}>
        Ngày giao
      </Grid>
      <Grid item xs={6} sm={9} className={styles.contentValue}>
        dự kiến giao ngày {deliveryDate ? DateTimeUtils.getFormattedWithDate(new Date(deliveryDate)) : 'chưa xác định'}
      </Grid>

      <Grid container xs={12} item style={{ marginTop: '10px' }}>
        {checkRenderOrderCancel()}
      </Grid>
    </Grid>
  );
}

export default OrderDetailStep;
