import { Paper } from '@material-ui/core';
import React from 'react';
import BankAccountInfoCardList from '../BankAccountInfoCardList';
import styles from './styles.module.css';

const BankAccountForm = ({ bankAccountInfos }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Tài khoản ngân hàng</h1>
    <BankAccountInfoCardList bankAccountInfos={bankAccountInfos} />
  </Paper>
);

export default BankAccountForm;
