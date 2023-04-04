import ModalCustom from '@thuocsi/nextjs-components/simple-dialog/dialogs'
import React from 'react'

export default function AutoApplyModal({
    open,
    onClose,
    onExcute,
    showText=false
}) {
    return (
        <ModalCustom
            open={open}
            title="Thông báo"
            primaryText="Đồng ý"
            closeText="Đóng"
            onClose={onClose}
            onExcute={onExcute}
        >
            Cài đặt tự động áp dụng <strong>không</strong> thể bật trong trường hợp sau:
            <li>Điều kiện theo <strong>sản phẩm</strong> có loại kết hợp điều kiện là <strong>OR</strong> </li>
            <li>Tồn tại điều kiện theo <strong>tag sản phẩm</strong></li>
            <br/>
            Vui lòng cập nhật thông tin mã khuyến mãi.
            {showText && (<>Bạn có chắc muốn <strong>tắt</strong> cài đặt tự động áp dụng?</>)}
        </ModalCustom>
    )
}
