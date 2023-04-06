import cn from 'classnames';
import type { HTMLAttributes } from 'react';
import { homeStatisticsData } from './homeData';

export default function HomeStatistics(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "bg-secondary-10 desktop:pt-16 desktop:pb-12 desktop:bg-[url('/static/icons/home/VectorBgStatistics.svg')] bg-cover bg-no-repeat py-8",
        props.className
      )}
    >
      <div className="max-w-8xl desktop:grid-cols-4 desktop:gap-8 desktop:px-8 mx-auto grid grid-cols-2 gap-x-2 gap-y-6 px-4">
        {homeStatisticsData.map((item, idx) => (
          <article className="space-y-2 p-2" key={idx}>
            <p className="text-title32 text-secondary-40 desktop:text-title42 truncate text-left font-bold">
              {item.quantity}
            </p>
            <p className="max-w-4/5 text-body14 desktop:text-body16 text-left font-normal text-black">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}