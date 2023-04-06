import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { HTMLAttributes } from 'react';
import { contactJobData } from './recruitmentData';

export default function ContactForRecruitment(
  props: HTMLAttributes<HTMLDivElement>
) {
  const { locale } = useRouter();
  return (
    <div className="desktop:grid-cols-3 desktop:grid hidden grid-cols-1 gap-6">
      {contactJobData.map((item) => (
        <article
          key={item.id}
          className={cn(
            'border-neutral-15 group rounded-2xl border-2 bg-white text-center',
            props.className
          )}
        >
          <div className="flex h-full flex-col items-center space-y-6 p-6">
            <div className="relative h-16 w-16 shrink-0">
              <Image src={item.icon} alt="" layout="fill" />
            </div>
            <div className="mt-6 flex flex-col space-y-3">
              {item.items.map((item1, idx1) => (
                <Link key={idx1} href={item1.href} passHref locale={locale}>
                  <a title={item.type} className="inline-block">
                    <p className="text-body16 text-neutral-90 hover:text-neutral-70 flex-1 font-normal">
                      {item1.title}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
