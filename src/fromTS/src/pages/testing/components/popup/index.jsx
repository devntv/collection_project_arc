/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import NewCustomModal from 'components/mocules/NewCustomModal';
import useModal from 'hooks/useModal';
import React from 'react';

const NewModalTest = () => {
  const [isShowYesNo, toggleYesNo] = useModal();
  const [isShowCompany, toggleCompany] = useModal();

  const [isShowPromotion, togglePromotion] = useModal();

  const infoCompany = {
    name: 'Công ty TNHH ABC Medx Store',
    product: 83,
    followers: '123k',
    rate: '5',
    numberRate: 100,
    join: '2 năm',
    view: 100,
  };

  const infoPromotion = {
    promotionCode: 'ABC',
    expDate: '12/12/2021',
    cond: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  };

  const title = 'Are you sure you want to submit it right now?';
  const content = 'There’s a lot of thing will be changed after you submit this part to our system.';
  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={toggleYesNo} onClose={toggleYesNo}>
          popup yes no
        </Button>
        <NewCustomModal icon={false} visible={isShowYesNo} onClose={toggleYesNo} title={title} content={content} btnOk="Yes" btnOnClose="No" />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={toggleCompany} onClose={toggleCompany}>
          popup information store
        </Button>
        <NewCustomModal icon={false} visible={isShowCompany} onClose={toggleCompany} infoCompany={infoCompany} />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={togglePromotion} onClose={togglePromotion}>
          Popup promotion
        </Button>
        <NewCustomModal icon={false} visible={isShowPromotion} onClose={togglePromotion} infoPromotion={infoPromotion} />
      </div>
    </>
  );
};

export default NewModalTest;
