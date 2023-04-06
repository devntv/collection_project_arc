import cn from 'classnames';
import Image from 'next/image';
import DriverForm from './DriverForm';

export default function DriverBanner() {
  return (
    <section className="desktop:grid-cols-2 grid h-auto grid-cols-1">
      <div
        className={cn(
          'desktop:col-span-1 desktop:rounded-tr-4lg desktop:z-20 desktop:order-first desktop:py-44 bg-primary-10 desktop:pr-24 desktop:justify-end order-last col-span-1 flex max-h-[650px] items-center justify-center py-8 px-4'
        )}
      >
        <DriverForm />
      </div>
      <div className="desktop:col-span-1 desktop:-ml-52 desktop:block relative col-span-1 hidden aspect-[16/10] h-full max-h-[650px] w-[calc(100%+208px)] bg-left-top">
        <Image
          src="/static/images/driver/driver-banner-desktop.webp"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="desktop:hidden relative block aspect-[3/2] w-full">
        <Image
          src="/static/images/driver/driver-banner-mobile.webp"
          alt=""
          layout="fill"
        />
      </div>
    </section>
  );
}