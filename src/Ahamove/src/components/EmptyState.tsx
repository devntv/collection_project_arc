import Image from 'next/image';

type Props = {
  type: 'blog' | 'job';
};

export default function EmptyState({ type }: Props) {
  return (
    <div className="desktop:px-8 col-span-1 mx-auto flex min-h-[50vh] w-full max-w-7xl grow flex-col justify-center px-4">
      {type === 'blog' ? (
        <div className="relative mx-auto aspect-video w-full max-w-[256px] bg-transparent">
          <Image
            src="/static/icons/blog/NotFoundBlogs.svg"
            alt=""
            layout="fill"
          />
        </div>
      ) : (
        <div className="relative mx-auto aspect-square w-full max-w-[192px]">
          <Image
            src="/static/icons/recruitment/NotFoundJobs.svg"
            alt=""
            layout="fill"
          />
        </div>
      )}
    </div>
  );
}
