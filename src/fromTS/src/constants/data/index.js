/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO: refactor contanst
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ENUM_TRACKING_SOURCE } from 'constants/Enums';
// import { ICON_MEGA } from 'constants/Icons/menu';
import {
  HANG_DIEM_ICON,
  URL_LOGO_24H,
  URL_LOGO_BAOTIENPHONG,
  URL_LOGO_CAFEBIZ,
  URL_LOGO_E27,
  URL_LOGO_ECHELON,
  URL_LOGO_NTTDATA,
  URL_LOGO_SEEDSTAR,
  URL_LOGO_VNEXPRESS,
  URL_SLIDER_10,
  URL_SLIDER_11,
  URL_SLIDER_12,
  URL_SLIDER_2,
  URL_SLIDER_3,
  URL_SLIDER_4,
  URL_SLIDER_5,
  URL_SLIDER_6,
  URL_SLIDER_7,
  URL_SLIDER_8,
  URL_SLIDER_9,
} from 'constants/Images';
import { ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT } from 'constants/Images/mobile/Icons';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { StringUtils } from 'utils';

export const imagePartnerSlider = [
  // { id: 1, url: URL_SLIDER_1, width: '185px', height: '185px' }, APO-1440 - remove partner
  { id: 2, url: URL_SLIDER_2, width: '185px', height: '185px' },
  { id: 3, url: URL_SLIDER_3, width: '185px', height: '93px' },
  { id: 4, url: URL_SLIDER_4, width: '185px', height: '92px' },
  { id: 5, url: URL_SLIDER_5, width: '185px', height: '185px' },
  { id: 6, url: URL_SLIDER_6, width: '185px', height: '185px' },
  { id: 7, url: URL_SLIDER_7, width: '185px', height: '123px' },
  { id: 8, url: URL_SLIDER_8, width: '200px', height: '92px' },
  { id: 9, url: URL_SLIDER_9, width: '185px', height: '115px' },
  { id: 10, url: URL_SLIDER_10, width: '185px', height: '185px' },
  { id: 11, url: URL_SLIDER_11, width: '185px', height: '185px' },
  { id: 12, url: URL_SLIDER_12, width: '185px', height: '185px' },
];

export const imageMediaTop = [
  {
    id: 1,
    url: URL_LOGO_SEEDSTAR,
    href: 'https://www.seedstarsworld.com/event/seedstars-hochiminh-2018',
    width: '168px',
    height: '76px',
  },
  {
    id: 2,
    url: URL_LOGO_VNEXPRESS,
    href: 'https://startup.vnexpress.net/tin-tuc/xu-huong/nen-tang-phan-phoi-duoc-pham-an-nen-lam-ra-trong-covid-19-4178711.html',
    width: '200px',
    height: '104px',
  },
  {
    id: 3,
    url: URL_LOGO_24H,
    href: 'https://www.24h.com.vn/tin-tuc-suc-khoe/thuocsivn-diem-cung-cap-thuoc-si-uy-tin-trong-thoi-dai-so-c683a1373539.html',
    width: '200px',
    height: '200px',
  },
  {
    id: 4,
    url: URL_LOGO_NTTDATA,
    href: 'http://oi.nttdata.com/en/contest/9th/venue/c05',
    width: '166px',
    height: '203x',
  },
];

export const imageMediaBottom = [
  {
    id: 1,
    url: URL_LOGO_ECHELON,
    href: 'https://e27.co/our-ho-chi-minh-city-top100-winners-prove-that-the-vietnamese-dragon-is-awake-20190313',
    width: '165px',
    height: '103px',
    dark: true,
  },
  {
    id: 2,
    url: URL_LOGO_BAOTIENPHONG,
    href: 'https://tienphong.vn/gap-go-thuocsi-vn-don-vi-dung-cong-nghe-toi-uu-hoa-va-lam-moi-quy-trinh-phan-phoi-duoc-pham-post1448510.tpo',
    width: '200px',
    height: '100px',
  },
  {
    id: 3,
    url: URL_LOGO_CAFEBIZ,
    href: 'https://cafebiz.vn/case-study-buymed-thuocsivn-dung-doi-sales-chay-bang-com-go-cua-tung-nha-thuoc-nho-sau-3-nam-thu-hut-12000-don-vi-tham-gia-20220302175245576.chn',
    width: '200px',
    height: '63px',
  },
  {
    id: 4,
    url: URL_LOGO_E27,
    href: 'https://e27.co/vietnamese-online-pharma-marketplace-thuocsi-vn-secures-us500k-from-cocoon-capital-vietcapital-ventures-20190926',
    width: '166px',
    height: '166px',
  },
];

export const settingsCustomer = {
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: true,
  dotsClass: 'slick-dots slick-client',
  arrows: false,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },
  ],
};

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <NavigateNextIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <NavigateBeforeIcon />
    </div>
  );
}

function MobileSlideNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT />
    </div>
  );
}
function MobileSlidePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ICON_MOBILE_ICON_SLIDE_ARROW_RIGHT />
    </div>
  );
}

export const settingsMultiImageBoxV2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
export const settingsMobileMultiImageBoxV2 = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  swipeToSlide: true,
  rows: 1,
  speed: 500,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
export const settingsNewProducts = {
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  rows: 1,
  arrows: true,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 3000,
  speed: 1000,
  lazyLoad: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 564,
      settings: {
        arrow: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        arrow: false,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: '15px',
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1140,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
};
export const settingsCustomerSeller = {
  slidesToShow: 3,
  slidesToScroll: 1,
  rows: 1,
  arrows: true,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        slidesToShow: 2,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        rows: 1,
      },
    },
  ],
};

export const settingsBestProduct = {
  className: 'section-outstanding__slider bestproduct__slider',
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 1,
  rows: 1,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 1000,
  lazyLoad: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 876,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
};
export const mobileSettingsBestProduct = {
  className: 'mobileSection-outstanding__slider section-outstanding__slider bestproduct__slider mobileBestProduct__slider',
  slidesToShow: 1,
  slidesToScroll: 3,
  initialSlide: 1,
  rows: 1,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 1000,
  lazyLoad: true,
  centerMode: true,
  nextArrow: <MobileSlideNextArrow />,
  prevArrow: <MobileSlidePrevArrow />,
};

export const settingsStore = {
  className: 'section-outstanding__slider',
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  rows: 1,
  arrows: true,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 1000,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        arrow: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        arrow: false,
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

export const settingsProduct = {
  className: 'section-outstanding__slider',
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  rows: 1,
  arrows: true,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1140,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
};

export const settingsPartner = {
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
      },
    },
  ],
};

export const settingsPromotionSliderBanner = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export const settingsPromotionMultipSliderBanner = {
  slidesToShow: 1,
  slidesPerRow: 3,
  dots: true,
  infinite: true,
  rows: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        slidesPerRow: 3,
        slidesToShow: 1,
        slidesToScroll: 2,
        rows: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesPerRow: 3,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesPerRow: 2,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },
  ],
};

export const settingsSliderBanner = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  arrows: false,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
};

export const settingsSliderBannerV2 = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
};

export const settingsTicket = {
  className: 'left',
  speed: 500,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 1,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        arrow: false,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export const swiperSettings = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  pagination: { clickable: true },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  preloadImages: false,
  loop: true,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
    loadPrevNextAmount: 2,
  },
  speed: 2500,
  observer: true,
  observeParents: true,
};

export const linkQuestionItemLeft = [
  {
    id: 1,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029452912-C%C3%A1ch-%C4%91%C4%83ng-k%C3%BD-v%C3%A0-%C4%91%C4%83ng-nh%E1%BA%ADp-t%C3%A0i-kho%E1%BA%A3n-t%E1%BA%A1i-thuocsi-vn',
    title: 'Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn',
  },
  {
    id: 2,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360030488231-Qu%C3%AAn-m%E1%BA%ADt-kh%E1%BA%A9u-%C4%91%C4%83ng-nh%E1%BA%ADp',
    title: 'Quên mật khẩu đăng nhập',
  },
  {
    id: 3,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360030159252-Nh%C6%B0-th%E1%BA%BF-n%C3%A0o-l%C3%A0-h%C3%A0ng-c%E1%BA%ADn-date-H%E1%BA%A1n-s%E1%BB%AD-d%E1%BB%A5ng-c%C3%B2n-bao-l%C3%A2u-',
    title: 'Như thế nào là hàng cận date? Hạn sử dụng còn bao lâu?',
  },
  {
    id: 4,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360030900651-T%E1%BA%A1i-sao-t%C3%B4i-kh%C3%B4ng-thanh-to%C3%A1n-%C4%91%C6%B0%E1%BB%A3c',
    title: 'Tại sao tôi không thanh toán được',
  },
  {
    id: 5,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029396272-T%C3%B4i-mu%E1%BB%91n-ch%E1%BB%89nh-l%E1%BA%A1i-%C4%91%C6%A1n-h%C3%A0ng-th%C3%AC-l%C3%A0m-c%C3%A1ch-n%C3%A0o-',
    title: 'Tôi muốn chỉnh lại đơn hàng thì làm cách nào?',
  },
];

export const linkQuestionItemRight = [
  {
    id: 1,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029452652-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%B7t-h%C3%A0ng',
    title: '⭑ Hướng dẫn đặt hàng',
  },
  {
    id: 2,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029505332-D%C3%B9ng-th%E1%BB%AD-t%E1%BA%A1i-website-thuocsi-vn-',
    title: 'Dùng thử tại website thuocsi.vn',
  },
  {
    id: 3,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029773811-Thanh-to%C3%A1n-b%E1%BA%B1ng-h%C3%ACnh-th%E1%BB%A9c-chuy%E1%BB%83n-kho%E1%BA%A3n-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-',
    title: 'Thanh toán bằng hình thức chuyển khoản như thế nào?',
  },
  {
    id: 4,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360029453432-Xu%E1%BA%A5t-h%C3%B3a-%C4%91%C6%A1n-%C4%91%E1%BB%8F-t%E1%BA%A1i-thuocsi-vn-',
    title: 'Xuất hóa đơn đỏ tại thuocsi.vn?',
  },
  {
    id: 5,
    href: 'https://thuocsi.zendesk.com/hc/vi/articles/360030403531-Th%E1%BB%9Di-gian-giao-h%C3%A0ng-d%E1%BB%B1-ki%E1%BA%BFn',
    title: 'Thời gian giao hàng dự kiến',
  },
];

// eslint-disable-next-line operator-linebreak
export const LINK_ALL_QUESTION =
  'https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-';

export const SORT_PRODUCT_NOT_LOGIN = [
  { label: 'Bán chạy nhất', value: '' },
  { label: 'Mới nhất', value: 'NEWEST' },
  { label: 'Giá: Cao đến Thấp', value: 'PRICE_DESC' },
  { label: 'Giá: Thấp đến Cao', value: 'PRICE_ASC' },
  { label: 'Tên: A-Z', value: 'NAME_ASC' },
  { label: 'Tên: Z-A', value: 'NAME_DESC' },
];

export const SORT_PRODUCT = [
  { label: 'Bán chạy nhất', value: '' },
  { label: 'Mới nhất', value: 'NEWEST' },
  { label: 'Giá: Cao đến Thấp', value: 'PRICE_DESC' },
  { label: 'Giá: Thấp đến Cao', value: 'PRICE_ASC' },
  { label: 'Tên: A-Z', value: 'NAME_ASC' },
  { label: 'Tên: Z-A', value: 'NAME_DESC' },
];

export const tabsProductData = [
  { id: 1, label: 'Thông tin chung', value: '1', code: 'description' },
  { id: 2, label: 'Chỉ định', value: '2', code: 'indication' },
  { id: 3, label: 'Liều lượng - Cách dùng', value: '3', code: 'dosage' },
  { id: 4, label: 'Chống chỉ định', value: '4', code: 'contraindication' },
  { id: 5, label: 'Tương tác thuốc', value: '5', code: 'drugInteraction' },
  { id: 6, label: 'Bảo quản', value: '6', code: 'storage' },
  { id: 7, label: 'Quá liều', value: '7', code: 'drugOverdose' },
];

export const tabsAccountInfo = [
  { id: 1, label: 'Thông tin tài khoản', value: '1' },
  { id: 2, label: 'Mật khẩu', value: '2' },
  { id: 3, label: 'Thông tin doanh nghiệp', value: '3' },
  { id: 4, label: 'Tài khoản ngân hàng', value: '4' },
  { id: 5, label: 'Thông tin xuất hoá đơn', value: '5' },
  { id: 6, label: 'Thông tin giao hàng', value: '6' },
];
export const tabsProductDataV2 = [
  { id: 1, label: 'Thông tin chung', value: '1', code: 'description' },
  { id: 2, label: 'Thành phần', value: '2', code: 'ingredients' },
  { id: 3, label: 'Chỉ định', value: '3', code: 'indication' },
  { id: 4, label: 'Liều lượng - Cách dùng', value: '4', code: 'dosage' },
  { id: 5, label: 'Chống chỉ định', value: '5', code: 'contraindication' },
  { id: 6, label: 'Tương tác thuốc', value: '6', code: 'drugInteraction' },
  { id: 7, label: 'Bảo quản', value: '7', code: 'storage' },
  { id: 8, label: 'Quá liều', value: '8', code: 'drugOverdose' },
];

export const customerFeedbackData = [
  {
    id: '1',
    avatar: '/images/testimonial/ms_anh-0f18d4903ee5d30ca79d458b799c4c2afa8e1d742e244885a218f831f68789b4.jpg',
    customer: 'Cô Lan Anh',
    title: 'Chủ nhà thuốc Hòa Bình - Buôn Mê Thuột',
    comment: 'Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện',
  },
  {
    id: '2',
    avatar: '/images/testimonial/ms_hang-2ddc116695f4f788b5968112a3185c73536f16a23a740f440c042c9d2057c611.jpg',
    customer: 'Cô Hằng',
    title: 'Nhà thuốc Vy Vy - Thủ Đức',
    comment: 'Giao hàng nhanh chóng, nhân viên tư vấn nhiệt tình.',
  },
  {
    id: '3',
    avatar: '/images/testimonial/mr_truong-c6c1718f8fd631366d2ab383f238b9642a3b10ee5d95755a973f82b5c17ad4af.jpg',
    customer: 'Anh Trường',
    title: 'Nhà thuốc tây số 2 - Vĩnh Long',
    comment: 'Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.',
  },
  {
    id: '4',
    avatar: '/images/testimonial/ms_hanh-faacbd8f6c93413a7cba4dc60359dca0699b13e999f6681fbe2f0495cc530162.jpg',
    customer: 'Chị Hạnh',
    title: 'Nhà thuốc Hạnh - Bình Thạnh',
    comment:
      'Chị biết và đặt thuocsi.vn được hơn 1 năm, chị có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.',
  },
];

export const PAGE_SIZE_10 = 10;
export const PAGE_SIZE = 20;
export const PAGE_SIZE_30 = 30;
export const ONE_DAY = 86400000;

export const HOLIDAYS = ['0209', '3004', '0105', '0204', '0101'];

export const MAX_PRODUCT_QTY_DISPLAY = 100000;

export const IMPORTANT_PERCENT_MAX = 20 / 100;

// search bar
export const ENTERPRISE = 'ENTERPRISE';
export const SEARCH_TYPE = 'search-type';
export const THUOC_VA_HOAT_CHAT = 1;
export const HOAT_CHAT = 2;
export const NHA_BAN_HANG = 3;
export const THUOC = 4;
export const SEARCH_TYPE_LIST = [
  { label: 'Thuốc & Hoạt Chất', value: THUOC_VA_HOAT_CHAT },
  { label: 'Thuốc', value: THUOC },
  { label: 'Hoạt Chất', value: HOAT_CHAT },
  { label: 'Nhà Bán Hàng', value: NHA_BAN_HANG },
];
export const orderTabList = [
  { id: 1, label: 'Mã đơn', value: 'ORDER_ID' },
  { id: 2, label: 'Sản phẩm', value: 'PRODUCT' },
  { id: 3, label: 'Ngày tháng', value: 'TIME' },
];

// loyalty v2
export const LoyaltyRulesContent = {
  content:
    'Vào 0h mỗi ngày, hệ thống sẽ tính điểm xếp hạng cho khách hàng, dựa trên số đơn đã hoàn tất trong thời gian quy định. \n\n  •  Ví dụ: Hệ thống quy định thời gian tính điểm xếp hạng là 3 tháng tới thời điểm hiện tại. Vào lúc 0h ngày 26/5/2021, ba tháng gần nhất sẽ được tính từ 01/02/2021 tới 01/05/2021 và cộng 25 ngày tới thời điểm hiện tại (26/5/2021). \n\nQuy đổi điểm theo: \n\n  •  100.000 vnđ sẽ được 1 điểm hoặc theo điểm tích lũy được quy định cho sản phẩm đó. \n\n  •  Nếu sản phẩm có hệ số nhân sẽ nhân lên tương ứng theo điểm quy đổi. \n\nTrường hợp do thiếu sót hay chậm trễ từ phía thuocsi.vn, khách hàng vui lòng liên hệ 02 873 008 840 hoặc hotro@thuocsi.vn để phản hồi về điểm.',
};

// + link sản phẩm của trang khác
export const PreventSearchKeywords = [
  'thuốc xách tay',
  'hàng tuồn kho',
  'thuốc hết hạn',
  'thuốc phá giá',
  'thuốc phá thai',
  'hàng chợ',
  'ma tuý',
  'heroine',
  'súng',
  'lựu đạn',
  'bom',
  'mìn',
  'kiếm',
  'mác',
  'facebook',
  'lazada',
  'shopee',
  'tiki',
  'lê',
  'dao găm',
  'cung nỏ',
  'pháo',
  'thuốc lá',
  'xì gà',
  'thuốc trừ sâu',
  'amfibole',
  'amiăng',
  'hàng lậu',
  'độc hại',
  'độc tố',
  'cấm khai thác',
  'hoang dã',
  'quý hiếm',
  'tuyệt đối',
  'chính xác',
  'dứt điểm',
  'cam kết hiệu quả',
  'điều trị tận gốc',
  'tiệt trừ',
  'hàng đầu',
  'đầu tay',
  'chất lượng nhất',
  'tác dụng ngay',
  'giảm ngay',
  'cắt đứt',
  'giảm tức thì',
  'khỏi hẳn',
  'không lo',
  'phải dùng',
  'thuốc số 1',
  'thuốc số một',
  'tốt hơn tất cả',
  'hoàn toàn vô hại',
  'không tác dụng phụ',
  'thần dược',
  'hotline',
  'liên hệ qua',
  'số điện thoại',
  'địa chỉ',
  'số tài khoản',
  'chuyển tiền',
  'mua hàng qua đường link',
  'thuốc phá thai',
  'thuốc độc',
];

export const PreventSearchKeywordsAlias = PreventSearchKeywords?.filter((item) => item.split(' ').length > 1).map((item) =>
  StringUtils.changeAlias(item),
);

export const getTrackingData = (url) => {
  const dataTracking = [
    {
      action: 'CLICK_GO_TO_PRODUCTS_PAGE',
      trackingPath: '/products',
    },

    {
      action: 'CLICK_GO_TO_INGREDIENTS_PAGE',
      trackingPath: '/ingredients',
    },

    {
      action: 'CLICK_GO_TO_QUICKORDER_PAGE',
      trackingPath: '/quick-order',
    },

    {
      action: 'CLICK_GO_TO_CAMPAIGN_PAGE',
      trackingPath: '/khuyenmai',
    },

    {
      action: 'CLICK_GO_TO_PROMO_CODES_PAGE',
      trackingPath: '/promo-codes',
    },

    {
      action: 'CLICK_GO_TO_SELLER_PAGE',
      trackingPath: '/sellers',
    },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const data of dataTracking) {
    if (url.includes(data.trackingPath)) return data;
  }

  return {
    action: 'CLICK_GO_TO_EVENTS_PAGE',
    trackingPath: '/events',
  };
};

export const SCREEN_TO_ENUM_TRACKING_SOURCE_MAP = {
  '/quick-order': ENUM_TRACKING_SOURCE.QUICK_ORDER,
  '/products': ENUM_TRACKING_SOURCE.PRODUCT_LIST,
  '/khuyenmai': ENUM_TRACKING_SOURCE.PROMOTION,
  '/khuyenmai/[slug]': ENUM_TRACKING_SOURCE.PROMOTION,
  '/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]/rewards': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/durex': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/sanofi': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/durex/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/sanofi/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]/flagship-rewards': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller-products/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/': ENUM_TRACKING_SOURCE.HOME,
  '/product/[slug]': ENUM_TRACKING_SOURCE.PRODUCT_DETAIL,
  '/products/[slug]': ENUM_TRACKING_SOURCE.PRODUCT_DETAIL,
};

export const SOURCE_TO_ENUM_TRACKING_SOURCE_MAP = {
  '/quick-order': ENUM_TRACKING_SOURCE.QUICK_ORDER,
  '/products': ENUM_TRACKING_SOURCE.PRODUCT_LIST,
  '/khuyenmai': ENUM_TRACKING_SOURCE.PROMOTION,
  '/khuyenmai/[slug]': ENUM_TRACKING_SOURCE.PROMOTION,
  '/wishlist': ENUM_TRACKING_SOURCE.WISHLIST,
  '/productviewed': ENUM_TRACKING_SOURCE.VIEWED_LIST,
  '/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller/[slug]/rewards': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/durex': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/sanofi': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/durex/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/sanofi/list-product': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/flagship-store/[slug]/flagship-rewards': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/seller-products/[slug]': ENUM_TRACKING_SOURCE.SELLER_HOME,
  '/product/[slug]': ENUM_TRACKING_SOURCE.PRODUCT_DETAIL,
  '/products/[slug]': ENUM_TRACKING_SOURCE.PRODUCT_DETAIL,
};

// SEO
export const DEFAULT_THUOCSI_SUBTITLE = 'Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
export const DEFAULT_THUOCSI_TITLE = 'thuocsi.vn';
export const DEFAULT_THUOCSI_LONG_TITLE = 'Tra cứu và đặt thuốc giá sỉ nhanh tại thuocsi.vn';
export const DEFAULT_THUOCSI_DESCRIPTION = 'Sàn thương mại dược phẩm uy tín toàn quốc với 10000+ sản phẩm chính hãng';

// bulk-order
export const DEFAULT_BULK_ORDER_TITLE = 'Đặt hàng số lượng lớn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
// CONFIG TAB HARDCODE
export const TAB_CONFIG = {
  Y7GB: {
    icon: HANG_DIEM_ICON,
    textColor: '#000',
    borderColor: 'transparent',
  },
  DEFAULT: {
    textColor: '#000',
    borderColor: 'transparent',
    icon: '',
  },
};
export const PASSWORD_SECURITY_WARNING =
  'Nhân viên thuocsi.vn không yêu cầu cung cấp mật khẩu tài khoản. Quý khách vui lòng bảo vệ tài khoản cá nhân.';

export const MAP_BTN_TITLE_BY_REDIRECT_URL = {
  '/sanphammoi': 'Xem thêm sản phẩm mới & thay thế',
};
