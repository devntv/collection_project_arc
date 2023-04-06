import { decode } from 'html-entities';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { Post } from '@/api/cms/posts/types';
import type { DefaultCmsDataResponse } from '@/api/cms/types';
import Container from '@/components/layouts/Container';
import PreviewBanner from '@/components/PreviewBanner';
import { instapageMappingData } from '@/lib/configRoutes';
import useMediaQuery from '@/lib/useMediaQuery';
import BlogContent from './BlogContent';
import Breadcrumbs from './Breadcrumbs';
import ShareItem from './ShareItem';

type Props = {
  // Declare BlogDetailPage props
  post: DefaultCmsDataResponse<Post> | null;
  previewMode: boolean;
  type: 'post' | 'page' | 'instapage';
};

export const BlogDetailPage: FC<Props> = ({
  post,
  previewMode = false,
  type = 'post',
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const { slug } = router.query;
  async function exitPreviewMode() {
    const response = await fetch('/api/exit-preview');
    if (response) {
      router.reload();
    }
  }

  const relativePostsData: DefaultCmsDataResponse<Post>[] = [];

  let altImg = 'Ahamove - Giải pháp hoàn hảo cho mọi nhu cầu của bạn';
  let srcImg = '';

  if (!slug)
    return (
      <div className=" mx-auto flex h-screen w-screen items-center justify-center">
        <button
          type="button"
          className="text-body16 text-secondary-60 inline-flex cursor-not-allowed items-center px-4 py-2 font-semibold transition duration-150 ease-in-out"
          disabled
        >
          <svg
            className="text-primary-50 -ml-1 mr-3 h-6 w-6 animate-spin"
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
          Đang tải nội dung...
        </button>
      </div>
    );

  if (slug.toString() && instapageMappingData[slug.toString()]) {
    return (
      <Container
        blank
        title={slug.toString()}
        description={slug.toString()}
        openGraph={{
          type: 'website',
          site_name: process.env.NEXT_PUBLIC_APP_NAME,
          description: slug.toString(),
          title: slug.toString(),
          images: [
            {
              url: '/static/images/home/banner-faster-delivery-desktop.webp',
              height: 627,
              width: 1200,
              alt: slug.toString(),
            },
          ],
        }}
      >
        <iframe
          src={instapageMappingData[slug.toString()]}
          frameBorder={0}
          className="h-full min-h-screen w-full"
          title={slug.toString()}
        />
      </Container>
    );
  }

  if (post) {
    if (
      post.attributes?.images &&
      post.attributes?.images.data &&
      post.attributes?.images.data.length > 0 &&
      post.attributes?.images.data[0].attributes
    ) {
      altImg = post.attributes?.images.data[0].attributes.alternativeText;
    }

    if (
      post.attributes?.images &&
      post.attributes?.images.data &&
      post.attributes?.images.data.length > 0 &&
      post.attributes?.images.data[0].attributes
    ) {
      if (post.attributes?.images.data[0].attributes?.width < 1000)
        srcImg = post.attributes?.images.data[0].attributes?.url;
      else if (post.attributes?.images.data[0].attributes?.formats) {
        if (post.attributes?.images.data[0].attributes?.formats.large)
          srcImg =
            post.attributes?.images.data[0].attributes?.formats.large.url;
        else if (post.attributes?.images.data[0].attributes?.formats.medium)
          srcImg =
            post.attributes?.images.data[0].attributes?.formats.medium.url;
        else
          srcImg =
            post.attributes?.images.data[0].attributes?.formats.thumbnail.url;
      }
    }

    return (
      <Container
        title={post.attributes?.title}
        description={post.attributes?.summary}
        openGraph={{
          type: 'website',
          site_name: process.env.NEXT_PUBLIC_APP_NAME,
          description: post.attributes?.summary,
          title: post.attributes?.title,
          images: [
            {
              url: srcImg,
              height: 627,
              width: 1200,
              alt: altImg,
            },
          ],
        }}
      >
        {previewMode ? (
          <PreviewBanner onClick={() => exitPreviewMode()} />
        ) : null}

        <main
          className={`min-h-content max-w-8xl desktop:px-8 mx-auto flex w-full grow flex-col px-4 pb-20 pt-12 ${
            !previewMode && 'mt-header-mobile desktop:mt-header-desktop'
          }`}
        >
          {type !== 'page' && isDesktop && (
            <Breadcrumbs
              title={decode(post.attributes.title)}
              className="mb-12"
            />
          )}
          <div className="desktop:space-x-6 mx-auto mb-12 flex max-w-3xl flex-row flex-nowrap space-x-4">
            {type !== 'page' && isDesktop && (
              <aside>
                <ShareItem
                  className="sticky top-1/3 left-20 z-10"
                  title={post.attributes?.title}
                  slug={post.attributes?.slug}
                />
              </aside>
            )}
            <div className="prose">
              <h1 className="text-bold text-title24 desktop:text-title42 text-black">
                {post ? decode(post.attributes?.title) : ''}
              </h1>
              {type !== 'page' && !isDesktop && (
                <ShareItem
                  className="mb-4 !flex-row !justify-start space-y-0 space-x-4"
                  title={post.attributes?.title}
                  slug={post.attributes?.slug}
                />
              )}
              {type !== 'page' && !!srcImg && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-transparent">
                  <Image
                    src={srcImg}
                    alt={altImg}
                    layout="fill"
                    className="transition duration-200 ease-out group-hover:scale-105"
                    priority
                  />
                </div>
              )}
              {post && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.attributes?.content,
                  }}
                ></div>
              )}
            </div>
          </div>
          {type !== 'page' &&
            relativePostsData &&
            relativePostsData.length > 0 && (
              <BlogContent
                posts={relativePostsData}
                title="Có thể bạn quan tâm"
                direction="row"
              />
            )}
        </main>
      </Container>
    );
  }
  return <h1>404</h1>;
};
