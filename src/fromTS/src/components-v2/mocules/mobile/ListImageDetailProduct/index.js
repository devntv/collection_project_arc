import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ListImageDetailProduct = ({ images }) => (
  <div className={styles.container}>
    <Slider {...settings}>
      {images.map((image) => (
        <div className={styles.image_item}>
          <ImageFallbackProductImage className={styles.image} key={uuidv4()} src={image && `${image}`} fallbackSrc={image} width={370} height={240} />
        </div>
      ))}
    </Slider>
  </div>
);

export default ListImageDetailProduct;
