// import required modules
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import ButtonNavSwiper from '@/components/ButtonNavSwiper';
import AhamoveBg from '@/components/icons/AhamoveBg';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { journeyAhamoveData } from './aboutUsData';

export default function AboutUsJourney() {
  return (
    <section className="bg-primary-20 desktop:rounded-t-none desktop:rounded-r-full overflow-hidden pt-24">
      <div className="max-w-8xl desktop:px-8 relative mx-auto w-full px-4">
        <AhamoveBg className="fill-primary-30 absolute left-[1/5] -bottom-14" />
        <div className="max-w-8xl desktop:grid-cols-2 mx-auto grid grid-cols-1 gap-12">
          <article className="mx-auto flex flex-col items-start justify-between">
            <h2 className="text-title32 desktop:text-title60 z-30 text-left font-bold text-black">
              Hành trình phát triển của Ahamove
            </h2>
          </article>
          <div className="relative ml-5 flex flex-col">
            <div className="h-[460px] overflow-hidden">
              <Swiper
                watchOverflow={true}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={4}
                centeredSlides={true}
                watchSlidesProgress={true}
                navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
                direction={'vertical'}
                className="journey-ahamove desktop:h-[150px] h-[210px] w-full"
              >
                {journeyAhamoveData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className="border-primary-50 absolute top-4 left-4 -ml-px h-full w-0 border-l-4"
                      aria-hidden="true"
                    />
                    <div className="group relative flex flex-row items-start space-x-4">
                      <div className="border-primary-50 bg-primary-10 relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2">
                        <div className="bg-primary-50 h-5 w-5 rounded-full"></div>
                      </div>
                      <article className="journey-info flex flex-col space-y-2 pr-14">
                        <h3 className="text-primary-50 text-title24 font-bold">
                          {item.year}
                        </h3>
                        <h4 className="text-neutral-80 text-body16 font-bold">
                          {item.title}
                        </h4>
                        <p className="text-body14 font-semibold text-black">
                          {item.desc}
                        </p>
                      </article>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="z-20 ml-10 flex flex-row flex-nowrap space-x-4 px-4 pt-6 pb-10">
              <ButtonNavSwiper type="right" vertical className="block" />
              <ButtonNavSwiper type="left" vertical className="block" />
            </div>
            <div
              className="border-primary-50 absolute top-4 left-4 -ml-px h-full w-0 border-l-4"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
