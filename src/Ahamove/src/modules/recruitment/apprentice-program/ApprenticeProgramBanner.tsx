import Image from 'next/image';

export default function ApprenticeProgramBanner() {
  return (
    <section className="desktop:grid-cols-2 desktop:pt-14 relative grid h-auto grid-cols-1 bg-white">
      <div className="desktop:col-span-1 desktop:rounded-tr-4lg desktop:z-20 desktop:py-32 col-span-1 flex items-center justify-end">
        <div className="desktop:px-14 desktop:py-16 bg-primary-50 desktop:rounded-t-none desktop:rounded-r-full flex w-full justify-end px-4 py-10">
          <div className="desktop:pr-6 desktop:w-auto flex w-full flex-col space-y-4">
            <div className="relative mx-auto h-10 w-56">
              <Image
                src="/static/icons/recruitment/LogoWhite.svg"
                alt=""
                layout="fill"
              />
            </div>
            <div className="relative mx-auto aspect-[25/10] h-52 w-full">
              <Image
                src="/static/icons/recruitment/ApprenticeProgramTitle.svg"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="desktop:py-14 desktop:pl-64 desktop:pr-14 bg-secondary-40 desktop:rounded-t-none desktop:rounded-l-full desktop:-ml-80 relative flex flex-col justify-center">
        <div className=" relative block aspect-[13/10] w-full max-w-[686px]">
          <Image
            src="/static/images/recruitment/apprentice-banner.webp"
            alt=""
            layout="fill"
            priority
          />
        </div>
        <div className="desktop:block absolute -left-36 top-0 hidden">
          <Image
            src="/static/icons/recruitment/PointBannerCareer.svg"
            width={285}
            height={306}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}