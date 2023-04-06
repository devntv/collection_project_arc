import cn from 'classnames';
import Image from 'next/image';
import type { ReactNode } from 'react';
import Button from '@/components/Button';

type Items = {
  id: string;
  icon: string;
  title?: string;
  predesc?: string;
  desc: string;
  href?: string;
};

type Props = {
  title?: string;
  desc?: string;
  predesc?: string;
  type?: 'service' | 'benefit' | 'cooperate';
  items: Items[];
  className?: string;
  children?: ReactNode;
};

export default function BenefitsContent({
  title,
  desc,
  predesc,
  items,
  className,
  children,
  type = 'benefit',
}: Props) {
  return (
    <section className={cn(className)}>
      <div className="max-w-8xl desktop:my-20 desktop:px-8 mx-auto my-16 flex flex-col items-center justify-center px-4">
        <article className="max-w-content desktop:space-y-4 flex-col space-y-3">
          {title && (
            <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-center font-bold">
              {title}
            </h2>
          )}
          {desc && (
            <p className="text-body14 desktop:text-subtitle18 desktop:font-medium text-center font-normal text-black">
              {predesc && <span className="font-bold">{predesc}</span>} {desc}
            </p>
          )}
        </article>
        <div
          className={cn('mb-6 grid grid-cols-1 gap-4 pt-12', {
            [`desktop:grid-cols-${items.length}`]: true,
          })}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className={cn('mx-2 rounded-2xl bg-transparent p-6 text-center', {
                'desktop:shadow-dropshadow': type === 'service',
              })}
            >
              <div className="flex h-full flex-col items-center justify-start">
                <div className="relative h-20 w-20 shrink-0">
                  <Image src={item.icon} alt="" layout="fill" />
                </div>

                {item.title && (
                  <p className="text-subtitle20 mt-6 font-semibold text-black">
                    {item.title}
                  </p>
                )}
                <p
                  className={cn(
                    'text-body16 desktop:font-medium mt-2 font-normal text-black',
                    {
                      'min-h-[96px]': type === 'cooperate',
                    }
                  )}
                >
                  {item.predesc && (
                    <span className="font-bold">{item.predesc}</span>
                  )}{' '}
                  {item.desc}
                </p>
                {type === 'cooperate' && (
                  <Button type="link" className="mt-4" href={item.href}>
                    Tìm hiểu thêm
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
