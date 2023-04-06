import ArrowNarrowRight from '@/components/icons/ArrowNarrowRightIcon';
import useMediaQuery from '@/lib/useMediaQuery';
import { Transition } from '@headlessui/react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import type { ButtonDropdownProps } from './layouts/headerData';

type Props = {
  data: ButtonDropdownProps;
  flag?: boolean;
};

export default function ButtonDropdown({ data, flag = false }: Props) {
  const { locale, pathname } = useRouter();
  const [show, setShow] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const mouseOverHandler = () => {
    setShow(true);
  };
  const focusHandler = () => {
    setShow(true);
  };
  const blurHandler = () => {
    setShow(false);
  };
  const mouseOutHandler = () => {
    setShow(false);
  };

  return (
    <div className="w-full items-center focus-visible:outline-none">
      {data.items && !flag ? (
        isDesktop ? (
          <div className="relative h-full w-full focus-visible:outline-none">
            <button
              aria-label="button"
              className={cn(
                'w-full rounded-lg bg-white transition-all duration-200 ease-linear focus-visible:outline-none',
                {
                  'bg-primary-10 transition-none': pathname === data.href,
                  'desktop:hover:bg-primary-10 focus:bg-primary-20 active:bg-primary-20':
                    pathname !== data.href,
                }
              )}
              onMouseOver={mouseOverHandler}
              onMouseOut={mouseOutHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
            >
              <ButtonDropdown data={data} flag={true} />
            </button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-x-0 -translate-y-0"
              enterTo="opacity-100 translate-x-0 -translate-y-16"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-x-0 -translate-y-16"
              leaveTo="opacity-0 translate-x-0 -translate-y-0"
            >
              <div
                className={cn('absolute top-0 -right-[358px]', {
                  hidden: !show,
                  block: show,
                })}
              >
                <div
                  className="w-header-navbar space-y-2 rounded-lg bg-white p-4 drop-shadow-lg"
                  onMouseOver={mouseOverHandler}
                  onMouseOut={mouseOutHandler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                >
                  {data.items &&
                    data.items.map((item) => (
                      <div key={item.id}>
                        <ButtonDropdown data={item} />
                      </div>
                    ))}
                </div>
              </div>
            </Transition>
          </div>
        ) : (
          <div className="space-y-2">
            <ButtonDropdown data={data} flag={true} />
            {data.items.map((item) => (
              <ButtonDropdown data={item} key={item.id} />
            ))}
          </div>
        )
      ) : (
        <Link href={data.href} passHref locale={locale}>
          <a
            title={data.title}
            className="block h-full w-full focus-visible:outline-none"
          >
            <div
              className={cn(
                'group flex w-full items-center justify-between rounded-lg p-4 transition-all duration-200 ease-linear',
                {
                  'bg-primary-10 transition-none':
                    pathname === data.href ||
                    (data.childrenUrls && data.childrenUrls.includes(pathname)),
                  'desktop:hover:bg-primary-10 focus:bg-primary-20 active:bg-primary-20':
                    pathname !== data.href,
                }
              )}
            >
              {data.type === 'normal' && (
                <div>
                  <p
                    className={cn(
                      'text-subtitle18 text-neutral-90 desktop:text-body16 desktop:font-normal  text-left font-medium',
                      {
                        'text-primary-50': pathname === data.href,
                        'desktop:group-hover:text-primary-50':
                          pathname !== data.href,
                      }
                    )}
                  >
                    {data.title}
                  </p>
                </div>
              )}
              {data.type === 'desc' && (
                <div className="text-left">
                  <p
                    className={cn(
                      'text-subtitle18 text-neutral-90 desktop:text-body16 desktop:font-normal font-medium',
                      {
                        'text-primary-50': pathname === data.href,
                        'desktop:group-hover:text-primary-50':
                          pathname !== data.href,
                      }
                    )}
                  >
                    {data.title}
                  </p>
                  <p className="text-body14 desktop:font-normal font-medium text-neutral-50">
                    {data.desc}
                  </p>
                </div>
              )}
              {data.type === 'icon' && (
                <div className="flex flex-row items-center space-x-4">
                  <div className="relative h-12 w-12 bg-transparent">
                    {Object.prototype.hasOwnProperty.call(data, 'icon') && (
                      <Image src={data.icon ?? ''} alt="" layout="fill" />
                    )}
                  </div>
                  <div>
                    <p
                      className={cn(
                        'text-subtitle18 text-neutral-90 desktop:text-body16 desktop:font-normal  text-left font-medium',
                        {
                          'text-primary-50': pathname === data.href,
                          'desktop:group-hover:text-primary-50':
                            pathname !== data.href,
                        }
                      )}
                    >
                      {data.title}
                    </p>
                  </div>
                </div>
              )}
              <div
                className={cn({
                  ' desktop:group-hover:inline-block h-5 w-5 transition-all duration-200 ease-linear':
                    pathname !== data.href,
                  hidden: flag === false,
                  'desktop:inline-block hidden': flag === true,
                })}
              >
                <ArrowNarrowRight className="h-5 w-5" fill="#FE5F00" />
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
}
