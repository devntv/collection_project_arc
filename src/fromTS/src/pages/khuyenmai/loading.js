import PromotionLoading from 'components-v2/organisms/PromotionLoading';
import Template from 'components/layout/Template';
import { KHUYEN_MAI } from 'constants/Paths';
import { withLogin } from 'HOC';
import useMobileDetect from 'hooks/useIsMobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services';
import { screenOrientation } from 'utils';

const title = 'Khuyến mãi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

// TODO: translate
const KhuyenmaiLoading = () => {
  const { isMobile = false } = useMobileDetect();
  const router = useRouter();
  const { query } = router;
  const cat = 'khuyenmai';
  const pageTitle = 'Khuyến mãi';
  const [mobile, setMobile] = useState(isMobile);

  useEffect(() => {
    router.replace({ pathname: KHUYEN_MAI, query });
  });

  useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  return (
    <Template title={title} isMobile={mobile} pageName={cat} pageTitle={pageTitle} showTopSearchMV2>
      <PromotionLoading isMobile={mobile} />
    </Template>
  );
};

export default withLogin(KhuyenmaiLoading, false, { url: '/khuyenmai?login=true' });
