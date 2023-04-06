import { FreeMode, Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { DemandService } from '@/api/cms/services/type';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import useMediaQuery from '@/lib/useMediaQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import Button from '../../components/Button';
import ButtonNavSwiper from '../../components/ButtonNavSwiper';
import MoreInfo from '../../components/MoreInfo';
import DemandServiceItem from './DemandServiceItem';

type Props = {
  services: DefaultCmsDataResponse<DemandService>[];
  href: string;
};

export default function DemandServiceContent({ services, href }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <section className="bg-white py-16">
      <div className="max-w-8xl desktop:space-y-6 desktop:px-8 mx-auto space-y-8 px-4">
        <div className="flex justify-between">
          <h2 className="text-title32 desktop:text-title42 text-center font-bold">
            Dịch vụ phù hợp với nhu cầu của bạn
          </h2>
          <div className="desktop:grid desktop:px-0 hidden grid-cols-2 gap-6 px-4">
            <div>
              <ButtonNavSwiper type="left" />
            </div>
            <div>
              <ButtonNavSwiper type="right" />
            </div>
          </div>
        </div>
        <Button
          title="Xem chi tiết các dịch vụ"
          className="desktop:inline-block hidden"
          type="link"
          href={href}
        >
          Xem chi tiết các dịch vụ
        </Button>
        <MoreInfo
          title="Xem chi tiết các dịch vụ"
          type="primary"
          className="desktop:hidden block justify-center"
          href={href}
        />
        <Swiper
          slidesPerView={isDesktop ? 4 : 1}
          slidesPerGroup={isDesktop ? 5 : 2}
          loop={false}
          loopFillGroupWithBlank={true}
          autoplay={{ delay: 5000 }}
          navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
          modules={[Navigation, FreeMode, Autoplay]}
        >
          {services.map((item, idx) => (
            <SwiperSlide key={idx} className="p-2">
              <DemandServiceItem service={item} href={href} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center">
          <div className="desktop:hidden grid grid-cols-2 gap-6">
            <div>
              <ButtonNavSwiper type="left" />
            </div>
            <div>
              <ButtonNavSwiper type="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
