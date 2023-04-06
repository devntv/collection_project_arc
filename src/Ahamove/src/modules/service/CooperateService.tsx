import cn from 'classnames';
import Image from 'next/image';
import MoreInfo from '@/components/MoreInfo';

type Props = {
  title: string;
  desc: string;
  img: string;
  type: 'primary' | 'secondary';
  className?: string;
  href: string;
  imageLeft?: boolean;
};

export default function CooperateService({
  title,
  desc,
  img,
  type,
  className,
  href,
  imageLeft = true,
}: Props) {
  return (
    <section
      className={cn('desktop:py-20 max-w-8xl mx-auto bg-white', className)}
    >
      <div
        className={cn(
          'desktop:w-4/5 desktop:grid-cols-2 desktop:rounded-lg mx-auto grid grid-cols-1',
          {
            'bg-secondary-10': type === 'secondary',
            'bg-primary-10': type === 'primary',
          }
        )}
      >
        <div
          className={cn('relative order-last my-auto aspect-[31/25] w-full', {
            'desktop:order-first': !imageLeft,
          })}
        >
          <Image src={img} alt="cooperate service" layout="fill" priority />
        </div>

        <div className=" desktop:px-10 flex flex-col items-start justify-center px-4 py-8">
          <h3 className="text-title24 mb-4 font-bold text-black">{title}</h3>
          <p className="text-body16 mb-6 font-normal text-black">{desc}</p>
          <div>
            <MoreInfo title="Khám phá thêm" type="primary" href={href} />
          </div>
        </div>
      </div>
    </section>
  );
}
