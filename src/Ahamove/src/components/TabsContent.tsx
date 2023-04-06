import { Listbox, Tab, Transition } from '@headlessui/react';
import cn from 'classnames';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import type { FormatHelpCenter } from '@/api/cms/help-center/types';
import type { FormatPolicy } from '@/api/cms/policy/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import FAQContent from './FAQContent';

type Props = {
  policyCategories?: DefaultCmsDataResponse<FormatPolicy>;
  faqCategories?: DefaultCmsDataResponse<FormatHelpCenter>[];
  type: 'faq' | 'policy';
};

export default function TabsContent({
  policyCategories,
  faqCategories,
  type,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="min-h-content desktop:py-12 bg-white pt-0 pb-12">
      <div className="max-w-8xl desktop:flex mx-auto hidden flex-row px-8">
        <Tab.Group vertical>
          <Tab.List className="border-r-neutral-15 w-64 border-r-2">
            <div className="sticky top-28 flex flex-none flex-col space-y-6 py-4 pr-6">
              {type === 'policy'
                ? policyCategories?.attributes.items.map((item) => (
                    <Tab
                      key={item.id}
                      className={({ selected }) =>
                        cn(
                          'text-subtitle18 text-left font-semibold focus-visible:outline-none',
                          selected
                            ? 'text-primary-50 font-bold'
                            : 'hover:text-primary-30 text-neutral-50'
                        )
                      }
                    >
                      {item.label}
                    </Tab>
                  ))
                : faqCategories?.map((item) => (
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
                      {item.attributes.title}
                    </Tab>
                  ))}
            </div>
          </Tab.List>
          <Tab.Panels className="grow py-4 pl-12">
            {type === 'policy'
              ? policyCategories?.attributes.items.map((item) => (
                  <Tab.Panel key={item.id}>
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    ></div>
                  </Tab.Panel>
                ))
              : faqCategories?.map((item) => (
                  <Tab.Panel key={item.id} className="max-w-3xl space-y-12">
                    {item.attributes.items.map((item1, idx) => (
                      <FAQContent key={idx} faq={item1} />
                    ))}
                  </Tab.Panel>
                ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="desktop:hidden flex flex-col ">
        <Tab.Group vertical>
          <Tab.List className="top-header-mobile sticky w-full bg-white px-4 pt-6 pb-4">
            <Listbox value={selectedIndex} onChange={setSelectedIndex}>
              <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
                <div className="truncate">
                  {type === 'policy' &&
                    policyCategories &&
                    policyCategories.attributes.items[selectedIndex].label}
                  {type === 'faq' &&
                    faqCategories &&
                    faqCategories[selectedIndex]?.attributes?.title}
                </div>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center bg-transparent pr-2">
                  <Image
                    src="/static/icons/SelectDown.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-[calc(100%-24px)] space-y-2 rounded bg-white p-4 shadow-lg focus:outline-none">
                  {type === 'policy'
                    ? policyCategories?.attributes?.items.map((item) => (
                        <Listbox.Option key={item.id} value={item.index}>
                          <Tab
                            key={item.id}
                            className={({ selected }) =>
                              cn(
                                'cursor-pointer select-none rounded py-3 text-left',
                                {
                                  'text-primary-50': selected,
                                  'text-neutral-90': !selected,
                                }
                              )
                            }
                          >
                            {item.label}
                          </Tab>
                        </Listbox.Option>
                      ))
                    : faqCategories?.map((item) => (
                        <Listbox.Option
                          key={item.id}
                          value={item.attributes.value}
                        >
                          <Tab
                            key={item.id}
                            className={({ selected }) =>
                              cn(
                                'relative w-full cursor-pointer select-none rounded py-3 text-left',
                                {
                                  'text-primary-50': selected,
                                  'text-neutral-90': !selected,
                                }
                              )
                            }
                          >
                            {item.attributes.title}
                          </Tab>
                        </Listbox.Option>
                      ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </Tab.List>

          <Tab.Panels className="mt-8 px-4">
            {type === 'policy'
              ? policyCategories?.attributes?.items.map((item) => (
                  <Tab.Panel key={item.id}>
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    ></div>
                  </Tab.Panel>
                ))
              : faqCategories?.map((item) => (
                  <Tab.Panel key={item.id} className="max-w-3xl space-y-6">
                    {item.attributes.items.map((item1, idx) => (
                      <FAQContent faq={item1} key={idx} />
                    ))}
                  </Tab.Panel>
                ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}