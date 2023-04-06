import { FreeMode, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@/lib/useMediaQuery';
import ButtonNavSwiper from '../../components/ButtonNavSwiper';
import { recruitmentProcess } from './recruitmentData';

export default function RecruitmentProcess() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <section className="bg-primary-10 desktop:py-20 py-8">
      <div className="max-w-8xl desktop:px-8 mx-auto px-4">
        <div className="desktop:mb-12 mb-6 flex justify-between">
          <h2 className="text-title32 desktop:text-title42 text-left font-bold">
            Quy trình tuyển dụng tại nhà Ahamove
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
        <Swiper
          slidesPerView={isDesktop ? 4 : 1}
          slidesPerGroup={isDesktop ? 5 : 2}
          spaceBetween={24}
          loop={false}
          loopFillGroupWithBlank={true}
          navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
          modules={[Navigation, FreeMode]}
        >
          {recruitmentProcess.map((item, idx) => (
            <SwiperSlide key={idx}>
              <article className="border-neutral-15 group flex flex-col items-start justify-center rounded-2xl border-2 bg-white py-9 px-6 text-center">
                <div className="bg-primary-50 flex h-12 w-12 items-center justify-center rounded-full">
                  <h3 className="text-title24 font-bold text-white">
                    {item.id}
                  </h3>
                </div>
                <h4 className="text-neutral-80 text-subtitle18 mt-6 min-h-[56px] text-left font-semibold">
                  {item.title}
                </h4>
                <p className="text-body14 text-neutral-90 mt-2 min-h-[90px] text-left font-normal">
                  {item.desc}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 flex justify-center">
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
