import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  className?: string;
  hasQR?: boolean;
  type?: 'row' | 'column' | 'responsive';
};

export default function DownloadApp(props: Props) {
  return (
    <div
      className={cn('flex flex-row items-start', {
        'space-x-8': props.hasQR,
      })}
    >
      <div
        className={cn(
          { hidden: !props.hasQR },
          'desktop:w-[124px] border-primary-50 relative aspect-square w-32 rounded-lg border-2'
        )}
      >
        <Image
          src="/static/images/qr-code.webp"
          alt=""
          layout="fill"
          className="overflow-hidden rounded-lg"
        />
      </div>
      <div
        className={cn(
          {
            'desktop:space-x-4 flex flex-row space-x-3': props.type === 'row',
            'flex flex-col gap-4': props.type === 'column' || props.hasQR,
            'desktop:grid-cols-2 grid grid-cols-1 gap-y-2 gap-x-4':
              props.type === 'responsive',
          },
          props.className
        )}
      >
        <button
          className="transition duration-200 ease-out active:translate-y-0.5"
          aria-label="button"
        >
          <Link
            href="https://apps.apple.com/vn/app/ahamove/id987325355"
            target="_blank"
            rel="noreferrer"
          >
            <a
              title="Download App Store"
              className="relative block h-12 w-40 bg-transparent"
            >
              <Image
                src="/static/icons/DownloadAppStore.svg"
                layout="fill"
                alt=""
              />
            </a>
          </Link>
        </button>
        <button
          className="transition duration-200 ease-out active:translate-y-0.5"
          aria-label="button"
        >
          <Link
            href="https://play.google.com/store/apps/details?id=com.ahamove.user&hl=en&gl=US"
            target="_blank"
            rel="noreferrer"
          >
            <a
              title="Download Google Play"
              className="relative block h-12 w-40 bg-transparent"
            >
              <Image
                src="/static/icons/DownloadGooglePlay.svg"
                layout="fill"
                alt=""
              />
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
}