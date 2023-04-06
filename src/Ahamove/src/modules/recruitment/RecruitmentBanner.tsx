import Image from 'next/image';
import Button from '@/components/Button';

export default function RecruitmentBanner() {
  return (
    <section className="relative bg-white">
      <section className="desktop:grid-cols-2 max-w-8xl desktop:px-8 mx-auto grid h-auto grid-cols-1">
        <div className="desktop:pt-20 desktop:pb-12">
          <div className="desktop:col-span-1 desktop:-mr-52 desktop:block relative col-span-1 hidden aspect-[15/11] h-auto w-[calc(100%+208px)] bg-center">
            <Image
              src="/static/images/recruitment/recruitment-banner-desktop.webp"
              alt="Background image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
              className="z-10"
            />
            <div className="desktop:block absolute -right-56 -top-12 hidden">
              <Image
                src="/static/icons/recruitment/PointBannerCareer.svg"
                width={285}
                height={306}
                alt=""
              />
            </div>
          </div>
          <div className="desktop:hidden relative block aspect-[47/40] w-full">
            <Image
              src="/static/images/recruitment/recruitment-banner-mobile.webp"
              alt=""
              layout="fill"
            />
          </div>
        </div>

        <div className="desktop:col-span-1 desktop:rounded-tr-4lg desktop:z-20 desktop:pt-32 col-span-1 flex items-center justify-end py-8">
          <div className="desktop:px-14 desktop:py-16 flex flex-col justify-center bg-white px-4">
            <h2 className="text-title24 text-secondary-90 desktop:text-title42 desktop:min-w-full text-left font-bold">
              Cùng Ahamove chuyển động và chinh phục các đỉnh cao!
            </h2>
            <p className="text-body16 mb-6 text-left font-normal text-black">
              Chúng tôi là Ahamovers - những người không ngừng chuyển động, luôn
              cải tiến để chinh phục những đỉnh cao mới cùng nhau!
            </p>
            <div>
              <Button title="Gia nhập Ahamove ngay" type="link" href="/job">
                Gia nhập Ahamove ngay
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-primary-10 rounded-tl-4lg desktop:block absolute inset-x-0 bottom-0 hidden h-1/2 w-full"></div>
    </section>
  );
}
