import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DownloadApp from '../../DownloadApp';

export default function TopFooter() {
  const { locale } = useRouter();
  return (
    <div className="desktop:flex desktop:items-center desktop:justify-between space-y-6">
      <div className="h-7 w-40 ">
        <Link href="/" passHref locale={locale} className="inline-block">
          <a title="HomePage">
            <div className="relative h-7 w-40">
              <Image
                src="/static/icons/Logo.svg"
                alt=""
                layout="fill"
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <DownloadApp
        className="desktop:mt-0 desktop:justify-end mt-2 justify-start"
        hasQR={false}
        type="row"
      />
    </div>
  );
}
