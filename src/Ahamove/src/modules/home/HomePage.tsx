import type { FC } from 'react';
import { useGetPosts } from '@/api/cms/posts/useGetPosts';
import { useGetPostsCategories } from '@/api/cms/posts/useGetPostsCategories';
import type { Banner, DefaultCmsDataResponse } from '@/api/cms/types';
import BannerSwiper from '@/components/BannerSwiper';
import Container from '@/components/layouts/Container';
import BenefitsContent from '@/modules/service/BenefitsContent';
import BlogContent from '../blog/BlogContent';
import BlogSkeleton from '../blog/BlogSkeleton';
import { homeServicesData } from './homeData';
import HomeDownload from './HomeDownload';
import HomeDriver from './HomeDriver';
import HomeIntegration from './HomeIntegration';
import HomeMoving from './HomeMoving';
import HomePartner from './HomePartner';
import HomeStatistics from './HomeStatistics';

type Props = {
  // Declare HomePage props
  homeBannerData: DefaultCmsDataResponse<Banner> | null;
};

export const HomePage: FC<Props> = ({ homeBannerData }) => {
  const { data: postsData, isLoading } = useGetPostsCategories({
    'pagination[page]': 1,
    'pagination[pageSize]': 3,
  });

  return (
    <Container>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <BannerSwiper bannerData={homeBannerData} />
        <BenefitsContent
          type="service"
          title="Ahamove là chuyên gia giao hàng của riêng bạn"
          desc="Mang đến giải pháp hoàn hảo cho mọi nhu cầu giao hàng của bạn nhờ công nghệ đột phá — tất cả trong một ứng dụng duy nhất. "
          items={homeServicesData}
          className="bg-white"
        />
        <HomeMoving />
        <HomeStatistics />
        <HomeIntegration />
        <HomePartner />
        <HomeDownload />
        <HomeDriver />
        {isLoading ? (
          <div className="desktop:grid-cols-3 desktop:gap-y-12 max-w-8xl desktop:px-8 mx-auto grid grid-cols-1 gap-6 px-4">
            {Array.from(Array(3).keys()).map((item) => (
              <div key={item} className="col-span-1">
                <BlogSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <BlogContent
            posts={postsData?.data ? postsData.data : null}
            title="Tin tức mới nhất"
            embed={true}
            direction="row"
          />
        )}
      </main>
    </Container>
  );
};
