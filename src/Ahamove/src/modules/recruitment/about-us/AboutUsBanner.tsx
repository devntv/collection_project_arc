import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function AboutUsBanner() {
  return (
    <section
      className="desktop:aspect-[41/10] desktop:pb-14 desktop:h-auto desktop:bg-contain desktop:bg-[url('/static/images/recruitment/job-banner-desktop.webp')] h-80 w-full bg-[url('/static/images/recruitment/about-us-banner-desktop.webp')] bg-cover bg-no-repeat pb-6"
      style={{ backgroundPosition: 'center' }}
    >
      <div className="max-w-8xl desktop:px-8 mx-auto flex h-full items-end justify-start px-4">
        <p className="text-title42 desktop:text-title60 font-bold text-white">
          Về chúng tôi
        </p>
      </div>
    </section>
  );
}