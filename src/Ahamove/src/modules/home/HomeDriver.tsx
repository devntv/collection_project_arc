import Image from 'next/image';
import Button from '@/components/Button';
import { homePoliciesData } from './homeData';

export default function HomeDriver() {
  return (
    <section className="desktop:py-16 bg-white py-8">
      <div className="max-w-8xl desktop:px-8 mx-auto">
        <div className="desktop:grid-cols-2 desktop:gap-20 grid grid-cols-1 gap-8">
          <div className="relative flex items-center justify-center">
            <div className="w-image relative aspect-square h-auto bg-transparent">
              <Image
                src="/static/images/home/driver.webp"
                alt=""
                layout="fill"
                className="z-20 rounded-tr-[200px]"
              />
              <div className="desktop:block desktop:-top-6 desktop:-right-6 absolute top-0 right-0 hidden bg-transparent">
                <Image
                  src="/static/icons/home/PointDriver.svg"
                  width={285}
                  height={306}
                  alt=""
                />
              </div>
              <div className="desktop:hidden absolute top-0 right-0 bg-transparent">
                <Image
                  src="/static/icons/home/PointDriver.svg"
                  width={137}
                  height={148}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start px-4">
            <p className="text-title32 desktop:text-title42 desktop:text-neutral-90 mb-9 text-left font-bold text-black">
              Trở thành Đối tác Tài xế của Ahamove
            </p>
            {homePoliciesData.map((item, idx) => (
              <div key={idx} className="mb-6 space-y-2">
                <Image src={item.icon} alt="" width={32} height={32} />
                <p className="text-subtitle18 desktop:font-bold text-left font-semibold text-black">
                  {item.title}
                </p>
                <p className="text-body14 desktop:text-subtitle18 text-left font-normal text-black">
                  {item.desc}
                </p>
              </div>
            ))}
            <Button
              title="Đăng ký làm Đối tác Tài xế"
              className="desktop:w-auto"
              type="link"
              href="/driver"
              fullWidth={true}
            >
              Đăng ký làm Đối tác Tài xế
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
