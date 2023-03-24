import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { LinkComp, ModalButton } from 'components/atoms';
import Cookies from 'js-cookie';
import { memo, useEffect, useState } from 'react';
import { GENERAL_DOMAIN } from 'sysconfig';
import { gtag } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

const FORM_SURVEY = 'https://bit.ly/khaosatgiaodienmoi';
const KEY_COOKIES = 'hasVoted';

const SURVEY_VALUES = {
  BAD: 'BAD',
  NOIDEA: 'NOIDEA',
  GOOD: 'GOOD',
};

const SurveySection = ({ handleChangeRadio, setAlert, surveyValue }) => {
  const handleClickClose = () => {
    setAlert({ isShow: true, isCancel: true });
  };
  return (
    <div style={{ position: 'relative' }}>
      <Typography style={{ fontSize: '16px', color: '#797979', fontFamily: 'ggsm', marginRight: '20px' }}>
        Hãy góp ý giao diện mới thuocsi.vn để chúng tôi cải thiện hơn:
      </Typography>
      <FormControl
        classes={{
          root: styles.formControlSurvey,
        }}
      >
        <RadioGroup
          className={styles.radioGroupSurvey}
          aria-labelledby="survey-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value={SURVEY_VALUES.GOOD}
            control={<Radio color="primary" />}
            checked={surveyValue === SURVEY_VALUES.GOOD}
            label="Rất hài lòng"
          />
          <FormControlLabel
            value={SURVEY_VALUES.NOIDEA}
            control={<Radio color="primary" />}
            checked={surveyValue === SURVEY_VALUES.NOIDEA}
            label="Bình thường"
          />
          <FormControlLabel
            value={SURVEY_VALUES.BAD}
            control={<Radio color="primary" />}
            checked={surveyValue === SURVEY_VALUES.BAD}
            label="Không hài lòng"
          />
        </RadioGroup>
      </FormControl>
      <ModalButton
        disabled={surveyValue === ''}
        classes={{ root: styles.btnSubmitSurvey, disabled: styles.btnSurveyDisabled }}
        onClick={() => setAlert({ isShow: true, isCancel: false })}
      >
        Gửi đánh giá
      </ModalButton>
      <LinkComp href={FORM_SURVEY} target="_blank" onClick={() => gtag.surveyV2()}>
        <Typography className={styles.linkToSurvey}>Làm khảo sát trải nghiệm</Typography>
      </LinkComp>
      <div style={{ position: 'absolute', top: '-8px', right: '-15px' }}>
        <CloseIcon onClick={handleClickClose} htmlColor="#797979" />
      </div>
    </div>
  );
};

const AlertSection = ({ setAlert, handleSubmitForm, alert }) => {
  const { isCancel = false } = alert;
  const message = isCancel ? 'Bạn chọn bỏ qua khảo sát này' : 'Bạn đã thực hiện khảo sát';
  const [timeToHide, setTimeToHide] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToHide((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      handleSubmitForm(isCancel);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Typography style={{ fontFamily: 'ggsm' }}>
      {message}, thông báo sẽ biến mất sau {timeToHide} giây{'  '}
      <Typography
        onClick={() => setAlert((prev) => ({ ...prev, isShow: false }))}
        style={{ display: 'inline', width: 'fit-content', color: '#0e1983', fontWeight: 'bold' }}
      >
        [Hoàn Tác]
      </Typography>
    </Typography>
  );
};

// DEFAULT COMPONENT
const SurveyForm = () => {
  const hasVoted = Cookies.get(KEY_COOKIES);
  const [isRating, setIsRating] = useState(false);
  const [isShowForm, setIsShowForm] = useState(hasVoted !== 'true');
  const [alert, setAlert] = useState({
    isShow: false,
    isCancel: false,
  });
  const [surveyValue, setSurveyValue] = useState('');
  const user = useStore((state) => state?.user) || null;

  const handleChangeRadio = (e) => {
    setIsRating(true);
    setSurveyValue(e.target.value);
  };

  const handleSubmitForm = (isCancel) => {
    // send GA
    const survey = !isCancel ? surveyValue : 'Không khảo sát';
    gtag.voteV2(`ID-${user?.customerID}:${survey}`);

    Cookies.set(KEY_COOKIES, true, { domain: GENERAL_DOMAIN, expires: 90, sameSite: 'Lax' });
    setIsShowForm(false);
  };

  if (!isShowForm) return <></>;

  return (
    <div className={styles.rootSurvey}>
      {!alert.isShow && <SurveySection setAlert={setAlert} handleChangeRadio={handleChangeRadio} isRating={isRating} surveyValue={surveyValue} />}
      {alert.isShow && <AlertSection alert={alert} setAlert={setAlert} handleSubmitForm={handleSubmitForm} />}
    </div>
  );
};

export default memo(SurveyForm);
