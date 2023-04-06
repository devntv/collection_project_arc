import cn from 'classnames';
import Image from 'next/image';

import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

type Item = {
  id: string;
  title: string;
  desc: string;
};

type Props = {
  title: string;
  desc: string;
  items: Item[];
  className?: string;
  hasMoreInfo?: boolean;
  button: string;
  moreInfo?: string;
  hrefButton: string;
  hrefMoreInfo?: string;
  setLocaleMoreInfo?: boolean;
  setLocaleButton?: boolean;
};

export default function MeetAllDemands({
  title,
  desc,
  items,
  className,
  hasMoreInfo = false,
  button,
  moreInfo,
  hrefButton,
  hrefMoreInfo,
  setLocaleButton = true,
  setLocaleMoreInfo = true,
}: Props) {
  return (
    <section className={cn('bg-secondary-10 py-20', className)}>
      <div className="max-w-8xl desktop:grid-cols-2 desktop:px-8 mx-auto grid grid-cols-1 place-content-center items-center gap-12 px-4">
        <div className="flex justify-center">
          <div className="relative aspect-[325/227] h-auto w-full bg-transparent">
            <Image
              src="/static/images/customer/desktop-mobile.webp"
              alt=""
              layout="fill"
            />
          </div>
        </div>
        <article className="mx-auto flex flex-col items-start">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 mb-2 text-left font-bold">
            {title}
          </h2>
          <p className="text-body18 text-neutral-80 mb-6 text-left font-normal">
            {desc}
          </p>
          <ul className="text-neutral-80 mb-6 space-y-6">
            {items.map((item) => (
              <li key={item.id} className="flex flex-row space-x-4">
                <div
                  className="relative mt-1 h-5 w-5 shrink-0 bg-transparent
                "
                >
                  <Image
                    src="/static/icons/customer/CheckCircle.svg"
                    alt=""
                    layout="fill"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h5 className="text-subtitle18 font-bold">{item.title}</h5>
                  <p className="text-body16 font-normal">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-row flex-nowrap space-x-6">
            <Button type={'link'} href={hrefButton} setLocale={setLocaleButton}>
              {button}
            </Button>
            <MoreInfo
              className={cn({ hidden: !hasMoreInfo })}
              title={moreInfo ? moreInfo : ''}
              type="secondary"
              href={hrefMoreInfo ? hrefMoreInfo : '/'}
              setLocale={setLocaleMoreInfo}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
