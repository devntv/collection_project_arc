import Image from 'next/image';
import Button from '@/components/Button';

type Item = {
  id: string;
  title: string;
  desc: string;
  img: string;
};

type Props = {
  title: string;
  desc?: string;
  items: Item[];
};

export default function AboutUsCulture({ title, desc, items }: Props) {
  return (
    <section>
      <div className="max-w-8xl desktop:my-20 desktop:px-8 mx-auto my-16 flex flex-col items-center justify-center px-4">
        <article className="max-w-content flex-col">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-center font-bold">
            {title}
          </h2>
          <p className="text-body14 desktop:text-subtitle18 desktop:font-medium mt-2 text-center font-normal text-black">
            {desc}
          </p>
        </article>
        <div className="desktop:grid-cols-3 grid grid-cols-1 gap-6 pt-11">
          {items.map((item) => (
            <article
              key={item.id}
              className="mx-2 rounded-2xl bg-transparent text-left"
            >
              <div className="flex h-full flex-col items-center justify-start">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt=""
                    layout="fill"
                    className="transition duration-200 ease-out group-hover:scale-105"
                    priority
                  />
                </div>

                <p className="text-subtitle20 mt-6 text-center font-semibold text-black">
                  {item.title}
                </p>
                <p className="text-body16 mt-2 text-center font-normal text-black">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
        <Button type="link" className="mt-16" href="/recruitment">
          Tìm hiểu thêm
        </Button>
      </div>
    </section>
  );
}
