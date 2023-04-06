import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { baseUrl } from '@/lib/constants';
import ButtonScrollTop from './ButtonScrollTop';
import Footer from './Footer';
import Header from './Header';

type ContainerProps = NextSeoProps & {
  children: ReactNode;
  blank?: boolean;
};
export default function Container({
  children,
  blank = false,
  ...props
}: ContainerProps) {
  const router = useRouter();
  const {
    title,
    description = 'Giải pháp hoàn hảo cho mọi nhu cầu giao hàng của bạn',
    ...restProps
  } = props;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${process.env.NEXT_PUBLIC_APP_NAME}`}
        defaultTitle={process.env.NEXT_PUBLIC_APP_NAME}
        description={description}
        canonical={`${baseUrl}${router.asPath}`}
        openGraph={{
          url: `${baseUrl}${router.asPath}`,
          type: 'website',
          site_name: process.env.NEXT_PUBLIC_APP_NAME,
          description,
          title: title || process.env.NEXT_PUBLIC_APP_NAME,
          images: [
            {
              url: `${baseUrl}/static/images/home/banner-faster-delivery-desktop.webp`,
              height: 627,
              width: 1200,
              alt: title || process.env.NEXT_PUBLIC_APP_NAME,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@ahamove',
        }}
        {...restProps}
      />
      {blank ? null : <Header />}
      {children}
      <ButtonScrollTop />
      {blank ? null : <Footer />}
    </>
  );
}
