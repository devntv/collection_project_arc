import { Listbox, Tab, Transition } from '@headlessui/react';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { FormatJobType, JobCategory } from '@/api/cms/jobs/types';
import { useGetInfiniteJobs } from '@/api/cms/jobs/useGetJobs';
import type { GetJobsParams } from '@/api/cms/jobs/useGetJobs';
import type { DefaultCmsDataResponse, Location } from '@/api/cms/types';
import { MIN_PAGE_SIZE, PAGE_SIZE } from '@/lib/constants';
import ContactForRecruitment from '../ContactForRecruitment';
import JobAbstract from '../JobAbstract';
import JobSkeleton from './JobSkeleton';
type Props = {
  title?: string;
  desc?: string;
  preIntro?: string;
  location?: string;
  jobCategories: DefaultCmsDataResponse<JobCategory>[];
  jobTypes: DefaultCmsDataResponse<FormatJobType>[];
  locations: DefaultCmsDataResponse<Location>[];
};

export default function JobOpportunityContentPageRender({
  title,
  desc,
  preIntro,
  jobCategories,
  jobTypes,
  locations,
}: Props) {
  const router = useRouter();
  const { isReady, query } = useRouter();
  const { job_categories, job_types, location } = router.query;
  const initialRender = useRef(true);

  const renderPageFilterLocationHandler = useCallback(
    (location: string) => {
      const currentQuery: { job_categories?: string; job_types?: string } = {};
      if (query.job_categories) {
        currentQuery.job_categories = `${query.job_categories}`;
      }
      if (query.job_types) {
        currentQuery.job_types = `${query.job_types}`;
      }
      location !== 'all'
        ? router.push(
            {
              pathname: '/job',
              query: { ...query, location: location },
            },
            undefined,
            { scroll: false, shallow: true }
          )
        : query
        ? router.push(
            {
              pathname: '/job',
              query: currentQuery,
            },
            undefined,
            { scroll: false, shallow: true }
          )
        : router.push('/job', undefined, { scroll: false, shallow: true });
    },
    [query, router]
  );

  const renderPageFilterLevelHandler = useCallback(
    (jobCategory: string) => {
      const currentQuery: { location?: string; job_types?: string } = {};
      if (query.location) {
        currentQuery.location = `${query.location}`;
      }
      if (query.job_types) {
        currentQuery.job_types = `${query.job_types}`;
      }
      jobCategory !== 'all'
        ? router.push(
            {
              pathname: '/job',
              query: { ...query, job_categories: jobCategory },
            },
            undefined,
            { scroll: false, shallow: true }
          )
        : query
        ? router.push(
            {
              pathname: '/job',
              query: currentQuery,
            },
            undefined,
            { scroll: false, shallow: true }
          )
        : router.push('/job', undefined, { scroll: false, shallow: true });
    },
    [query, router]
  );

  const queryInfiniteJobs: Partial<GetJobsParams> = {
    'pagination[pageSize]': MIN_PAGE_SIZE,
  };

  if (job_types) {
    const job = jobTypes?.find(
      (item) => item.attributes?.slug === job_types?.toString()
    );
    if (job) queryInfiniteJobs['filters[job_types][id][$eq]'] = job?.id;
  }

  if (location) {
    const job = locations?.find(
      (item) => item.attributes?.slug === location?.toString()
    );
    if (job) queryInfiniteJobs['filters[locations][id][$eq]'] = job?.id;
  }

  if (job_categories) {
    const job = jobCategories?.find(
      (item) => item.attributes?.slug === job_categories?.toString()
    );
    if (job) queryInfiniteJobs['filters[job_categories][id][$eq]'] = job?.id;
  }

  const {
    data: jobsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
    isLoading,
    isRefetching,
  } = useGetInfiniteJobs(queryInfiniteJobs);

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
  }, [isReady, job_categories, job_types, location, refetch]);

  return (
    <section className="desktop:py-20 min-h-content bg-white py-10">
      <div className="max-w-8xl desktop:px-8 desktop:pb-9 mx-auto flex flex-col px-4">
        <p className="text-subtitle18 pb-4 font-semibold text-neutral-50">
          {preIntro}
        </p>
        <h2 className="desktop:text-title42 text-title32 text-neutral-80 pb-2 font-bold">
          {title}
        </h2>
        <p className="text-neutral-80 text-body16 font-normal">{desc}</p>
        <div className="desktop:grid-cols-4 desktop:gap-8 z-40 mt-12 grid grid-cols-2 gap-2">
          <Listbox value={location} onChange={renderPageFilterLocationHandler}>
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {locations?.find(
                  (location) =>
                    location.attributes?.slug === query.location?.toString()
                )
                  ? locations?.find(
                      (location) =>
                        location.attributes?.slug === query.location?.toString()
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
                  className="desktop:w-[calc(25%-24px)] absolute z-10 mt-14 w-[calc(50%-16px)] space-y-2 rounded bg-white p-4 shadow-lg focus:outline-none"
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
            value={job_categories}
            onChange={renderPageFilterLevelHandler}
          >
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {jobCategories?.find(
                  (category) =>
                    category.attributes?.slug ===
                    query.job_categories?.toString()
                )
                  ? jobCategories?.find(
                      (category) =>
                        category.attributes?.slug ===
                        query.job_categories?.toString()
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
                  className="desktop:w-[calc(25%-24px)] absolute left-1/2 z-10 mt-14 w-[calc(50%-16px)] origin-top-right space-y-2 rounded bg-white p-4 shadow-lg focus:outline-none"
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
            jobTypes.find(
              (item) => item.attributes?.slug === query.job_types?.toString()
            )?.attributes?.value
          }
          onChange={(index) => {
            const currentQuery: {
              location?: string;
              job_categories?: string;
            } = {};
            if (query.level) {
              currentQuery.location = `${query.location}`;
            }
            if (query.job_categories) {
              currentQuery.job_categories = `${query.job_categories}`;
            }
            const queryType =
              jobTypes &&
              jobTypes.find((item) => item.attributes?.value === index);
            queryType
              ? router.push(
                  {
                    pathname: 'job',
                    query: {
                      ...query,
                      job_types: queryType.attributes?.slug,
                    },
                  },
                  undefined,
                  { scroll: false, shallow: true }
                )
              : router.push(
                  {
                    pathname: 'job',
                    query: {
                      ...currentQuery,
                    },
                  },
                  undefined,
                  { scroll: false, shallow: true }
                );
          }}
        >
          <Tab.List className="desktop:flex desktop:flex-none desktop:flex-col desktop:border-r-2 desktop:border-r-neutral-15 desktop:pr-8 w-full max-w-[358px] flex-wrap space-y-6">
            <p className="text-neutral-90 text-subtitle18 mb-6 font-bold">
              Bộ phận
            </p>
            {jobTypes.length > 0 ||
            (jobTypes.length < 1 &&
              jobsData?.pages?.length &&
              jobsData?.pages?.length > 0) ? (
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
                  item.attributes?.jobs?.data.length > 0
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
            </div>
            <hr className="text-neutral-15 h-2" />
            <Tab.Panel>
              <InfiniteScroll
                className="flex flex-col space-y-6"
                next={() => fetchNextPage()}
                hasMore={hasNextPage ? hasNextPage : false}
                loader={
                  <Fragment>
                    {isFetchingNextPage &&
                      Array.from(Array(2).keys()).map((item) => (
                        <div key={item}>
                          <JobSkeleton />
                        </div>
                      ))}
                  </Fragment>
                }
                dataLength={
                  jobsData?.pages ? jobsData.pages.length : MIN_PAGE_SIZE
                }
              >
                {isFetching && !isFetchingNextPage ? (
                  <>
                    {Array.from(Array(2).keys()).map((item) => (
                      <div key={item}>
                        <JobSkeleton />
                      </div>
                    ))}
                  </>
                ) : jobsData && jobsData.pages ? (
                  <>
                    {jobsData.pages.map((page) => {
                      if (page.data.length > 0)
                        return page.data.map((job, idx) => (
                          <div key={job.id}>
                            <JobAbstract job={job} />
                            <hr
                              className={cn('text-neutral-15 h-2', {
                                hidden:
                                  idx === jobsData?.pages[0].data.length - 1,
                              })}
                            />
                          </div>
                        ));
                      return (
                        <div
                          className="desktop:col-span-3 col-span-1 py-8"
                          key={page.nextPage - 1}
                        >
                          <div className="relative mx-auto aspect-square w-full max-w-[192px]">
                            <Image
                              src="/static/icons/recruitment/NotFoundJobs.svg"
                              alt=""
                              layout="fill"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : isFetching ? (
                  <>
                    {Array.from(Array(2).keys()).map((item) => (
                      <div key={item}>
                        <JobSkeleton />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="desktop:col-span-3 col-span-1 py-8">
                    <div className="relative mx-auto aspect-square w-full max-w-[192px]">
                      <Image
                        src="/static/icons/recruitment/NotFoundJobs.svg"
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </div>
                )}
              </InfiniteScroll>
            </Tab.Panel>
            {jobTypes &&
              Array.from(Array(jobTypes.length).keys()).map((item) => (
                <Tab.Panel key={item}>
                  <InfiniteScroll
                    className="flex flex-col space-y-6"
                    next={() => fetchNextPage()}
                    hasMore={hasNextPage ? hasNextPage : false}
                    loader={
                      <Fragment>
                        {isFetchingNextPage &&
                          Array.from(Array(2).keys()).map((item) => (
                            <div key={item}>
                              <JobSkeleton />
                            </div>
                          ))}
                      </Fragment>
                    }
                    dataLength={
                      jobsData?.pages ? jobsData.pages.length : PAGE_SIZE
                    }
                  >
                    {isFetching && !isFetchingNextPage ? (
                      <>
                        {Array.from(Array(2).keys()).map((item) => (
                          <div key={item}>
                            <JobSkeleton />
                          </div>
                        ))}
                      </>
                    ) : jobsData && jobsData.pages ? (
                      jobsData.pages.map((page) => {
                        if (page.data.length > 0)
                          return page.data.map((job, idx) => (
                            <div key={job.id}>
                              <JobAbstract job={job} />
                              <hr
                                className={cn('text-neutral-15 h-2', {
                                  hidden:
                                    idx === jobsData?.pages[0].data.length - 1,
                                })}
                              />
                            </div>
                          ));
                        return (
                          <div className="py-8" key={page.nextPage - 1}>
                            <div className="relative mx-auto aspect-square w-full max-w-[192px]">
                              <Image
                                src="/static/icons/recruitment/NotFoundJobs.svg"
                                alt=""
                                layout="fill"
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : isFetching ? (
                      <>
                        {Array.from(Array(2).keys()).map((item) => (
                          <div key={item}>
                            <JobSkeleton />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="desktop:col-span-3 col-span-1 py-8">
                        <div className="relative mx-auto aspect-square w-full max-w-[192px]">
                          <Image
                            src="/static/icons/recruitment/NotFoundJobs.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                      </div>
                    )}
                  </InfiniteScroll>
                </Tab.Panel>
              ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="desktop:hidden mx-auto flex flex-col px-4">
        <div className="top-header-mobile sticky z-30 w-full bg-white py-6">
          <Listbox
            value={
              jobTypes &&
              jobTypes.find(
                (item) => item.attributes?.slug === query.job_types?.toString()
              )?.attributes?.value
            }
            onChange={(index) => {
              const currentQuery: {
                location?: string;
                job_categories?: string;
              } = {};
              if (query.level) {
                currentQuery.location = `${query.location}`;
              }
              if (query.job_categories) {
                currentQuery.job_categories = `${query.job_categories}`;
              }
              const queryType =
                jobTypes &&
                jobTypes.find((item) => item.attributes?.value === index);
              queryType
                ? router.push(
                    {
                      pathname: 'job',
                      query: {
                        ...query,
                        job_types: queryType.attributes?.slug,
                      },
                    },
                    undefined,
                    { scroll: false, shallow: true }
                  )
                : router.push(
                    {
                      pathname: 'job',
                      query: {
                        ...currentQuery,
                      },
                    },
                    undefined,
                    { scroll: false, shallow: true }
                  );
            }}
          >
            <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
              <div className="truncate">
                {jobTypes?.find(
                  (item) =>
                    item.attributes?.slug === query.job_types?.toString()
                )
                  ? jobTypes.find(
                      (item) =>
                        item.attributes?.slug === query.job_types?.toString()
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
                <Listbox.Options className="absolute w-full space-y-2 overflow-auto rounded bg-white p-4 shadow-lg focus:outline-none">
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
                      {item.attributes?.jobs?.data &&
                      item.attributes?.jobs?.data.length > 0
                        ? `${item.attributes?.name} (${item.attributes?.jobs?.data.length})`
                        : `${item.attributes?.name}`}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </Listbox>
        </div>
        {isRefetching ? (
          <div className="flex flex-col space-y-6">
            {Array.from(Array(2).keys()).map((item) => (
              <div key={item}>
                <JobSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <InfiniteScroll
            className="flex flex-col space-y-6"
            next={() => fetchNextPage()}
            hasMore={hasNextPage ? hasNextPage : false}
            loader={
              <Fragment>
                {isFetchingNextPage &&
                  Array.from(Array(2).keys()).map((item) => (
                    <div key={item}>
                      <JobSkeleton />
                    </div>
                  ))}
              </Fragment>
            }
            dataLength={jobsData?.pages ? jobsData.pages.length : PAGE_SIZE}
          >
            {isFetching || isLoading ? (
              <>
                {Array.from(Array(2).keys()).map((item) => (
                  <div key={item}>
                    <JobSkeleton />
                  </div>
                ))}
              </>
            ) : jobsData &&
              jobsData.pages &&
              jobsData.pages.length > 0 &&
              jobsData.pages[0].data.length > 0 ? (
              <>
                {jobsData.pages.map((page) => {
                  return page.data.map((job, idx) => (
                    <div key={job.id}>
                      <JobAbstract job={job} />
                      <hr
                        className={cn('text-neutral-15 h-2', {
                          hidden: idx === jobsData?.pages[0].data.length - 1,
                        })}
                      />
                    </div>
                  ));
                })}
              </>
            ) : (
              <div className="desktop:col-span-3 col-span-1 py-8">
                <div className="relative mx-auto aspect-square w-full max-w-[192px]">
                  <Image
                    src="/static/icons/recruitment/NotFoundJobs.svg"
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
      <div className="max-w-8xl desktop:flex desktop:px-8 mx-auto mt-12 hidden flex-row">
        <ContactForRecruitment />
      </div>
    </section>
  );
}
