import cn from 'classnames';
import Image from 'next/image';
import Button from '@/components/Button';

type Props = {
  img: string;
  title: string;
  desc: string;
  type: 'row' | 'column' | 'row-reverse';
  className?: string;
  href: string;
};

export default function UtilityItem(props: Props) {
  return (
    <article
      className={cn(
        'desktop:px-5 group mx-auto grid grid-cols-1',
        props.className,
        {
          'desktop:w-4/5 desktop:grid-cols-2 desktop:gap-8 auto-rows-fr gap-4':
            props.type !== 'column',
          'desktop:w-full gap-4': props.type === 'column',
        }
      )}
    >
      <div
        className={cn(
          'relative order-first  aspect-video overflow-hidden rounded-lg bg-transparent',
          {
            'desktop:order-last': props.type === 'row-reverse',
          }
        )}
      >
        <Image
          src={props.img}
          alt="utility image"
          layout="fill"
          className="transition duration-200 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-start justify-start rounded-tr-lg">
        <h3 className="text-title24 mb-4 font-bold text-black">
          {props.title}
        </h3>
        <p className="max-w-4/5 text-body16 mb-6 font-normal text-black">
          {props.desc}
        </p>
        <Button title="Tìm hiểu thêm" type="link" href={props.href}>
          Tìm hiểu thêm
        </Button>
      </div>
    </article>
  );
}
