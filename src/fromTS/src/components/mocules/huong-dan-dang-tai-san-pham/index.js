import Image from 'next/image';
import styles from './styles.module.css';

const HowToUploadProducts = () => (
  <>
    <h1 className={styles.title}>Hướng dẫn đăng sản phẩm trên Seller Center</h1>
    <div className={styles.videoWrapper}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/bjeevczoXUQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className={styles.textDesc}>🍁Có 2 cách để đăng tải sản phẩm như sau:</p>
    <div style={{ background: '#ffffff' }}>
      <div className={styles.wrapperImg}>
        <Image src="/images/how-to-upload-products/image1.jpg" layout="fill" objectFit="contain" />
      </div>
      <div className={styles.wrapperImg}>
        <Image src="/images/how-to-upload-products/image2.jpg" layout="fill" objectFit="contain" />
      </div>
    </div>
    <p className={styles.textDesc}>
      📧 Mọi thắc mắc vui lòng inbox khung chat hỗ trợ trên website hoặc gửi email về{' '}
      <a href="mailto:banhang@thuocsi.vn" className={styles.highlight}>
        banhang@thuocsi.vn
      </a>
    </p>
    {/* <p className={styles.textDesc}>🌟Video hướng dẫn chi tiết cách tạo 1 sản phẩm:</p>
    <div className={styles.videoWrapper}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7FSHipw9GE8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div> */}
    {/* <p className={styles.textDesc}>🌟Video hướng dẫn chi tiết cách tạo sản phẩm hàng loạt:</p>
    <div className={styles.videoWrapper}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/863I1KSdYII"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div> */}
  </>
);

export default HowToUploadProducts;
