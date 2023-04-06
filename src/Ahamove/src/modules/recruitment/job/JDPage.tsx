import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { FC } from 'react';

import type { Job } from '@/api/cms/jobs/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import PreviewBanner from '@/components/PreviewBanner';
import ShareItem from '@/modules/blog/ShareItem';
import JDBanner from './JDBanner';
import JDMainContent from './JDMainContent';
type Props = {
  job: DefaultCmsDataResponse<Job> | null;
  previewMode?: boolean;
  apply?: boolean;
};

export const JDPage: FC<Props> = ({
  job,
  apply = false,
  previewMode = false,
}) => {
  const router = useRouter();
  const { slug } = router.query;
  async function exitPreviewMode() {
    const response = await fetch('/api/exit-preview');
    if (response) {
      router.reload();
    }
  }

  if (!slug) {
    return (
      <div className=" mx-auto flex h-screen w-screen items-center justify-center">
        <button
          type="button"
          className="text-body16 text-secondary-60 inline-flex cursor-not-allowed items-center px-4 py-2 font-semibold transition duration-150 ease-in-out"
          disabled
        >
          <svg
            className="text-primary-50 -ml-1 mr-3 h-6 w-6 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Đang tải nội dung...
        </button>
      </div>
    );
  }
  return (
    <Container title={job?.attributes?.title}>
      {previewMode ? <PreviewBanner onClick={() => exitPreviewMode()} /> : null}
      <main
        className={cn('min-h-content flex w-full grow flex-col', {
          'mt-header-mobile desktop:mt-header-desktop': !previewMode,
        })}
      >
        {job ? (
          <>
            <JDBanner job={job} />
            <div className="mx-auto mb-12 max-w-3xl">
              <JDMainContent
                apply={apply}
                jdContent={job.attributes?.content}
                jobTitle={job.attributes.title}
                jobSlug={job.attributes?.slug}
                jobID={job.id}
              />
            </div>
          </>
        ) : (
          <div className="desktop:col-span-3 col-span-1 py-8">
            <div className="relative mx-auto aspect-video w-full max-w-[431px]">
              <Image
                src="/static/icons/blog/NotFoundBlogs.svg"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        )}
      </main>
    </Container>
  );
};
