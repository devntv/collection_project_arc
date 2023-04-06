import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonNavSwiper from '@/components/ButtonNavSwiper';
import { ahamoversData } from './recruitmentData';

export default function WeAreAhamovers() {
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => setLoad(true), []);
  return (
    <section className="desktop:py-16 py-8">
      <h2 className="text-neutral-90 text-title32 max-w-1/2 desktop:max-w-content desktop:mb-14 mx-auto  mb-8 text-center font-bold">
        Chúng tôi là Ahamovers
      </h2>
      {load ? (
        <div className="relative overflow-hidden">
          <div className="max-w-8xl desktop:px-8 desktop:top-1/2 absolute inset-x-auto top-1/3 z-10 mx-auto flex min-w-full -translate-y-1/2 items-center justify-between px-4">
            <ButtonNavSwiper type="left" className="col-span-1" />
            <ButtonNavSwiper type="right" className="col-span-1" />
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={0}
            loop={true}
            navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
            autoplay={{ delay: 3000 }}
            centeredSlides={true}
            roundLengths={true}
            className="gallery-ahamovers"
          >
            {ahamoversData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="desktop:rounded-2xl relative overflow-hidden">
                  <div className="desktop:inline-block absolute left-[1/5] -bottom-2 hidden aspect-[3/2] h-auto w-[400px]">
                    <Image
                      alt=""
                      src="/static/icons/recruitment/AhamoveBgDesktop.svg"
                      layout="fill"
                      priority
                    />
                  </div>
                  <div className="desktop:grid-cols-2 grid grid-cols-1">
                    <article className="desktop:pt-12 desktop:order-first relative order-last col-span-1 flex flex-col items-start bg-transparent px-8 py-10">
                      <p className="text-subtitle20 font-bold">{item.quote}</p>
                      <p className="text-body16 mt-4 font-normal">
                        {item.author} - {item.position}
                      </p>
                      <div className="desktop:hidden absolute -right-2 -bottom-2 inline-block aspect-[3/2] h-auto w-[294px]">
                        <Image
                          alt=""
                          src="/static/icons/recruitment/AhamoveBgMobile.svg"
                          layout="fill"
                          priority
                        />
                      </div>
                    </article>
                    <div
                      className="desktop:h-full relative z-30 col-span-1 h-64 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.url})` }}
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div>Load Image</div>
      )}
    </section>
  );
}
