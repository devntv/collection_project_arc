/* eslint-disable arrow-body-style */
import Image from 'next/image';
import styles from './styles.module.css';

const ChinhSachGiaiQuyetKhieuNai = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>CHÍNH SÁCH GIẢI QUYẾT KHIẾU NẠI</h1>
      <ol className={styles.orderedList}>
        <h3>1. Thời gian khiếu nại đơn hàng</h3>
        <ul style={{ listStyleType: 'disc' }}>
          <li>
            thuocsi.vn chỉ tiếp nhận khiếu nại về đơn hàng trong thời gian <span className={styles.textRed}>5 ngày</span> kể từ lúc đơn hàng được cập
            nhật trạng thái đã giao thành công.
          </li>
          <li>
            Đối với các sản phẩm đông lạnh, khách hàng cần gửi yêu cầu khiếu nại trong vòng 24 giờ và đối với các vấn đề liên quan đến chất lượng sản
            phẩm thì thời hạn gửi yêu cầu là trong vòng <span className={styles.textRed}>30 ngày</span> kể từ lúc đơn hàng được cập nhật trạng thái đã
            giao thành công.
          </li>
          <li>
            Để gửi khiếu nại khách hàng vui lòng liên hệ bộ phận CSKH qua số Hotline:{' '}
            <strong>
              <i>028. 7300 8840 (8h – 20h)</i>
            </strong>{' '}
            hoặc gửi phản hồi ngay trên chính đơn hàng tại website thuocsi.vn
          </li>
          <li>Đội ngũ CSKH sẽ tiếp nhận trong 24 giờ và xử lý tối đa trong vòng 12 ngày đối với trường hợp xử lý thu hồi hàng về. </li>
        </ul>

        <h3>2. Cách gửi phản hồi trên đơn hàng</h3>
        <ol>
          <p>
            <strong>Bước 1:</strong> Vào <strong>ĐƠN HÀNG CỦA TÔI</strong> và chọn đơn hàng cần gửi phản hồi
          </p>
          <Image src="/images/chinh-sach-giai-quyet-khieu-nai/step1.png" width={1500} height={800} />
          <p>
            <strong>Bước 2:</strong> Bấm vào nút <strong>GỬI PHẢN HỒI</strong>
          </p>
          <Image src="/images/chinh-sach-giai-quyet-khieu-nai/step2.png" width={800} height={300} />

          <p>
            <strong>Bước 3:</strong> Điền đầy đủ thông tin, chọn <strong>LÝ DO PHẢN HỒI</strong> và <strong>GỬI YÊU CẦU</strong>
          </p>
          <Image src="/images/chinh-sach-giai-quyet-khieu-nai/step3.png" width={600} height={800} />

          <p>
            <strong>thuocsi.vn sẽ ghi nhận phản hồi của khách hàng và nhân viên thuocsi.vn sẽ liên hệ với khách hàng để giải quyết sớm nhất! </strong>
          </p>
        </ol>
      </ol>
    </>
  );
};

export default ChinhSachGiaiQuyetKhieuNai;
