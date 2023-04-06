import type { HelpCenterItem } from '@/api/cms/help-center/types';
import { Disclosure } from '@headlessui/react';
import cn from 'classnames';

type Props = {
  faq: HelpCenterItem;
};

export default function FAQContent({ faq }: Props) {
  return (
    <article className="space-y-6">
      {faq?.label && (
        <h2 className="text-title24 text-neutral90 text-primary-50 font-bold">
          {faq.label}
        </h2>
      )}
      {faq?.items.map((item, idx) => (
        <div key={item.id} className="space-y-6">
          <Disclosure defaultOpen={idx === 0}>
            {({ open }) => (
              <>
                <Disclosure.Button className="text-subtitle20 flex w-full flex-row items-center space-x-4 font-bold text-black">
                  {open ? (
                    <div
                      className="h-8 w-8 shrink-0 rounded-full border bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/static/icons/Minus.svg)',
                      }}
                    ></div>
                  ) : (
                    <div
                      className="h-8 w-8 shrink-0 rounded-full border bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/static/icons/Plus.svg)',
                      }}
                    ></div>
                  )}
                  {item.label && <p className="text-left">{item.label}</p>}
                </Disclosure.Button>
                <Disclosure.Panel className="text-body16 pl-12 text-justify font-normal text-black">
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  ></div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <hr
            className={cn('text-neutral-15 h-2', {
              hidden: idx === faq.items.length - 1,
            })}
          />
        </div>
      ))}
    </article>
  );
}
