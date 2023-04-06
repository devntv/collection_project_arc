import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { DemandService } from '@/api/cms/services/type';
import type { DefaultCmsDataResponse } from '@/api/cms/types';

type Props = {
  service: DefaultCmsDataResponse<DemandService>;
  className?: string;
  href?: string;
};

export default function DemandServiceItem({ service, className, href }: Props) {
  const { locale } = useRouter();
  return (
    <article
      className={cn(
        'border-neutral-15 group rounded-2xl border-2 bg-white text-center',
        className
      )}
    >
      <Link href={href ? href : ''} passHref locale={locale}>
        <a title={href} className="inline-block py-4">
          <div className="flex h-full flex-col items-center justify-between space-y-2 p-6">
            {service.attributes?.icon?.data?.attributes?.url ? (
              <div className="relative h-[120px] w-[120px] shrink-0">
                <Image
                  src={service.attributes.icon.data.attributes.url}
                  alt=""
                  layout="fill"
                />
              </div>
            ) : null}

            <h3 className="text-subtitle20 group-hover:text-primary-50 pt-8 font-semibold text-black">
              {service.attributes?.name}
            </h3>
            <p className="min-h-text text-body16 my-2 flex-1 font-medium text-neutral-50">
              {service.attributes?.description}
            </p>
            {service.attributes?.fee && (
              <p className="text-subtitle18 text-primary-50 font-bold">
                {service.attributes.fee}
              </p>
            )}
          </div>
        </a>
      </Link>
    </article>
  );
}
