import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const CardComp = ({ bankAccountInfo, handleEdit }) => {
  const { bankAccountName = '', bankBranch = '', bankCode = '', bankName = '' } = bankAccountInfo;
  return (
    <Grid item xs={12} md={6}>
      <Card className={styles.card}>
        <CardHeader />
        <CardContent>
          <div className={styles.float_bottom}>
            <div>
              <div className={styles.ellipsis_2_line}>
                <b> Ngân hàng: </b> {bankName}
              </div>
              <div className={styles.ellipsis_2_line}>
                <b> Số tài khoản: </b> {bankCode}
              </div>
              <div className={styles.ellipsis_2_line}>
                <b> Chủ tài khoản: </b> {bankAccountName}
              </div>
              <div className={styles.ellipsis_2_line}>
                <b> Chi nhánh: </b> {bankBranch}
              </div>

              <div className={styles.group_button}>
                <Button
                  variant="outlined"
                  className={clsx(styles.action_button, styles.important_action_button)}
                  onClick={() => handleEdit(bankAccountInfo)}
                >
                  Sửa
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardComp;
