import { makeStyles, Step, StepConnector, StepLabel, Stepper, withStyles } from '@material-ui/core';
import {
  AirportShuttle as AirportShuttleIcon,
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  BusinessCenter as BusinessCenterIcon,
  Check as CheckIcon,
  EventAvailable as EventAvailableIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 40,
  },
  active: {
    '& $line': {
      backgroundColor: '#00b46e!important',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#00b46e!important',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    border: '4px solid #ced4da',
    zIndex: 1,
    color: '#ced4da',
    width: 80,
    height: 80,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    border: '4px solid #00b46e',
    background: 'white',
    color: '#00b46e',
  },
  completed: {
    border: '4px solid #00b46e',
    background: 'white',
    color: '#00b46e',
  },
});

function ColorlibStepIcon({ icon, active, completed }) {
  const classes = useColorlibStepIconStyles();

  const icons = {
    1: <AssignmentIcon fontSize="large" />,
    2: <AssignmentTurnedInIcon fontSize="large" />,
    3: <BusinessCenterIcon fontSize="large" />,
    4: <AirportShuttleIcon fontSize="large" />,
    5: <EventAvailableIcon fontSize="large" />,
    6: <CheckIcon fontSize="large" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const steps = ['Chờ xác nhận', 'Đã xác nhận', 'Đang xử lý', 'Đang trung chuyển', 'Đang giao hàng', 'Đã giao', 'Hoàn tất'];

const MappingStep = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 0,
  [ENUM_ORDER_STATUS.CONFIRMED]: 1,
  [ENUM_ORDER_STATUS.PROCESSING]: 2,
  [ENUM_ORDER_STATUS.WAIT_TO_DELIVER]: 2,
  // forbidden
  [ENUM_ORDER_STATUS.DELIVERING]: 3,
  [ENUM_ORDER_STATUS.DELIVERED]: 4,
  [ENUM_ORDER_STATUS.COMPLETED]: 5,
};
const OrderDetailStep = ({ status = 1 }) => (
  <Stepper className={styles.step} alternativeLabel activeStep={status !== 'CANCEL' ? MappingStep[status] : -1} connector={<ColorlibConnector />}>
    {steps.map((label) => (
      <Step key={uuidv4()}>
        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);
export default OrderDetailStep;
