import Button from '@/components/Button';
import ButtonNavSwiper from '@/components/ButtonNavSwiper';
import SwiperCenteredSlides from '@/components/SwiperCenteredSlides';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ahamoveTopActivitiesData } from './aboutUsData';

export default function AboutUsTopActivities() {
  return (
    <section className="bg-secondary-40 desktop:py-14 rounded-tl-2lg overflow-hidden py-10">
      <h2 className="text-title32 desktop:mb-6 desktop:text-title42 max-w-content desktop:px-8 mx-auto mb-6 px-4 text-center font-bold text-white">
        Những hoạt động nổi bật tại nhà Ahamove
      </h2>
      <div className="relative">
        <div className="max-w-8xl desktop:px-8 absolute inset-x-auto top-1/2 z-10 mx-auto flex min-w-full -translate-y-1/2 items-center justify-between px-4">
          <ButtonNavSwiper type="left" className="col-span-1" />
          <ButtonNavSwiper type="right" className="col-span-1" />
        </div>
        <SwiperCenteredSlides
          items={ahamoveTopActivitiesData}
          type="activity"
        />
      </div>
      <div className="mx-auto mt-6 max-w-fit">
        <Button type="link" href="/ahamover-story">
          Câu chuyện Ahamovers
        </Button>
      </div>
    </section>
  );
}
