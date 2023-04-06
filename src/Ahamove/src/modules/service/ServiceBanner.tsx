import cn from 'classnames';
import Image from 'next/image';
import type { ReactNode } from 'react';

type Props = {
  id?: string;
  title?: string;
  desc?: string;
  urlImageDesktop: string;
  urlImageMobile: string;
  children?: ReactNode;
  type: 'primary' | 'secondary' | 'others';
};

export default function ServiceBanner(props: Props) {
  return (
    <section
      className="desktop:grid-cols-2 grid h-auto grid-cols-1"
      id={props.id}
    >
      <div
        className={cn(
          'desktop:col-span-1 desktop:rounded-tr-4lg desktop:z-20 desktop:order-first desktop:py-32 desktop:pr-10 order-last col-span-1 flex items-center justify-end py-8',
          { 'bg-secondary-10': props.type === 'secondary' },
          {
            'bg-primary-10':
              props.type === 'primary' || props.type === 'others',
          }
        )}
      >
        <div className="desktop:max-w-[550px] flex flex-col justify-center px-4">
          <h2
            className={cn(
              'text-title32 text-secondary-90 desktop:text-title60 desktop:min-w-full mb-4 text-left  font-bold',
              { hidden: props.type === 'others' }
            )}
          >
            {props.title}
          </h2>
          <p
            className={cn(
              'text-subtitle18 mb-8 text-left font-normal text-black',
              { hidden: props.type === 'others' }
            )}
          >
            {props.desc}
          </p>
          <div className="flex items-start">{props.children}</div>
        </div>
      </div>
      <div className="desktop:col-span-1 desktop:-ml-52 desktop:block relative col-span-1 hidden aspect-[16/10] h-full w-[calc(100%+208px)] bg-center">
        <Image
          src={props.urlImageDesktop}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="desktop:hidden relative block aspect-[149/100] w-full">
        <Image src={props.urlImageMobile} alt="" layout="fill" />
      </div>
    </section>
  );
}
