import { Button } from '@material-ui/core';
import styles from './styles.module.css';

const UpdateButton = ({ handleUpdateProfile }) => (
  <Button className={styles.button_update} onClick={handleUpdateProfile}>
    Cập nhật
  </Button>
);

export default UpdateButton;
