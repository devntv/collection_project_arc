import styles from './styles.module.css';

const HowToReturnRefund = () => (
  <>
    <h1 className={styles.title}>CHÍNH SÁCH ĐỔI TRẢ</h1>
    <ol type="1">
      <h4 className={styles.text}>
        <li>
          <u>Thời gian yêu cầu trả hàng và hoàn tiền </u>
        </li>
      </h4>
      <ol className={styles.edit}>
        <li>
          <span>
            - Khách hàng có thể gửi yêu cầu trả hàng trong vòng <span className={styles.textDanger}> 5 ngày</span> kể từ lúc đơn hàng được giao hàng
            thành công.{' '}
          </span>
        </li>
        <li>
          <span>
            - Đối với các sản phẩm đông lạnh (trừ trường hợp chưa nhận được hàng), khách hàng cần gửi yêu cầu trả trong vòng 24 giờ kể từ lúc đơn hàng
            được giao hàng thành công.
          </span>
        </li>
        <li>
          <span>
            - Đối với các sản phẩm trả hàng liên quan đến chất lượng thì thời hạn gửi yêu cầu trả trong vòng{' '}
            <span className={styles.textDanger}> 30 ngày</span> kể từ lúc đơn hàng được giao hàng thành công.
          </span>
        </li>
      </ol>

      <h4 className={styles.text}>
        <li>
          <u>Lý do trả hàng và hoàn tiền </u>
        </li>
      </h4>
      <p className={styles.desc}>Khách hàng có thể yêu cầu trả hàng và hoàn tiền trong các trường hợp sau: </p>
      <ol className={styles.edit}>
        <li>
          <span>- Hàng nhận được bị thiếu/sai/bể vỡ /khác mô tả/đã qua sử dụng.</span>
        </li>
        <li>
          <span>
            - Hàng được hoàn trả phải đảm bảo còn mới 100% chưa được sử dụng, còn nguyên nhãn mác, nguyên hộp có mã QR thuocsi.vn, phụ kiện và quà
            tặng kèm theo (nếu có). thuocsi.vn không đổi hàng đã sử dụng hoặc bao bì sản phẩm đã bị rách, viết, xóa…
          </span>
        </li>
      </ol>
      <p className={styles.desc}>Bằng chứng cần cung cấp </p>
      <ol className={styles.edit}>
        <li>
          <span>- Khách hàng cần cung cấp hình ảnh hoặc video thể hiện rõ tình trạng sản phẩm nhận được. </span>
        </li>
        <li>
          <span>
            - thuocsi.vn có thể yêu cầu bổ sung bằng chứng nếu: Bằng chứng khách hàng cung cấp bị mờ, nhòe, không thể hiện được tình trạng sản phẩm
            nhận được.
          </span>
        </li>
      </ol>
      <p className={styles.desc}>Tình trạng của hàng trả lại </p>
      <ol className={styles.edit}>
        <li>
          <span>
            - Sau khi đã gửi yêu cầu Trả hàng/Hoàn tiền, nếu thuocsi.vn đồng ý cho bạn trả hàng, bạn cần gửi trả hàng về thuocsi.vn theo hướng dẫn của
            nhân viên chăm sóc khách hàng.{' '}
          </span>
        </li>
        <li>
          <span>- Để hạn chế các rắc rối phát sinh liên quan đến trả hàng, bạn lưu ý:</span>
          <div className={styles.textMore}>
            <span>+ Đóng gói theo quy định về đóng gói hàng hóa của thuocsi.vn </span>
            <span>+ Gửi trả toàn bộ sản phẩm (bao gồm tất cả phụ kiện đi kèm, quà tặng... nếu có)</span>
            <span>+ Sản phẩm gửi trả phải trong tình trạng như khi nhận hàng </span>
          </div>
        </li>
      </ol>
      <p className={styles.desc}>Phí trả hàng </p>
      <ol className={styles.edit}>
        <li>
          <span>- Phí chuyển phát sẽ được hoàn trả trong trường hợp hàng nhận được bị thiếu/sai/bể vỡ/khác mô tả/đã qua sử dụng </span>
        </li>
        <li>
          <span>
            - Trong trường hợp khách hàng trả hàng do đặt nhầm hoặc không muốn nhận, thuocsi.vn sẽ tính phí là 30,000 và được trừ vào khi khách hàng
            nhận tiền hoàn lại.
          </span>
          <p className={styles.textDanger}>
            (Trong trường hợp khách hàng đặt nhầm: khối lượng của sản phẩm trả về lớn hơn 5kg hoặc là hàng cồng kềnh, thuocsi.vn sẽ thu thêm phí dựa
            vào chi phí bên nhà vận chuyển báo và các mã giảm giá đi kèm sẽ được hệ thống tự động tính lại dựa theo giá trị thực nhận sau khi yêu cầu
            hoàn trả hàng).
          </p>
        </li>
      </ol>
      <h4 className={styles.text}>
        <li>
          <u>Quy trình trả hàng và hoàn tiền</u>
        </li>
      </h4>
      <ol className={styles.edit}>
        <li>
          <span>
            <span className={styles.textStep}> Bước 1:</span> Khách hàng yêu cầu trả hàng trên tài khoản hoặc liên hệ hotline:{' '}
            <span className={styles.textBold}>028. 7300 8840</span> để yêu cầu việc trả sản phẩm, thuocsi.vn sẽ hướng dẫn bạn cách đổi/trả sản phẩm
            (nếu quá trình đổi/trả sản phẩm của khách hợp lệ).{' '}
          </span>
        </li>
        <li>
          <span>
            <span className={styles.textStep}> Bước 2:</span> thuocsi.vn sẽ liên hệ đơn vị vận chuyển để đến thu hồi kiện hàng.
          </span>
        </li>
        <li>
          <span>
            <span className={styles.textStep}> Bước 3:</span> Đơn vị vận chuyển sẽ đến thu hồi sản phẩm và chuyển về thuocsi.{' '}
          </span>
        </li>
        <li>
          <span>
            <span className={styles.textStep}> Bước 4:</span> thuocsi.vn nhận sản phẩm và kiểm tra sản phẩm.{' '}
          </span>
        </li>
        <li>
          <span>
            <span className={styles.textStep}> Bước 5:</span> Khách hàng nhận tiền hoàn lại.{' '}
          </span>
        </li>
      </ol>
      <h4 className={styles.text}>
        <li>
          <u>Một số quy định về đóng gói hàng hóa khi khách hàng gửi trả đơn hàng</u>
        </li>
      </h4>
      <p className={styles.desc}>- Đối với hàng hóa thông thường: </p>
      <ol className={styles.edit}>
        <li>
          <span>+ Đặt đúng chiều sản phẩm, dán chặt nắp mở tránh tình trạng sản phẩm bị đổ hay rò rỉ ra ngoài thùng hàng</span>
        </li>
        <li>
          <span>+ Nếu sản phẩm có dấu hiệu bị đổ bể hay rò rỉ, bạn nên sử dụng bao bì nhựa để bọc bên ngoài. </span>
        </li>
        <li>
          <span>+ Nếu sản phẩm có hình dáng đặc biệt cần phải đóng gói cẩn thận.</span>
        </li>
      </ol>
      <p className={styles.desc}>- Lưu ý: </p>
      <ol className={styles.edit}>
        <li>
          <span>+ Không dán băng keo trực tiếp lên hộp sản phẩm vì yêu cầu trả có thể sẽ bị từ chối nếu hộp sản phẩm bị hư hỏng. </span>
        </li>
        <li>
          <span>
            + Liên hệ Hotline thuocsi.vn: <span className={styles.textBold}>028. 7300 8840 (8h – 20h)</span> khi có bất cứ khó khăn xảy ra trong quá
            trình chuyển sản phẩm.{' '}
          </span>
        </li>
      </ol>
    </ol>
  </>
);

export default HowToReturnRefund;
