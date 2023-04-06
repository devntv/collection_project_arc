import Image from 'next/image';
import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

export default function DriverJoinCommunity() {
  return (
    <section className="bg-primary-10 overflow-hidden">
      <div className="max-w-8xl desktop:px-8 desktop:grid-cols-2 desktop:gap-x-20 relative mx-auto grid w-full grid-cols-1 gap-y-11">
        <article className="desktop:px-0 desktop:pb-20 col-span-1 mx-auto flex flex-col space-y-6 px-4 pt-20">
          <h2 className="desktop:text-title42 text-title32 text-neutral-90 text-left font-bold">
            Gia nhập cộng đồng Ahamove ngay hôm nay
          </h2>
          <p className="text-title18 text-neutral90 font-medium">
            Thu nhập lên đến 12-15 triệu / tháng cùng với Ahamove
          </p>
          <div className="desktop:flex-row flex flex-col flex-wrap items-center">
            <Button
              type="link"
              className="desktop:mb-0 desktop:block mr-6 mb-2 hidden"
              href="/tai-xe-ahamove"
            >
              Cộng đồng Ahamove
            </Button>
            <Button
              type="link"
              className="desktop:mb-0 desktop:hidden mr-6 mb-4"
              href="/tai-xe-ahamove"
              fullWidth
            >
              Cộng đồng Ahamove
            </Button>
            <MoreInfo title="Đăng ký tài xế" type="secondary" href="/driver" />
          </div>
        </article>
        <div className="col-span-1 flex h-full items-end justify-end pt-4">
          <div className="bg-primary-50 inset-0 h-auto w-full rounded-t-full px-4">
            <div className="desktop:block desktop:h-auto desktop:w-full relative z-20 aspect-[5/4] h-auto w-full bg-transparent">
              <Image
                src="/static/images/driver/join-community.webp"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
