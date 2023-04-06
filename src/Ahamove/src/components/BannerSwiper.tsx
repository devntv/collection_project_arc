import Image from 'next/image';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Banner, DefaultCmsDataResponse } from '@/api/cms/types';
import ButtonNavSwiper from '@/components/ButtonNavSwiper';
import useMediaQuery from '@/lib/useMediaQuery';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from './ImageBanner.module.css';

type Props = {
  bannerData: DefaultCmsDataResponse<Banner> | null;
};

type BannerImage = {
  id: number;
  url: string;
  link: string;
  alt: string;
};

export default function BannerSwiper({ bannerData }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const bannerDesktopData: BannerImage[] = [];
  const bannerMobileData: BannerImage[] = [];
  bannerData?.attributes?.items?.map((item) => {
    if (item.desktop_image) {
      bannerDesktopData.push({
        id: item.id,
        link: item.link,
        alt: item.name,
        url: item.desktop_image.data?.attributes?.url,
      });
    }
    if (item.mobile_image) {
      bannerMobileData.push({
        id: item.id,
        link: item.link,
        alt: item.name,
        url: item.mobile_image.data?.attributes?.url,
      });
    }
  });
  return (
    <>
      {bannerData ? (
        <section className="home-banner relative">
          <div className="max-w-8xl desktop:px-8 absolute inset-x-auto top-1/2 z-10 mx-auto flex min-w-full -translate-y-1/2 items-center justify-between px-4">
            <ButtonNavSwiper type="left" className="col-span-1" />
            <ButtonNavSwiper type="right" className="col-span-1" />
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            slidesPerView={1}
            loop={true}
            navigation={{ prevEl: '.prevEl', nextEl: '.nextEl' }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="desktop:aspect-[32/15] desktop:h-auto aspect-[11/20] w-full"
          >
            {isDesktop
              ? bannerDesktopData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="unsetImg w-full bg-transparent">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        layout="fill"
                        className={styles.customImg}
                      />
                    </div>
                  </SwiperSlide>
                ))
              : bannerMobileData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="unsetImg w-full bg-transparent">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        layout="fill"
                        className={styles.customImg}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
      ) : (
        <div className="desktop:aspect-[32/15] desktop:h-auto relative aspect-[11/20] w-full bg-transparent">
          {isDesktop ? (
            <Image
              src="/static/images/home/banner-faster-delivery-desktop.webp"
              layout="fill"
              alt="Ahamove - Giải pháp hoàn hảo cho mọi nhu cầu của bạn"
            />
          ) : (
            <Image
              src="/static/images/home/banner-faster-delivery-mobile.webp"
              layout="fill"
              alt="Ahamove - Giải pháp hoàn hảo cho mọi nhu cầu của bạn"
            />
          )}
        </div>
      )}
    </>
  );
}