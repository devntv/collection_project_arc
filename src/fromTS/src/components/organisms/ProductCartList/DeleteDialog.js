import NewCustomModal from 'components/mocules/NewCustomModal';
import { memo } from 'react';

const DeleteDialog = memo((props) => {
  const { onClose, onClickOk, visible, totalItemSelected, totalItem } = props;

  return (
    <NewCustomModal
      visible={visible}
      onClose={onClose}
      title="Thông báo"
      btnOk="Có"
      content={`Bạn có muốn xóa ${totalItemSelected}/${totalItem} sản phẩm đã chọn khỏi giỏ hàng?`}
      btnOnClose="Hủy"
      onClickOk={onClickOk}
    />
  );
});

export default DeleteDialog;
