import cn from 'classnames';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

export default function CooperateSaaSBusiness(
  props: HTMLAttributes<HTMLDivElement>
) {
  return (
    <section
      className={cn('desktop:py-20 bg-white pt-8 pb-12', props.className)}
    >
      <div className="max-w-8xl desktop:grid-cols-2 desktop:px-8 mx-auto grid grid-cols-1 place-content-center items-center gap-12">
        <div className="flex justify-center">
          <div className="relative aspect-[29/20] h-auto w-full bg-transparent">
            <Image
              src="/static/images/customer/saas-business.webp"
              alt=""
              layout="fill"
            />
          </div>
        </div>
        <article className="desktop:space-y-4 desktop:px-0 items-start space-y-6 px-4">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-left font-bold">
            SaaS for your business
          </h2>
          <p className="text-body16 desktop:text-subtitle18 text-left font-normal text-black">
            Use these products to streamline your organization's workflows,
            enhance software, and build better experiences for employees and
            customers.
          </p>
          <div className="desktop:flex-row flex flex-col flex-wrap items-center">
            <Button
              setLocale={false}
              title="Liên hệ ngay"
              type="link"
              href="https://documentation.onwheel.io/"
              className="desktop:mb-0 desktop:block mr-6 mb-2 hidden"
            >
              Xem tài liệu
            </Button>
            <Button
              setLocale={false}
              title="Liên hệ ngay"
              type="link"
              href="https://documentation.onwheel.io/"
              className="desktop:mb-0 desktop:hidden mr-6 mb-4"
              fullWidth
            >
              Xem tài liệu
            </Button>
            <MoreInfo
              setLocale={false}
              title="Khám phá thêm"
              type="secondary"
              href="https://onwheel.io/"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
