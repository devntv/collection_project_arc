import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { CustomerClient, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { useAuth } from 'context';
import { useModal } from 'hooks';
import { NotifyUtils } from 'utils';
import DeleteAddressModal from '../DeleteAddressModal';
import styles from './styles.module.css';

const CardComp = ({ isSelect, address, handleOnSelect, handleReloadData, handleEdit, selectAddressCode }) => {
  const { name = '', phone = '', isDefault = false, masterAddress = '', code = '' } = address;
  const {
    user: { customerID },
  } = useAuth();
  const [open, toggle] = useModal();

  const handleDelete = async () => {
    try {
      const result = await CustomerClient.deleteAddress({ code, customerID });
      if (!isValidWithoutData(result)) throw Error(result?.message || 'Xoá địa chỉ không thành công');
      NotifyUtils.success('Xoá địa chỉ thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const handleSetDefault = async () => {
    try {
      const result = await CustomerClient.updateAddressDefault({ code, customerID });
      if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật địa chỉ mặc định không thành công');
      NotifyUtils.success('Cập nhật địa chỉ mặc định thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card
        className={isSelect && selectAddressCode === address.code ? clsx(styles.card_selected, styles.card) : styles.card}
        data-test="card-address"
      >
        <CardHeader action={isDefault ? <div className={styles.default_tag}> Mặc định</div> : <></>} title={name} subheader={phone} />
        <CardContent>
          <div className={styles.float_bottom}>
            <div>
              <div className={styles.ellipsis_2_line}>
                <b> Địa chỉ: </b> {masterAddress}
              </div>
            </div>

            <div className={styles.group_button}>
              {isSelect && (
                <Button
                  variant="contained"
                  className={clsx(styles.action_button, styles.important_action_button)}
                  onClick={() => {
                    handleOnSelect(address);
                  }}
                  data-test="btn-select-address"
                >
                  Giao đến địa chỉ này
                </Button>
              )}
              <Button
                variant="outlined"
                className={isSelect ? clsx(styles.action_button, styles.defaull_button) : clsx(styles.action_button, styles.important_action_button)}
                onClick={() => handleEdit(address)}
              >
                Sửa
              </Button>
              {!isDefault && !isSelect && (
                <Button variant="outlined" className={clsx(styles.action_button, styles.defaull_button)} onClick={handleSetDefault}>
                  Mặc định
                </Button>
              )}
              {!isDefault && (
                <Button variant="outlined" className={styles.action_button} onClick={toggle} data-test="btn-delete-address-card">
                  Xoá
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteAddressModal visible={open} onClose={toggle} onClickOk={handleDelete} />
    </Grid>
  );
};

export default CardComp;
