import cn from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonNavSwiper from './ButtonNavSwiper';

type Item = {
  url: string;
  alt: string;
};

type Props = {
  items: Item[];
  type: 'warehouse' | 'activity';
};

export default function SwiperCenteredSlides({ items, type }: Props) {
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => setLoad(true), []);
  return load ? (
    <div className="relative overflow-hidden">
      <div className="max-w-8xl desktop:px-8 absolute inset-x-auto top-1/2 z-10 mx-auto flex min-w-full -translate-y-1/2 items-center justify-between px-4">
        <ButtonNavSwiper type="left" className="col-span-1" />
        <ButtonNavSwiper type="right" className="col-span-1" />
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        loop={true}
        navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
        autoplay={{ delay: 3000 }}
        className={cn('gallery-warehouse', {
          'handle-alt-img': type === 'warehouse',
        })}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={cn('w-full', {
                'space-y-4': type === 'activity',
              })}
            >
              <div className="relative aspect-[31/20] h-auto w-full bg-transparent">
                <Image src={item.url} alt={item.alt} layout="fill" />
              </div>
              <p
                className={cn(
                  'text-body16 text-center font-normal text-white',
                  {
                    hidden: type === 'warehouse',
                    'alt-image': type === 'activity',
                  }
                )}
              >
                {item.alt}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <div>Load Image</div>
  );
}