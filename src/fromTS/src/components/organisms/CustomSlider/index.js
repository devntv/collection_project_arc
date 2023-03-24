import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CustomSlider = ({ config, children, className }) => {
  const ref = useRef({});
  return (
    <Slider ref={ref} {...config} className={className}>
      {children}
    </Slider>
  );
};

export default CustomSlider;
