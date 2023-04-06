import type { ReactNode } from 'react';
import AhamoveBg from '@/components/icons/AhamoveBg';

type Props = {
  form: ReactNode;
  id: string;
};

export default function HelpFormContent(props: Props) {
  return (
    <section className="bg-secondary-10 overflow-hidden py-12" id={props.id}>
      <div className="max-w-8xl desktop:px-8 relative mx-auto w-full px-4">
        <AhamoveBg className="fill-secondary-20 absolute left-[1/5] -bottom-14" />
        <div className="max-w-8xl desktop:grid-cols-2 mx-auto grid grid-cols-1 gap-12">
          <article className="mx-auto flex flex-col items-start justify-between">
            <h2 className="text-title32 text-secondary-90 desktop:text-title42 z-30 text-left font-bold">
              Hãy để chúng tôi giải quyết những trăn trở của doanh nghiệp bạn
            </h2>
          </article>
          <div className="desktop:mx-16 z-30">{props.form}</div>
        </div>
      </div>
    </section>
  );
}