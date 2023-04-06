import cn from 'classnames';
import useMediaQuery from '@/lib/useMediaQuery';

export default function BlogContentSkeleton() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="desktop:grid-cols-2 desktop:gap-x-8 grid w-full grid-cols-1">
      <div className="col-span-1">
        <div className="flex h-full w-full animate-pulse flex-col space-y-3">
          <div className="bg-neutral-15 desktop:min-h-[350px] h-full min-h-[228px] w-full rounded-lg" />
          <div className="flex w-full flex-col space-y-3">
            <div className="bg-neutral-15 h-6 w-1/3 rounded-md" />
            <div className="bg-neutral-15 h-12 w-4/5 rounded-md" />
            <div className="bg-neutral-15 h-6 w-1/3 rounded-md" />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        {Array.from(Array(isDesktop ? 2 : 2).keys()).map((index, item) => (
          <div
            className={cn('desktop:flex-row group flex flex-col items-start', {
              'pt-6': index !== 0 || !isDesktop,
            })}
            key={item}
          >
            <div className="bg-neutral-15 desktop:min-h-0 h-44 min-h-[228px] w-full rounded-lg" />
            <div className="desktop:pl-6 desktop:pt-0 flex w-full flex-col space-y-3 pt-6">
              <div className="bg-neutral-15 h-6 w-1/3 rounded-md" />
              <div className="bg-neutral-15 h-12 w-4/5 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}