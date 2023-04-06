import { Popover, Transition } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import ButtonDropdown from './ButtonDropdown';
import DropdownIcon from './icons/DropdownIcon';
import type { PopOverProps } from './layouts/headerData';

export default function PopoverMenu({
  id,
  title,
  items,
  childrenUrls,
}: PopOverProps) {
  const { pathname } = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutDuration = 200;
  let timeout: string | number | NodeJS.Timeout | undefined;

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const onMouseEnter = (open: unknown) => {
    clearTimeout(timeout);
    if (open) return;
    return buttonRef.current?.click();
  };

  const onMouseLeave = (open: unknown) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };
  const { t } = useTranslation(['common']);
  return (
    <Popover id={id} className="relative inline-block h-full w-full">
      {({ open }) => {
        return (
          <div
            onMouseLeave={onMouseLeave.bind(null, open)}
            className="h-full w-full"
          >
            <Popover.Button
              ref={buttonRef}
              className={cn(
                'text-subtitle18  group inline-flex h-full w-full items-center justify-center px-4 font-semibold  focus-visible:outline-none',
                {
                  'text-primary-60':
                    childrenUrls && childrenUrls.includes(pathname),
                  'active:text-primary-60 desktop:hover:text-primary-50 text-black':
                    !(childrenUrls && childrenUrls.includes(pathname)),
                }
              )}
              onMouseEnter={onMouseEnter.bind(null, open)}
              onMouseLeave={onMouseLeave.bind(null, open)}
            >
              <span className="truncate">{t(`common:header.${title}`)}</span>
              <DropdownIcon
                className={cn({
                  'group-active:fill-primary-60 desktop:group-hover:fill-primary-50 ml-2 -mr-1 h-5 w-5  fill-black':
                    !(childrenUrls && childrenUrls.includes(pathname)),
                  'fill-primary-60':
                    childrenUrls && childrenUrls.includes(pathname),
                })}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="w-header-navbar absolute origin-top-left space-y-2 rounded-b-lg bg-white p-4 drop-shadow-lg"
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                {items &&
                  items.map((item) => (
                    <ButtonDropdown key={item.id} data={item} />
                  ))}
              </Popover.Panel>
            </Transition>
          </div>
        );
      }}
    </Popover>
  );
}