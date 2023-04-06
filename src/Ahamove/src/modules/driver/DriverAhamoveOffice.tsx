import { Listbox, Tab, Transition } from '@headlessui/react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { FormatOffice } from '@/api/cms/office/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';

type Props = {
  office: DefaultCmsDataResponse<FormatOffice>[];
};

export default function DriverAhamoveOffice({ office }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <section className="py-16">
      <h2 className="desktop:text-title42 text-title32 desktop:px-8 desktop:mb-12 mb-6 px-4 text-center font-bold text-black">
        Địa chỉ văn phòng Ahamove
      </h2>
      <div className="max-w-8xl desktop:px-8 mx-auto px-4">
        <div className="max-w-8xl desktop:flex desktop:flex-col mx-auto hidden">
          <Tab.Group>
            <Tab.List className="overflow-y-none no-scrollbar flex flex-row space-x-4 overflow-x-auto">
              {office.map((item) => (
                <Tab
                  key={item.id}
                  className={({ selected }) =>
                    cn(
                      'text-subtitle18 whitespace-nowrap rounded-lg py-3 px-3 font-medium focus-visible:outline-none',
                      selected
                        ? 'bg-primary-50 font-bold text-white'
                        : 'text-neutral-60'
                    )
                  }
                >
                  {item.attributes?.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-12">
              {office.map((item) => (
                <Tab.Panel
                  key={item.id}
                  className="desktop:grid-cols-2 grid grid-cols-1 gap-8"
                >
                  {item.attributes?.embed_map_link ? (
                    <div>
                      <iframe
                        title="myFrame"
                        src={item.attributes?.embed_map_link}
                        width="100%"
                        height="100%"
                        style={{ border: '0' }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  ) : item.attributes?.image?.data?.attributes?.url ? (
                    <div className="relative aspect-[30/19] h-auto w-full bg-transparent">
                      <Image
                        src={item.attributes.image.data.attributes.url}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[30/19] h-auto w-full bg-transparent">
                      <Image
                        src="/static/images/driver/others-city-office.webp"
                        alt=""
                        layout="fill"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-subtitle20 text-neutral-90 font-bold">
                      Văn phòng {item.attributes?.name}
                    </h3>
                    {item.attributes?.address ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-start space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0 bg-transparent">
                          <Image
                            src="/static/icons/LocationMarker.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <div>
                          <p className="text-body16 text-neutral-90 mb-1 text-left font-normal">
                            {item.attributes?.address}
                          </p>

                          {item.attributes?.direction_link ? (
                            <Link href={item.attributes.direction_link}>
                              <a title="">
                                <p className="text-primary-60 text-body16 font-bold">
                                  Xem hướng dẫn đường đi
                                </p>
                              </a>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {item.attributes?.working_times ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-start space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0 bg-transparent">
                          <Image
                            src="/static/icons/driver/TimeCircle.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <div
                          className="text-body16 text-neutral-90 mb-1 text-left font-normal"
                          dangerouslySetInnerHTML={{
                            __html: item.attributes?.working_times,
                          }}
                        ></div>
                      </div>
                    ) : null}
                    {item.attributes?.hotline ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-center space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0">
                          <Image
                            src="/static/icons/Phone.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <p className="text-neutral-90 text-body16 list-inside list-disc font-normal">
                          Hotline tuyển dụng
                        </p>
                        <Link href="tel:1900545411">
                          <a
                            className="hover:text-neutral-70 desktop:items-center border-secondary-90 flex flex-nowrap space-x-3 rounded-lg border p-3"
                            title=""
                          >
                            <p className="text-neutral-90 text-body16 list-inside list-disc font-normal">
                              {item.attributes?.hotline}
                            </p>
                          </a>
                        </Link>
                      </div>
                    ) : null}
                    <div className="border-secondary-40 bg-secondary-20 mt-4 flex flex-row flex-nowrap items-start space-x-4 rounded-lg border p-4">
                      <div className="relative inline-block h-6 w-6 shrink-0">
                        <Image
                          src="/static/icons/driver/Info.svg"
                          alt=""
                          layout="fill"
                        />
                      </div>
                      <div className="text-body16 text-neutral-90 mb-1 text-left font-normal">
                        <p className="font-normal">
                          Khi Đối tác đến văn phòng đăng ký, vui lòng chuẩn bị
                          đầy đủ hồ sơ và đến văn phòng Ahamove để được kích
                          hoạt tài khoản
                        </p>
                        <p className="font-bold">
                          Lưu ý: Mang theo giấy xác nhận tiêm chủng ít nhất 01
                          mũi khi qua văn phòng
                        </p>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="max-w-8xl desktop:hidden flex flex-col">
          <Tab.Group>
            <Tab.List className="py-6">
              <Listbox value={selectedIndex} onChange={setSelectedIndex}>
                <Listbox.Button className="border-neutral-40 text-body16 text-neutral-90 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border px-4 py-3 text-left font-medium focus:outline-none">
                  <div className="truncate">
                    {office && office[selectedIndex]?.attributes.name}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                  <Listbox.Options className="absolute z-10 w-[calc(100%-32px)] space-y-2 overflow-auto rounded bg-white p-4 shadow-lg focus:outline-none">
                    {office.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        value={item.attributes?.value}
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
                          {item.attributes?.name}
                        </Tab>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </Tab.List>
            <Tab.Panels>
              {office.map((item) => (
                <Tab.Panel
                  key={item.id}
                  className="desktop:grid-cols-2 grid grid-cols-1 gap-8"
                >
                  {item.attributes?.embed_map_link ? (
                    <div className="h-64">
                      <iframe
                        title="myFrame"
                        src={item.attributes?.embed_map_link}
                        width="100%"
                        height="100%"
                        style={{ border: '0' }}
                        allowFullScreen={false}
                        loading="lazy"
                      ></iframe>
                    </div>
                  ) : item.attributes?.image?.data?.attributes?.url ? (
                    <div className="relative aspect-[30/19] h-auto w-full">
                      <Image
                        src={item.attributes?.image?.data?.attributes?.url}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[30/19] h-auto w-full">
                      <Image
                        src="/static/images/driver/others-city-office.webp"
                        alt=""
                        layout="fill"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-subtitle20 text-neutral-90 font-bold">
                      Văn phòng {item.attributes?.name}
                    </h3>
                    {item.attributes?.address ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-start space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0">
                          <Image
                            src="/static/icons/LocationMarker.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <div>
                          <p className="text-body16 text-neutral-90 mb-1 text-left font-normal">
                            {item.attributes.address}
                          </p>
                          {item.attributes?.direction_link ? (
                            <Link
                              href={item.attributes.direction_link}
                              target="_blank"
                            >
                              <a title="">
                                <p className="text-primary-60 text-body16 font-bold">
                                  Xem hướng dẫn đường đi
                                </p>
                              </a>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {item.attributes?.working_times ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-start space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0">
                          <Image
                            src="/static/icons/driver/TimeCircle.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <div
                          className="text-body16 text-neutral-90 mb-1 text-left font-normal"
                          dangerouslySetInnerHTML={{
                            __html: item.attributes.working_times,
                          }}
                        ></div>
                      </div>
                    ) : null}
                    {item.attributes?.hotline ? (
                      <div className="mt-4 flex flex-row flex-nowrap items-center space-x-4">
                        <div className="relative inline-block h-6 w-6 shrink-0">
                          <Image
                            src="/static/icons/Phone.svg"
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <p className="text-neutral-90 text-body16 list-inside list-disc font-normal">
                          Hotline tuyển dụng
                        </p>
                        <Link href="tel:1900545411">
                          <a
                            className="hover:text-neutral-70 desktop:items-center border-secondary-90 flex flex-nowrap space-x-3 rounded-lg border p-3"
                            title=""
                          >
                            <p className="text-neutral-90 text-body16 list-inside list-disc font-normal">
                              {item.attributes.hotline}
                            </p>
                          </a>
                        </Link>
                      </div>
                    ) : null}
                    <div className="border-secondary-40 bg-secondary-20 mt-6 flex flex-row flex-nowrap items-start space-x-4 rounded-lg border p-4">
                      <div className="relative inline-block h-6 w-6 shrink-0">
                        <Image
                          src="/static/icons/driver/Info.svg"
                          alt=""
                          layout="fill"
                        />
                      </div>
                      <div className="text-body16 text-neutral-90 mb-1 text-left font-normal">
                        <p className="font-normal">
                          Khi Đối tác đến văn phòng đăng ký, vui lòng chuẩn bị
                          đầy đủ hồ sơ và đến văn phòng Ahamove để được kích
                          hoạt tài khoản
                        </p>
                        <p className="font-bold">
                          Lưu ý: Mang theo giấy xác nhận tiêm chủng ít nhất 01
                          mũi khi qua văn phòng
                        </p>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
}
