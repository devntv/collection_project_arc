import { Disclosure } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import Button from '../Button';
import ButtonDropdown from '../ButtonDropdown';
import MenuIcon from '../icons/MenuIcon';
import XMenuIcon from '../icons/XMenuIcon';
import PopoverMenu from '../PopoverMenu';
import { headerData } from './headerData';

export default function Header() {
  const { locale, pathname } = useRouter();
  const router = useRouter();
  const { t } = useTranslation(['common']);
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <header
          className={cn('shadow-shadow4 fixed inset-x-0 top-0 z-50', {
            'bg-white/80 backdrop-blur-sm backdrop-saturate-150': !open,
            'bg-white': open,
          })}
        >
          <div className="max-w-8xl desktop:h-header-desktop desktop:px-8 relative mx-auto flex h-20 items-center justify-between px-4">
            {/* Mobile menu button */}
            <Disclosure.Button
              aria-label="menu"
              className="desktop:hidden absolute right-4 inline-flex items-center justify-center text-neutral-50"
            >
              {open ? (
                <XMenuIcon className="desktop:hover:fill-primary-50 fill-neutral-50" />
              ) : (
                <MenuIcon className="desktop:hover:fill-primary-50 fill-neutral-50" />
              )}
            </Disclosure.Button>
            <div className="desktop:flex-1 desktop:justify-between flex h-full flex-nowrap items-center justify-start">
              <Link
                href="/"
                passHref
                locale={locale}
                className="inline-block flex-none"
                legacyBehavior
              >
                <a
                  title="HomePage"
                  className="relative mr-4 h-7 w-40 bg-transparent"
                >
                  <Image
                    src="/static/icons/Logo.svg"
                    alt=""
                    layout="fill"
                    priority
                  />
                </a>
              </Link>
              <nav className="desktop:grid ml-auto mr-4 hidden h-full grow grid-cols-5 place-items-center">
                {headerData.map((item) =>
                  item.items ? (
                    <PopoverMenu
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      items={item.items}
                      childrenUrls={item.childrenUrls}
                    />
                  ) : (
                    <div key={item.id} className="inline-block h-full w-full">
                      <Link
                        href={item.href ? item.href : '/'}
                        passHref
                        locale={locale}
                        legacyBehavior
                      >
                        <a title={item.title}>
                          <button
                            aria-label="button"
                            className={cn(
                              'text-subtitle18 active:text-primary-60 desktop:hover:text-primary-50 group inline-flex h-full w-full items-center justify-center px-4 font-semibold focus-visible:outline-none',
                              {
                                'text-primary-60 cursor-no-drop transition-none':
                                  pathname === '/blog',
                                'text-neutral-90 desktop:hover:text-primary-50':
                                  pathname !== '/blog',
                              }
                            )}
                          >
                            {t(`common:header.${item.title}`)}
                          </button>
                        </a>
                      </Link>
                    </div>
                  )
                )}
              </nav>
              <Button
                title={t('common:header.button')}
                className="desktop:block hidden flex-none"
                href="https://app.ahamove.com/"
                setLocale={false}
                type="link"
              >
                {t('common:header.button')}
              </Button>
            </div>
          </div>
          <Disclosure.Panel className="desktop:hidden bg-white">
            <div className="flex h-[calc(100vh-80px)] flex-col">
              <div className="overflow-x-none grow overflow-y-auto pt-2 pb-6 shadow-inner">
                {headerData.map((item) => (
                  <div key={item.id}>
                    {item.items ? (
                      <Disclosure
                        as="nav"
                        className="relative inline-block w-full text-left"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={cn(
                                'button-menu text-title24  group inline-flex w-full justify-between px-4 py-3 font-semibold',
                                {
                                  'text-primary-60':
                                    item.childrenUrls &&
                                    item.childrenUrls.includes(pathname),
                                  'active:text-primary-60 text-neutral-90 desktop:hover:text-primary-50':
                                    !(
                                      item.childrenUrls &&
                                      item.childrenUrls.includes(pathname)
                                    ),
                                }
                              )}
                            >
                              <span>{t(`common:header.${item.title}`)}</span>
                              {open ? (
                                <ChevronUpIcon
                                  className={cn('h-8 w-8', {
                                    'fill-primary-50':
                                      item.childrenUrls &&
                                      item.childrenUrls.includes(pathname),
                                    'desktop:group-hover:fill-primary-50 fill-neutral-50':
                                      !(
                                        item.childrenUrls &&
                                        item.childrenUrls.includes(pathname)
                                      ),
                                  })}
                                />
                              ) : (
                                <ChevronDownIcon
                                  className={cn('h-8 w-8', {
                                    'fill-primary-50':
                                      item.childrenUrls &&
                                      item.childrenUrls.includes(pathname),
                                    'desktop:group-hover:fill-primary-50 fill-neutral-50':
                                      !(
                                        item.childrenUrls &&
                                        item.childrenUrls.includes(pathname)
                                      ),
                                  })}
                                />
                              )}
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-2 px-4 py-2">
                              {item.items &&
                                item.items.map((item1) => (
                                  <ButtonDropdown key={item1.id} data={item1} />
                                ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <button
                        aria-label="button"
                        className={cn(
                          'text-title24 inline-flex w-full justify-start px-4 py-3 font-semibold',
                          {
                            'text-primary-60 cursor-no-drop transition-none':
                              pathname === '/blog',
                            'text-neutral-90 desktop:hover:text-primary-50':
                              pathname !== '/blog',
                          }
                        )}
                        onClick={() => router.push('/blog')}
                      >
                        {t(`common:header.${item.title}`)}
                      </button>
                    )}
                  </div>
                ))}
                <div className="p-4">
                  <Button
                    title={t('common:header.button')}
                    className="w-full"
                    type="link"
                    href="https://app.ahamove.com/"
                    setLocale={false}
                  >
                    {t('common:header.button')}
                  </Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </header>
      )}
    </Disclosure>
  );
}
