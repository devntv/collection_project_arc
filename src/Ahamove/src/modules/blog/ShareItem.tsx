import {
    FACEBOOK_SHARE_URL,
    LINKED_SHARE_URL,
    TWITTER_SHARE_URL,
    baseUrl,
} from '@/lib/constants';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  className?: string;
  title: string;
  slug: string;
  job?: boolean;
};

export default function ShareItem({
  title,
  className,
  slug,
  job = false,
}: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const { asPath } = useRouter();
  const url = baseUrl + asPath;

  const sharedUrl = useMemo(() => {
    if (job)
      return `${process.env.NEXT_PUBLIC_APP_DOMAIN}/job/${slug}&t=${title}`;
    return `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${slug}&t=${title}`;
  }, [slug, title, job]);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = (copyText: string) => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        toast.success('Đã sao chép liên kết', { position: 'bottom-left' });
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        toast.error(
          err.response?.data.msg || 'Có lỗi xảy ra, vui lòng thử lại sau.',
          { position: 'bottom-left' }
        );
      });
  };
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4',
        className
      )}
    >
      <div className="shrink-0">
        <Link href={FACEBOOK_SHARE_URL + sharedUrl} passHref>
          <a
            className="relative inline-block h-6 w-6 bg-transparent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/static/icons/blog/Facebook.svg" layout="fill" alt="" />
          </a>
        </Link>
      </div>
      <div className="shrink-0">
        <Link href={TWITTER_SHARE_URL + sharedUrl} passHref>
          <a
            className="relative inline-block h-6 w-6 bg-transparent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/static/icons/blog/Twitter.svg" layout="fill" alt="" />
          </a>
        </Link>
      </div>
      <div className="shrink-0">
        <Link href={LINKED_SHARE_URL + sharedUrl} passHref>
          <a
            className="relative inline-block h-6 w-6 bg-transparent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/static/icons/blog/LinkedIn.svg" layout="fill" alt="" />
          </a>
        </Link>
      </div>
      <div className="shrink-0">
        {isCopied ? (
          <div className="relative inline-flex h-6 w-6 bg-transparent">
            <Image
              src="/static/icons/customer/CheckCircle.svg"
              layout="fill"
              alt=""
            />
          </div>
        ) : (
          <button
            aria-label="button"
            className="relative inline-flex h-6 w-6 bg-transparent"
            onClick={() => handleCopyClick(url)}
          >
            <Image src="/static/icons/blog/Link.svg" layout="fill" alt="" />
          </button>
        )}
      </div>
    </div>
  );
}
