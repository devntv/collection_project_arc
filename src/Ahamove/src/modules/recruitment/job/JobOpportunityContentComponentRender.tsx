import { Listbox, Tab, Transition } from '@headlessui/react';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { FormatJobType, JobCategory } from '@/api/cms/jobs/types';
import type { GetJobsParams } from '@/api/cms/jobs/useGetJobs';
import { useGetJobs } from '@/api/cms/jobs/useGetJobs';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import MoreInfo from '@/components/MoreInfo';
import { MIN_PAGE_SIZE } from '@/lib/constants';
import ContactForRecruitment from '../ContactForRecruitment';
import JobAbstract from '../JobAbstract';
import JobSkeleton from './JobSkeleton';
type Props = {
  title?: string;
  desc?: string;
  preIntro?: string;
  location?: string;
  level?: string;
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
};

export default function JobOpportunityContentComponentRender({
  title,
  desc,
  preIntro,
  level,
  jobCategories,
  jobTypes,
  locations,
}: Props) {
  const { isReady } = useRouter();
  const [jobCategory, setJobCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const initialRender = useRef(true);

  const queryJobs: Partial<GetJobsParams> = {
    'pagination[pageSize]': MIN_PAGE_SIZE,
  };

  if (level === 'internship') {
    queryJobs['filters[job_categories][id][$eq]'] = 144;
  }

  if (selectedIndex !== 0) {
    const job = jobTypes?.find(
      (item) => item.attributes?.value === selectedIndex
    );
    if (job) queryJobs['filters[job_types][id][$eq]'] = job?.id;
  }

  if (location !== 'all') {
    const job = locations?.find(
      (item) => item.attributes?.slug === location?.toString()
    );
    if (job) queryJobs['filters[locations][id][$eq]'] = job?.id;
  }

  if (jobCategory !== 'all') {
    const job = jobCategories?.find(
      (item) => item.attributes?.slug === jobCategory?.toString()
    );
    if (job) queryJobs['filters[job_categories][id][$eq]'] = job?.id;
  }
  const {
    data: jobsData,
    refetch,
    isFetching,
    isLoading,
    isRefetching,
  } = useGetJobs(queryJobs);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!isReady) {
      return;
    } else {
      refetch();
    }
  }, [isReady, jobCategory, selectedIndex, location, refetch]);

  return (
    <section className="desktop:py-20 min-h-content bg-white py-10">
      <div className="max-w-8xl desktop:px-8 desktop:pb-9 mx-auto px-4">
        <p className="text-subtitle18 pb-4 font-semibold text-neutral-50">
          {preIntro}
        </p>
        <h2 className="desktop:text-title42 text-title32 text-neutral-80 pb-2 font-bold">
          {title}
        </h2>
        <p className="text-neutral-80 text-body16 font-normal">{desc}</p>
        <div className="desktop:grid-cols-4 desktop:gap-8 mt-12 grid grid-cols-2 gap-2">
          <Listbox value={location} onChange={setLocation}>
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {locations?.find(
                  (location1) => location1.attributes?.slug === location
                )
                  ? locations?.find(
                      (location1) => location1.attributes?.slug === location
                    )?.attributes?.name
                  : 'All locations'}
              </div>
              {locations.length > 0 ? (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    src="/static/icons/SelectDown.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              ) : null}
            </Listbox.Button>
            {locations.length > 0 ? (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  id="location"
                  className="desktop:w-[calc(25%-24px)] absolute z-30 mt-14 w-[calc(50%-16px)] space-y-2 rounded bg-white p-4 shadow-lg focus:outline-none"
                >
                  <Listbox.Option
                    key="all"
                    value="all"
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded py-2 px-4  ${
                        active
                          ? 'text-primary-50 bg-primary-10'
                          : 'text-neutral-90'
                      }`
                    }
                  >
                    <p className="min-w-[75px] text-left">All locations</p>
                  </Listbox.Option>
                  {locations?.map((location) => (
                    <Listbox.Option
                      key={location.id}
                      value={location.attributes?.slug}
                      className={({ active }) =>
                        `relative cursor-pointer select-none rounded py-2 px-4  ${
                          active
                            ? 'text-primary-50 bg-primary-10'
                            : 'text-neutral-90'
                        }`
                      }
                    >
                      <p className="min-w-[75px] text-left">
                        {location.attributes?.name}
                      </p>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </Listbox>
          <Listbox
            value={jobCategory}
            onChange={setJobCategory}
            disabled={level === 'internship' ? true : false}
          >
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {level === 'internship'
                  ? 'Internship'
                  : jobCategories?.find(
                      (category) =>
                        category.attributes?.slug === jobCategory.toString()
                    )
                  ? jobCategories?.find(
                      (category) =>
                        category.attributes?.slug === jobCategory.toString()
                    )?.attributes?.name
                  : 'All levels'}
              </div>
              {jobCategories.length > 0 ? (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    src="/static/icons/SelectDown.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              ) : null}
            </Listbox.Button>
            {jobCategories.length > 0 ? (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  id="level"
                  className="desktop:w-[calc(25%-24px)] absolute left-1/2 z-30 mt-14 w-[calc(50%-16px)] space-y-2 rounded bg-white p-4 shadow-lg focus:outline-none"
                >
                  <Listbox.Option
                    key="all"
                    value="all"
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded py-2 px-4  ${
                        active
                          ? 'text-primary-50 bg-primary-10'
                          : 'text-neutral-90'
                      }`
                    }
                  >
                    <p className="min-w-[75px] text-left">All levels</p>
                  </Listbox.Option>
                  {jobCategories?.map((category) => (
                    <Listbox.Option
                      key={category.id}
                      value={category.attributes?.slug}
                      className={({ active }) =>
                        `relative cursor-pointer select-none rounded py-2 px-4  ${
                          active
                            ? 'text-primary-50 bg-primary-10'
                            : 'text-neutral-90'
                        }`
                      }
                    >
                      <p className="min-w-[75px] text-left">
                        {category.attributes?.name}
                      </p>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </Listbox>
        </div>
      </div>

      <div className="max-w-8xl desktop:flex desktop:px-8 mx-auto hidden flex-row">
        <Tab.Group
          vertical
          defaultIndex={
            jobTypes &&
            jobTypes.find((item) => item.attributes?.value === selectedIndex)
              ?.attributes?.value
          }
          onChange={setSelectedIndex}
        >
          <Tab.List className="desktop:flex desktop:flex-none desktop:flex-col desktop:border-r-2 desktop:border-r-neutral-15 desktop:pr-8 w-full max-w-[358px] flex-wrap space-y-6">
            <p className="text-subtitle18 text-neutral-90 pb-3 font-semibold">
              Bộ phận
            </p>
            {jobTypes.length > 0 ||
            (jobTypes.length < 1 &&
              jobsData?.data.length &&
              jobsData?.data.length > 0) ? (
              <Tab
                className={({ selected }) =>
                  cn(
                    'text-subtitle18 text-justify font-semibold focus-visible:outline-none',
                    selected
                      ? 'text-primary-50 font-bold'
                      : 'hover:text-primary-30 text-neutral-50'
                  )
                }
              >
                <h3>Tất cả các bộ phận</h3>
              </Tab>
            ) : null}
            {jobTypes?.map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  cn(
                    'text-subtitle18 text-justify font-semibold focus-visible:outline-none',
                    selected
                      ? 'text-primary-50 font-bold'
                      : 'hover:text-primary-30 text-neutral-50'
                  )
                }
              >
                <h3>
                  {item.attributes?.jobs?.data &&
                  item.attributes?.jobs?.data.length > 0 &&
                  level !== 'internship'
                    ? `${item.attributes?.name} (${item.attributes?.jobs?.data.length})`
                    : `${item.attributes?.name}`}
                </h3>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="desktop:grow desktop:pl-8">
            <div className="mb-6 flex flex-row justify-between">
              <p className="text-neutral-90 text-subtitle18 font-bold">
                Vị trí tuyển dụng
              </p>
              <MoreInfo
                title="Xem tất cả"
                type="primary"
                href="/job"
                className={cn({
                  hidden: level === 'internship',
                })}
              />
            </div>
            <hr className="text-neutral-15 h-2" />
            <Tab.Panel className="flex flex-col space-y-6">
              {isRefetching || isLoading || isFetching ? (
                <>
                  {Array.from(Array(3).keys()).map((item) => (
                    <div key={item}>
                      <JobSkeleton />
                    </div>
                  ))}
                </>
              ) : jobsData && jobsData.data ? (
                jobsData?.data.map((job, idx) => (
                  <div key={job.id}>
                    <JobAbstract job={job} />
                    <hr
                      className={cn('text-neutral-15 h-2', {
                        hidden: idx === jobsData?.data.length - 1,
                      })}
                    />
                  </div>
                ))
              ) : (
                <div className="desktop:col-span-3 col-span-1 py-8">
                  <EmptyState type="job" />
                </div>
              )}
            </Tab.Panel>
            {jobTypes &&
              Array.from(Array(jobTypes.length).keys()).map((item) => (
                <Tab.Panel key={item} className="flex flex-col space-y-6">
                  {jobsData?.data &&
                  jobsData.data.length > 0 &&
                  !isLoading &&
                  !isFetching &&
                  !isRefetching ? (
                    jobsData?.data.map((job, idx) => (
                      <div key={job.id}>
                        <JobAbstract job={job} />
                        <hr
                          className={cn('text-neutral-15 h-2', {
                            hidden: idx === jobsData?.data.length - 1,
                          })}
                        />
                      </div>
                    ))
                  ) : isFetching || isLoading || isRefetching ? (
                    Array.from(Array(3).keys()).map((item) => (
                      <div key={item}>
                        <JobSkeleton />
                        <hr
                          className={cn('text-neutral-15 h-2', {
                            hidden: item === 2,
                          })}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="desktop:px-8 mx-auto w-full py-8 px-4">
                      <EmptyState type="job" />
                    </div>
                  )}
                </Tab.Panel>
              ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="desktop:hidden flex flex-col px-4">
        <div className="z-20 bg-white py-6">
          <Listbox
            value={
              jobTypes &&
              jobTypes.find((item) => item.attributes?.value === selectedIndex)
                ?.attributes?.value
            }
            onChange={setSelectedIndex}
          >
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {jobTypes &&
                jobTypes.find(
                  (item) => item.attributes?.value === selectedIndex
                )
                  ? jobTypes.find(
                      (item) => item.attributes?.value === selectedIndex
                    )?.attributes?.name
                  : 'Tất cả các bộ phận'}
              </div>
              {jobTypes.length > 0 ? (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    src="/static/icons/SelectDown.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              ) : null}
            </Listbox.Button>
            {jobTypes.length > 0 ? (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-[calc(100%-32px)] space-y-2 overflow-auto rounded bg-white p-4 shadow-lg focus:outline-none">
                  <Listbox.Option
                    value="all"
                    className={({ selected }) =>
                      cn(
                        'relative cursor-pointer select-none rounded py-3 text-left',
                        {
                          'text-primary-50': selected,
                          'text-neutral-90': !selected,
                        }
                      )
                    }
                  >
                    Tất cả các bộ phận
                  </Listbox.Option>
                  {jobTypes?.map((item) => (
                    <Listbox.Option
                      key={item.attributes?.value}
                      value={item.attributes?.value}
                      className={({ selected }) =>
                        cn(
                          'relative cursor-pointer select-none rounded py-3 text-left',
                          {
                            'text-primary-50': selected,
                            'text-neutral-90': !selected,
                          }
                        )
                      }
                    >
                      {item.attributes?.jobs?.data
                        ? `${item.attributes?.name} (${item.attributes?.jobs?.data.length})`
                        : `${item.attributes?.name}`}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </Listbox>
        </div>

        <div className="flex flex-col space-y-6">
          <p className="text-neutral-90 text-subtitle18 font-bold">
            Vị trí tuyển dụng
          </p>
          {jobsData?.data &&
          jobsData.data.length > 0 &&
          !isLoading &&
          !isFetching ? (
            jobsData?.data.map((job, idx) => (
              <div key={job.id}>
                <JobAbstract job={job} />
                <hr
                  className={cn('text-neutral-15 h-2', {
                    hidden: idx === jobsData?.data.length - 1,
                  })}
                />
              </div>
            ))
          ) : isFetching || isLoading ? (
            Array.from(Array(3).keys()).map((item) => (
              <div key={item}>
                <JobSkeleton />
                <hr
                  className={cn('text-neutral-15 h-2', {
                    hidden: item === 2,
                  })}
                />
              </div>
            ))
          ) : (
            <div className="desktop:px-8 mx-auto w-full py-8 px-4">
              <EmptyState type="job" />
            </div>
          )}
        </div>
        <div className="desktop:hidden mx-auto mt-8 block">
          <Button type="link" href="/job">
            Xem tất cả
          </Button>
        </div>
      </div>
      <div className="max-w-8xl desktop:flex desktop:px-8 mx-auto mt-12 hidden flex-row">
        <ContactForRecruitment />
      </div>
    </section>
  );
}
