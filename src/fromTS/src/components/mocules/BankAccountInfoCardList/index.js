import { Card, CardContent, Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useModal } from 'hooks';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BankAccountInfoCard from '../BankAccountInfoCard';
import BankAccountInfoModal from '../BankAccountInfoModal';
import styles from './styles.module.css';

const BankAccountInfoCardList = ({ bankAccountInfos = [] }) => {
  const [openBankModal, toggleBankModal] = useModal();
  const bankAccountInfo = useRef({
    bankAccountName: '',
    bankBranch: '',
    bankCode: '',
    bankName: '',
  });

  const handleEdit = (info) => {
    bankAccountInfo.current = info;
    toggleBankModal();
  };

  const handleNew = () => {
    bankAccountInfo.current = {
      bankAccountName: '',
      bankBranch: '',
      bankCode: '',
      bankName: '',
    };
    toggleBankModal();
  };

  return (
    <>
      <Grid container spacing={2}>
        {bankAccountInfos.length > 0 &&
          bankAccountInfos.map((info) => <BankAccountInfoCard key={uuidv4()} bankAccountInfo={info} handleEdit={handleEdit} />)}

        {bankAccountInfos.length === 0 && (
          <Grid item xs={12} md={6}>
            <Card className={styles.card} onClick={handleNew}>
              <CardContent>
                <div className={styles.add_icon_column}>
                  <div className={styles.add_icon_row}>
                    <IconButton>
                      <AddCircleIcon size="large" />
                    </IconButton>
                    <b>Thêm tài khoản ngân hàng </b>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <BankAccountInfoModal visible={openBankModal} onClose={toggleBankModal} bankAccountInfo={bankAccountInfo.current} />
    </>
  );
};

export default BankAccountInfoCardList;
