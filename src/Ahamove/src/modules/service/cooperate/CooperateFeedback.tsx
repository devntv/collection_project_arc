import cn from 'classnames';
import Image from 'next/image';
import { FreeMode, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonNavSwiper from '@/components/ButtonNavSwiper';
import useMediaQuery from '@/lib/useMediaQuery';
import { cooperateFeedbackData } from './cooperateData';

export default function CooperateFeedback() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <section className="bg-primary-10 py-16">
      <div className="max-w-8xl desktop:space-y-6 desktop:px-5 mx-auto space-y-8 px-4">
        <div className="flex justify-center">
          <h2 className="text-title32 text-neutral-80 desktop:text-title42 mb-10 text-center font-bold">
            Đối tác nói gì về Ahamove
          </h2>
        </div>
        <div className="relative">
          <div className="max-w-8xl desktop:px-8 absolute inset-x-auto top-1/2 z-10 mx-auto flex min-w-full -translate-y-1/2 items-center justify-between">
            <ButtonNavSwiper type="left" className="col-span-1" />
            <ButtonNavSwiper type="right" className="col-span-1" />
          </div>
          <Swiper
            slidesPerView={isDesktop ? 3 : 1}
            slidesPerGroup={isDesktop ? 3 : 1}
            spaceBetween={46}
            loop={false}
            loopFillGroupWithBlank={true}
            navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
            modules={[Navigation, FreeMode]}
            className="flex max-w-[90%] items-stretch"
          >
            {cooperateFeedbackData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <article className="hover:shadow-shadow4 flex flex-col items-center justify-center space-y-4 rounded-xl bg-white px-6 py-12">
                  <div className="flex h-24 items-center justify-center">
                    <div
                      className={cn('relative', {
                        'h-24 w-24': item.type === 'icon',
                        'aspect-[237/43] h-auto w-24': item.type === 'image',
                      })}
                    >
                      <Image src={item.icon} alt="" layout="fill" />
                    </div>
                  </div>
                  <p className="text-body-16 text-neutral-90 min-h-[240px] w-full text-center font-medium">
                    {item.content}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <p className="text-body16 text-neutral-90 text-center font-bold">
                      {item.author}
                    </p>
                    <p className="text-body16 text-neutral-60 min-h-[48px] text-center font-medium">
                      {item.position}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
