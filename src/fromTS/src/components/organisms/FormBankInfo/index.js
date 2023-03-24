/* eslint-disable import/no-named-as-default-member */
import { Typography } from '@material-ui/core';
import { BankClient, CustomerClient, getFirst, isValid, isValidWithoutData } from 'clients';
import { Button } from 'components/atoms';
import InputV2 from 'components/atoms/InputV2';
import AutoComplete from 'components/mocules/AutoComplete';
import { useAuth } from 'context';
import { useCallback, useEffect, useState } from 'react';
import BankService from 'services/BankService';
import { NotifyUtils } from 'utils';
import { cleanAccents } from 'utils/ValidateUtils';
import styles from './styles.module.css';
import validateForm from './validateForm';

const FormBankInfo = () => {
  const {
    user: { customerID },
  } = useAuth();
  const [val, setVal] = useState({
    code: '',
    bankCode: '',
    bankName: '',
    bankBranch: '',
    bankAccountName: '',
    bankID: 0,
    bankBranchID: 0,
    bankBranchCode: '',
    customerID,
  });
  const [val2, setVal2] = useState({ bankName: '', bankBranch: '' });
  const [bankId, setBankId] = useState(0);
  const [listBankName, setListBankName] = useState([]);
  const [listBranch, setListBranch] = useState([]);

  const loadData = useCallback(async () => {
    const banks = await BankService.getBanks();
    setListBankName([...banks]);
    const bankAccountInfoList = await CustomerClient.getBankAccountInfo({});
    if (isValid(bankAccountInfoList)) {
      const bankInfo = getFirst(bankAccountInfoList);
      const {
        code = '',
        bankCode = '',
        bankName = '',
        bankBranch = '',
        bankAccountName = '',
        bankID = 0,
        bankBranchID = 0,
        bankBranchCode = '',
      } = bankInfo || {};

      setVal({ code, bankCode, bankName, bankBranch, bankAccountName, bankID, bankBranchID, bankBranchCode, customerID });
      setBankId(bankID);
      if (bankID !== 0) {
        const [currentBank, currentBranchRes] = await Promise.all([
          BankService.getBankById({ bankId: bankID }),
          BankClient.getBranchById({ branchId: bankBranchID }),
        ]);
        const currentBranch = getFirst(currentBranchRes);
        setVal2({ bankName: currentBank?.name || '', bankBranch: currentBranch?.name || '' });
      }
    }
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const getBranches = async (id) => {
    const branches = await BankService.getBranchesByBankId({ bankId: id });
    setListBranch([...branches]);
  };

  useEffect(() => {
    getBranches(bankId);
  }, [bankId]);

  const isEdit = val?.code;
  // const handleChangeValue = (key, value) => {
  //   setVal({ ...val, [key]: value });
  // };

  const handleSubmit = async () => {
    const formData = val;
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string') {
        formData[key] = formData[key].trim();
      }
    });
    try {
      validateForm(formData);
      if (isEdit) {
        const result = await CustomerClient.updateBankAccountInfo({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật thông tin không thành công');
        NotifyUtils.success('Sửa thông tin thành công');
      } else {
        const result = await CustomerClient.createBankAccountInfo({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Tạo mới thông tin không thành công');
        NotifyUtils.success('Tạo thông tin thành công');
      }
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div className={styles.mobileBank_root} style={{ textAlign: 'center', margin: '30px 0' }}>
      <InputV2
        label="Chủ tài khoản (không dấu)"
        id="bankAccountName"
        required
        value={val?.bankAccountName || ''}
        placeholder="Vi du: nguyen van an"
        className={styles.bankAccountName}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setVal({ ...val, bankAccountName: cleanAccents(e.target.value.toUpperCase()) })}
      />
      <InputV2
        label="Số tài khoản"
        id="bankCode"
        required
        value={val?.bankCode || ''}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setVal({ ...val, bankCode: e.target.value })}
      />
      <AutoComplete
        id="bankName"
        label="Chọn ngân hàng"
        required
        options={listBankName}
        // value={val?.bankName || ''}
        inputValue={val2?.bankName}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e, newValue) => {
          setVal({
            ...val,
            bankName: newValue?.value || '',
            bankBranch: '',
            bankBranchID: 0,
            bankID: newValue?.bankId || 0,
            bankBranchCode: newValue?.code || '',
          });
          setBankId(newValue?.bankId || 0);
        }}
        onInputChange={(e, newValue) => setVal2({ ...val2, bankName: newValue, bankBranch: '' })}
      />
      {listBranch.length > 0 && (
        <>
          <AutoComplete
            id="bankBranch"
            label="Chọn chi nhánh"
            options={listBranch}
            // value={val?.bankBranch}
            inputValue={val2?.bankBranch || ''}
            onChange={(e, newValue) => {
              setVal({ ...val, bankBranch: newValue?.value || '', bankBranchID: newValue?.bankBranchId || 0, bankBranchCode: newValue?.code || '' });
            }}
            onInputChange={(e, newValue) => {
              if (newValue) setVal2({ ...val2, bankBranch: newValue });
            }}
          />
          <Typography style={{ fontStyle: 'italic' }}>(Chi nhánh bắt buộc chọn đối với ngân hàng Agribank và Citibank)</Typography>
        </>
      )}
      <div style={{ margin: '30px 0' }}>
        <Button className="my-order__button my-order__button--green" onClick={handleSubmit}>
          Cập nhật{' '}
        </Button>
      </div>
    </div>
  );
};
export default FormBankInfo;
