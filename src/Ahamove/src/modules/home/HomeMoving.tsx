import Image from 'next/image';
import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

export default function HomeMoving() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-8xl desktop:grid-cols-2 desktop:px-8 mx-auto grid grid-cols-1 items-center gap-12">
        <article className="desktop:order-first desktop:items-start desktop:space-y-4 order-last mx-auto flex flex-col items-center space-y-6 px-4">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-left font-bold">
            Luôn chuyển động cùng bạn, dù bạn là ai
          </h2>
          <p className="text-body14 desktop:text-subtitle18 text-left font-normal text-black">
            Chúng tôi mang đến cho doanh nghiệp của bạn và khách hàng những trải
            nghiệm hài lòng nhất về thời gian, chi phí và sự an tâm trên mỗi
            chuyến hàng.
          </p>
          <Button
            title="Khám phá thêm"
            className="desktop:block hidden"
            type="link"
            href="/customer/merchant/#registation-form"
          >
            Khám phá thêm
          </Button>
          <Button
            title="Đăng ký trở thành khách hàng"
            className="desktop:hidden block"
            type="link"
            href="/customer/merchant/#registation-form"
            fullWidth={true}
          >
            Đăng ký trở thành khách hàng
          </Button>
          <MoreInfo
            title=" Khám phá thêm"
            type="secondary"
            className="desktop:hidden"
            href="/customer/merchant"
          />
        </article>
        <div className="desktop:rounded-t-full desktop:border-x-2 desktop:border-t-2 desktop:border-primary-50 desktop:px-6 desktop:pt-6 relative flex justify-center">
          <div className="desktop:rounded-t-full desktop:border-x-2 desktop:border-t-2 desktop:border-primary-50 desktop:px-6 desktop:pt-6 static bg-transparent">
            <Image
              src="/static/images/home/merchant.webp"
              width={596}
              height={677}
              alt="Luôn chuyển động cùng bạn dù bạn là ai"
              className="rounded-t-full bg-transparent"
            />
          </div>

          <div className="desktop:block absolute bottom-0 -right-5 hidden">
            <Image
              src="/static/icons/home/PointMerchant.svg"
              width={154}
              height={40}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
