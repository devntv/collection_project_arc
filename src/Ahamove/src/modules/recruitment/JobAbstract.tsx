import cn from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Job } from '@/api/cms/jobs/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
type Props = {
  job: DefaultCmsDataResponse<Job>;
  banner?: boolean;
  className?: string;
};

export const CoreComponent = ({ banner = false, job }: Props) => (
  <article
    className={cn(' flex grow flex-col', {
      'prose desktop:prose-2xl': banner,
      'space-y-3': !banner,
    })}
  >
    <h3
      className={cn('text-left', {
        'text-subtitle18 font-semibold group-hover:underline': !banner,
        'desktop:text-title32 text-neutral-80 text-title24 font-bold': banner,
      })}
    >
      {job.attributes?.title}
    </h3>
    <div className="flex flex-row flex-wrap">
      {job?.attributes?.locations?.data.length > 0 ? (
        <div className="text-body14 text-neutral-80 !mt-0 mr-4 mb-2 font-normal">
          <div className="relative mr-2 inline-flex h-5 w-5 flex-none align-middle">
            <Image
              src="/static/icons/recruitment/Location.svg"
              alt=""
              layout="fill"
            />
          </div>
          {job?.attributes?.locations?.data.length > 0 &&
            job.attributes?.locations?.data
              .map((item) => item.attributes?.name)
              .join(', ')}
        </div>
      ) : null}
      {job?.attributes?.salary ? (
        <div className="text-body14 text-neutral-80 !mt-0 mr-4 mb-2 font-normal">
          <div className="relative mr-2 inline-flex h-5 w-5 flex-none align-middle">
            <Image
              src="/static/icons/recruitment/CashMoney.svg"
              alt=""
              layout="fill"
            />
          </div>
          {job?.attributes?.salary}
        </div>
      ) : null}
      {(banner && job?.attributes?.publishedAt) ||
      job?.attributes?.job_categories?.data.length > 0 ? (
        <div className="text-body14 text-neutral-80 !mt-0 mr-4 mb-2 font-normal">
          <div className="relative mr-2 inline-flex h-5 w-5 flex-none align-middle">
            <Image
              src={
                banner
                  ? '/static/icons/recruitment/TimeCircle.svg'
                  : '/static/icons/recruitment/Form.svg'
              }
              alt=""
              layout="fill"
            />
          </div>
          {banner
            ? dayjs(job?.attributes?.publishedAt).format('DD/MM/YYYY')
            : job?.attributes?.job_categories?.data.length > 0 &&
              job.attributes?.job_categories?.data
                .map((item) => item.attributes?.name)
                .join(', ')}
        </div>
      ) : null}
    </div>
  </article>
);

export default function JobAbstract({ className, job, banner = false }: Props) {
  const { locale } = useRouter();
  return banner ? (
    <CoreComponent job={job} banner={true} />
  ) : (
    <Link
      href={{
        pathname: '/job/[slug]',
        query: { slug: job.attributes?.slug },
      }}
      passHref
      locale={locale}
    >
      <a
        className={cn(
          'group flex flex-row flex-nowrap items-center self-center pt-2 pb-6',
          { 'justify-between': !banner, 'justify-start': banner },
          className
        )}
        title={job.attributes?.title}
      >
        <CoreComponent job={job} banner={false} />
        <div className="relative inline-block h-6 w-6 flex-none">
          <Image
            src="/static/icons/recruitment/ArrowNext.svg"
            alt=""
            layout="fill"
          />
        </div>
      </a>
    </Link>
  );
}
