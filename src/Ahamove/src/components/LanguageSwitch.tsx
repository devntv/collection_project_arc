import { Listbox, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';

const LanguageSwitch = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(router.locale);
  const { t } = useTranslation(['common']);
  const handleLanguageChange = useCallback(
    (locale: string) => {
      router.push(router.asPath, undefined, { locale });
    },
    [router]
  );

  useEffect(() => {
    if (language && language !== router.locale) {
      handleLanguageChange(language as string);
    }
  }, [handleLanguageChange, language, router.locale]);

  return (
    <Listbox value={language} onChange={setLanguage}>
      <Listbox.Button className="border-neutral-20 text-body16 focus:border-primary-50 focus:ring-primary-50 relative w-full rounded-md border py-2 pl-5 pr-12 focus:outline-none">
        <div className="truncate">
          {router.locale === 'vi' ? (
            <div className="flex flex-row items-center space-x-4">
              <div className="relative h-6 w-6 bg-transparent">
                <Image
                  src="/static/icons/Vietnam.svg"
                  alt=""
                  layout="fill"
                  className="pr-4"
                />
              </div>
              <p className="m-w-[75px] text-left">
                {t('common:i18n.vietnamese')}
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-4">
              <div className="relative h-6 w-6 bg-transparent">
                <Image
                  src="/static/icons/England.svg"
                  alt=""
                  layout="fill"
                  className="pr-4"
                />
              </div>
              <p className="min-w-[75px] text-left">
                {t('common:i18n.english')}
              </p>
            </div>
          )}
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
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Listbox.Options className="space-y-2 rounded bg-white p-2 shadow-lg focus:outline-none">
          <Listbox.Option
            key="en"
            value="en"
            className={({ active }) =>
              `relative cursor-pointer select-none rounded py-2 px-4  ${
                active ? 'text-primary-50 bg-primary-10' : 'text-neutral-90'
              }`
            }
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="relative h-6 w-6 bg-transparent">
                <Image
                  src="/static/icons/England.svg"
                  alt=""
                  layout="fill"
                  className="pr-4"
                />
              </div>
              <p className="min-w-[75px] text-left">
                {t('common:i18n.english')}
              </p>
            </div>
          </Listbox.Option>
          <Listbox.Option
            key="vi"
            value="vi"
            className={({ active }) =>
              `relative cursor-pointer select-none rounded py-2 px-4  ${
                active ? 'text-primary-50 bg-primary-10' : 'text-neutral-90'
              }`
            }
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="relative h-6 w-6">
                <Image
                  src="/static/icons/Vietnam.svg"
                  alt=""
                  layout="fill"
                  className="pr-4"
                />
              </div>
              <p className="max-w-[75px] text-left">
                {t('common:i18n.vietnamese')}
              </p>
            </div>
          </Listbox.Option>
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default LanguageSwitch;