import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import ShareItem from '@/modules/blog/ShareItem';
import JobApplicationForm from './JobApplicationForm';

type Props = {
  apply?: boolean;
  jdContent: string;
  jobTitle: string;
  jobID: number;
  jobSlug: string;
};

export default function JDMainContent({
  apply = false,
  jdContent,
  jobTitle,
  jobID,
  jobSlug,
}: Props) {
  const router = useRouter();
  const { query } = useRouter();
  return (
    <section className="desktop:py-10 min-h-content bg-white py-6">
      <div className="desktop:px-8 max-w-content mx-auto flex flex-col px-4">
        <Tab.Group
          defaultIndex={apply ? 1 : 0}
          onChange={(index) => {
            index === 1
              ? router.push({
                  pathname: '/job/[slug]/apply',
                  query: { slug: query.slug },
                })
              : router.push({
                  pathname: '/job/[slug]',
                  query: { slug: query.slug },
                });
          }}
        >
          <Tab.List className="flex flex-row">
            <Tab
              className={({ selected }) =>
                cn(
                  'text-subtitle18 h-full px-4 py-2 text-justify font-semibold focus-visible:outline-none',
                  selected
                    ? 'text-primary-50 border-primary-50 border-b-2 font-bold'
                    : 'hover:text-primary-30 border-neutral-15 border-b-2 text-neutral-50'
                )
              }
            >
              <div className="flex flex-col">
                <p>Công việc</p>
              </div>
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  'text-subtitle18 px-4 py-2 text-justify font-semibold focus-visible:outline-none',
                  selected
                    ? 'text-primary-50 border-primary-50 border-b-2 font-bold'
                    : 'hover:text-primary-30 border-neutral-15 border-b-2 text-neutral-50'
                )
              }
            >
              Ứng tuyển
            </Tab>
          </Tab.List>
          <hr className="text-neutral-15 h-2" />
          <Tab.Panels className="mt-10">
            <Tab.Panel className="desktop:space-x-6 flex flex-row flex-nowrap space-x-4">
              <aside>
                <ShareItem
                  className="sticky top-1/3 left-20 z-10 mt-4"
                  title={jobTitle}
                  slug={jobSlug}
                  job
                />
              </aside>
              <div className="flex flex-col">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: jdContent }}
                ></div>
                <div className="mt-6">
                  <Button
                    type="link"
                    href={{
                      pathname: '/job/[slug]/apply',
                      query: { slug: query.slug },
                    }}
                  >
                    Ứng tuyển ngay
                  </Button>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="desktop:min-w-3xl">
              <JobApplicationForm jobTitle={jobTitle} jobID={jobID} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}
