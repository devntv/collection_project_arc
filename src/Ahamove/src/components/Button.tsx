import type { UrlObject } from 'url';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  title?: string;
  type: 'button' | 'link' | 'submit';
  href?: string | UrlObject;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  setLocale?: boolean;
};

export default function Button({
  title = '',
  type = 'button',
  href = '/',
  onClick,
  className,
  children,
  setLocale = true,
  fullWidth = false,
  disabled = false,
  loading = false,
}: Props) {
  const { locale } = useRouter();

  const buttonClass = {
    default:
      'bg-primary-50 h-12 rounded text-center text-body16 font-bold text-white enabled:hover:bg-primary-60 transition ease-out duration-200 enabled:active:bg-primary-60 enabled:active:ring-primary-20 enabled:active:ring-4 enabled:active:translate-y-0.5 inline-block py-3 truncate min-w-[180px] text-center px-6 inline-flex items-center justify-center pointer-events-auto',
    fullWidth: 'w-full',
    disabled: 'disabled:bg-neutral-20 cursor-not-allowed',
    loading: 'bg-primary-40 cursor-progress',
  };

  const linkClass = {
    default:
      'bg-primary-50 h-12 rounded text-center text-body16 font-bold text-white  inline-block py-3 truncate min-w-[180px] text-center px-6 inline-flex items-center justify-center pointer-events-auto hover:bg-primary-60 transition ease-out duration-200 active:bg-primary-60 active:ring-primary-20 active:ring-4 active:translate-y-0.5',
    fullWidth: 'w-full',
  };
  return (
    <>
      {type === 'link' && !disabled ? (
        <Link href={href} passHref locale={locale} legacyBehavior>
          <a
            title={title}
            className={cn(linkClass.default, className, {
              [linkClass.fullWidth]: fullWidth,
            })}
            target={setLocale ? '_self' : '_blank'}
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          aria-label="button"
          onClick={onClick}
          type={type === 'submit' ? 'submit' : 'button'}
          className={cn(buttonClass.default, className, {
            [buttonClass.fullWidth]: fullWidth,
            [buttonClass.disabled]: disabled,
            [buttonClass.loading]: loading,
          })}
          disabled={disabled || loading}
        >
          {loading && (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {children}
        </button>
      )}
    </>
  );
}