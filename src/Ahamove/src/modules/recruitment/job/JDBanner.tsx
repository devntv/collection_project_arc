import Link from 'next/link';

import type { Job } from '@/api/cms/jobs/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import ArrowNarrowLeftIcon from '@/components/icons/ArrowNarrowLeftIcon';
import JobAbstract from '../JobAbstract';
type Props = {
  job: DefaultCmsDataResponse<Job>;
};

export default function JDBanner({ job }: Props) {
  return (
    <section className="bg-primary-10 desktop:py-14 flex items-center justify-center py-8">
      <div className="desktop:px-8 desktop:w-[831px] px-4">
        <div className="mb-4">
          <Link href="/job" passHref>
            <a className="text-body14 font-semibold text-neutral-50 hover:underline">
              <ArrowNarrowLeftIcon className="mr-2 inline-block h-5 fill-neutral-50" />
              Cơ hội nghề nghiệp
            </a>
          </Link>
        </div>
        <JobAbstract job={job} banner={true} />
      </div>
    </section>
  );
}