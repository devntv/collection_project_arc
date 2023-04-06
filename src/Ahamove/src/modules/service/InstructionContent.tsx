import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
// import required modules
import type SwiperCore from 'swiper';
import { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import useMediaQuery from '@/lib/useMediaQuery';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

type Items = {
  step: string;
  desc: string;
  urlImage: string;
  altImage: string;
};

type Props = {
  items: Items[];
  delivery?: boolean;
};

export default function InstructionContent({ items, delivery = false }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  return (
    <section className=" bg-primary-10 py-20">
      <div className="max-w-8xl desktop:px-8 mx-auto px-4">
        <div className="desktop:grid-cols-2 desktop:gap-12 grid grid-cols-1 place-content-center items-center gap-6">
          <h2 className="text-title32 text-neutral-90 desktop:text-left desktop:text-title42 desktop:hidden text-center font-bold">
            Hướng dẫn sử dụng dịch vụ giao hàng
          </h2>
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={10}
            watchOverflow={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Thumbs]}
            className="w-full"
          >
            {items.map((item) => (
              <SwiperSlide key={item.step}>
                <div
                  className={cn('relative mx-auto w-full', {
                    'aspect-[311/410]': delivery,
                    'desktop:w-3/4 aspect-[4/7]': !delivery,
                  })}
                >
                  <Image
                    src={item.urlImage}
                    alt={item.altImage}
                    layout="fill"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="desktop:items-start mx-auto flex flex-col justify-center space-y-10">
            <h2 className="text-title32 text-neutral-90 desktop:text-left desktop:text-title42 desktop:block hidden text-center font-bold">
              Hướng dẫn sử dụng dịch vụ giao hàng
            </h2>
            <Swiper
              onSwiper={setThumbsSwiper}
              direction={isDesktop ? 'vertical' : 'horizontal'}
              slidesPerView={isDesktop ? items.length : 1}
              spaceBetween={0}
              slidesPerGroup={isDesktop ? items.length : 1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Thumbs]}
              className="gallery-thumbs w-swiper-mobile desktop:h-fit desktop:w-full"
            >
              {items.map((item) => (
                <SwiperSlide
                  className="desktop:pl-6 group flex min-h-[118px] flex-col items-start justify-center rounded-lg p-4"
                  key={item.step}
                >
                  <div
                    className="list-inside list-disc"
                    style={{
                      display: 'list-item',
                    }}
                  >
                    <h3 className="text-subtitle20 group-hover:text-primary-50 inline-block text-left font-bold active:hover:!text-white">
                      {item.step}
                    </h3>
                  </div>
                  <p className="text-subtitle18 ml-5 text-left font-normal">
                    {item.desc}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
