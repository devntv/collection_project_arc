import cn from 'classnames';
import Image from 'next/image';

type Item = {
  id: string;
  logo: string;
};

type Props = {
  title?: string;
  cols: '3' | '4';
  items: Item[];
  className?: string;
};

export default function CooperateCustomers({
  title,
  cols,
  items,
  className,
}: Props) {
  return (
    <section className={cn('desktop:py-20 bg-white py-8', className)}>
      <div className="desktop:px-8 max-w-8xl mx-auto flex flex-col items-center justify-center px-4">
        {title ? (
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 max-w-content mb-12 text-center font-bold">
            {title}
          </h2>
        ) : null}

        <div
          className={cn(
            'desktop:gap-x-8 desktop:gap-y-6 grid h-fit w-full grid-cols-2 gap-4',
            {
              'desktop:grid-cols-3 desktop:max-w-3/4': cols === '3',
              'desktop:grid-cols-4': cols === '4',
            }
          )}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[91/50] h-auto w-full bg-transparent"
            >
              <Image src={item.logo} alt="" layout="fill" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
