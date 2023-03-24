import Image from 'next/image';
import styles from './styles.module.css';

const HowToOrderAndPayment = () => (
  <>
    <h1 className={styles.title}>Hướng dẫn đặt hàng & thanh toán</h1>
    <ol type="I">
      <h4 className={styles.text}>
        <li>
          <u>HƯỚNG DẪN ĐẶT HÀNG</u>
        </li>
      </h4>
      <p className={styles.desc}>Để đặt hàng, bạn vui lòng thực hiện các bước sau:</p>
      <ol type="1" className={styles.textDesc}>
        <li>
          <u>Đăng nhập hoặc đăng ký tài khoản</u>
        </li>
        <ol className={styles.edit}>
          <li>
            <span>- Bạn vui lòng đăng nhập bằng số điện thoại đã đăng ký ở thuocsi.vn.</span>
          </li>
          <li>
            <span>
              - Trong trường hợp bạn chưa có tài khoản, bạn vui lòng bấm vào mục “đăng ký” để tạo tài khoản hoặc bạn có thể liên hệ qua hotline:{' '}
              <b>028 7300 8840</b> để được hỗ trợ đăng ký tạo tài khoản.
            </span>
          </li>
        </ol>
        <li>
          <u>Tìm kiếm sản phẩm và đặt hàng</u>
        </li>
        <ol className={styles.edit}>
          <li>
            <span>- thuocsi.vn có hơn 10,000 sản phẩm dược chính hãng, đa dạng cho nhà thuốc lựa chọn</span>
          </li>
        </ol>
        <p className={styles.desc}>Cách 1: Đặt hàng nhanh</p>
        <ol className={styles.edit}>
          <li>
            <span>
              - Sau khi đăng nhập, bấm vào <b>ĐẶT HÀNG NHANH</b> ở đầu trang
            </span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image8.jpg" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <span>- Gõ tên sản phẩm vào thanh tìm kiếm</span>
          </li>
          <li>
            <span>- Chọn số lượng mong muốn và XEM GIỎ HÀNG</span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image10.jpg" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <span>- Kiểm tra lại sản phẩm và tiến hành thanh toán</span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image9.jpg" layout="fill" objectFit="contain" />
            </div>
          </li>
        </ol>
        <p className={styles.desc}>Cách 2: Đặt hàng thông thường và kiểm tra giỏ hàng</p>
        <ol className={styles.edit}>
          <li>
            <span>
              <span className={styles.highlight}>Bước 1:</span> Sau khi đăng nhập tài khoản, bấm vào menu
              <span className={styles.highlight}> SẢN PHẨM</span> hoặc sử dụng thanh công cụ
              <span className={styles.highlight}> TÌM KIẾM SẢN PHẨM </span>
            </span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image12.jpg" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <span>
              <span className={styles.highlight}> *Gõ tên thuốc vào thanh công cụ</span>, sau đó click chọn loại thuốc mà bạn muốn mua. Chọn số lượng
              mong muốn. Hệ thống sẽ cập nhật số lượng sản phẩm vào giỏ hàng của bạn
            </span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image11.jpg" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image2.png" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <span>
              <span className={styles.highlight}>Bước 2:</span> Kiểm tra giỏ hàng
            </span>
          </li>
          <li>
            <span>- Bạn có thể điều chỉnh lại số lượng sản phẩm. Hệ thống sẽ tự động cập nhật lại số lượng sản phẩm.</span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image1.png" layout="fill" objectFit="contain" />
            </div>
          </li>
          <li>
            <span>- Nếu muốn thêm sản phẩm, chọn TIẾP TỤC ĐẶT HÀNG. Hệ thống sẽ chuyển sang trang Đặt Hàng Nhanh.</span>
          </li>
          <li>
            <span>
              - Bạn có thể thao tác chọn mua 1 phần giỏ hàng bằng cách tick chọn vào những sản phẩm muốn mua hoặc tick chọn tất cả để mua toàn bộ giỏ
              hàng.{' '}
            </span>
          </li>
          <li>
            <div className={styles.wrapperImg}>
              <Image src="/images/how-to-order-and-payment/image4.png" layout="fill" objectFit="contain" />
            </div>
          </li>
        </ol>
      </ol>
      <h4 className={styles.text}>
        <li>
          <u>HƯỚNG DẪN THANH TOÁN</u>
        </li>
      </h4>
      <p className={styles.desc}>Vui lòng nhập đầy đủ:</p>
      <ol className={styles.edit}>
        <li>
          <span>- THÔNG TIN GIAO HÀNG</span>
        </li>
        <li>
          <div className={styles.wrapperImg}>
            <Image src="/images/how-to-order-and-payment/image3.png" layout="fill" objectFit="contain" />
          </div>
        </li>
        <li>
          <span>
            -
            <a className={styles.linkInvoice} href="https://thuocsihotro.helpwise.help/articles/214772-xut-ha-n--ti-thuocsivn">
              {' '}
              THÔNG TIN XUẤT HÓA ĐƠN
            </a>{' '}
            (trong trường hợp muốn nhận hoá đơn)
          </span>
        </li>
        <li>
          <span>- Chọn Hình thức giao hàng và Hình thức thanh toán</span>
        </li>
        <li>
          <div className={styles.wrapperImg}>
            <Image src="/images/how-to-order-and-payment/image7.png" layout="fill" objectFit="contain" />
          </div>
        </li>
        <li>
          <span>- Tick vào: Tôi đồng ý với Điều khoản sử dụng</span>
        </li>
        <li>
          <div className={styles.wrapperImg}>
            <Image src="/images/how-to-order-and-payment/image5.png" layout="fill" objectFit="contain" />
          </div>
        </li>
        <li>
          <span>
            - Sau đó bấm nút <b>"Thanh toán"</b> để kết thúc thanh toán đơn hàng.{' '}
          </span>
        </li>
        <li>
          <div className={styles.wrapperImg}>
            <Image src="/images/how-to-order-and-payment/image6.png" layout="fill" objectFit="contain" />
          </div>
        </li>
      </ol>
      <p className={styles.textEnd}>Chúc bạn đặt hàng thành công!</p>
    </ol>
  </>
);

export default HowToOrderAndPayment;
