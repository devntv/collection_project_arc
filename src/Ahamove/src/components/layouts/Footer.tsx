import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitch from '@/components/LanguageSwitch';
import ContactFooter from './footer/ContactFooter';
import NavigateFooter from './footer/NavigateFooter';
import TopFooter from './footer/TopFooter';

export default function Footer() {
  return (
    <footer className="border-t-neutral-15 desktop:pt-14 desktop:pb-9 z-20 border-t bg-white pt-9 pb-8">
      <div className="max-w-8xl desktop:px-8 m-auto flex flex-col justify-center px-4">
        <TopFooter />
        <hr className="text-neutral-15 desktop:hidden mt-8 block h-2" />
        <NavigateFooter />
        <hr className=" text-neutral-15 my-6 h-2" />
        <div className="desktop:flex desktop:justify-between block ">
          <ContactFooter />
          <div className="desktop:block hidden self-start">
            <LanguageSwitch />
          </div>
        </div>
        <hr className="text-neutral-15 desktop:hidden my-4 h-2" />
        <div className="desktop:flex desktop:grid-cols-2 desktop:items-center desktop:justify-between grid grid-cols-1">
          <div className="desktop:flex desktop:flex-row desktop:items-center desktop:space-x-6 grid grid-cols-1 space-y-3">
            <p className="text-body14 desktop:text-body16 font-medium text-black">
              Kết nối với chúng tôi
            </p>
            <div className="desktop:flex hidden flex-row items-center justify-center space-x-3">
              <div>
                <Link
                  href="https://www.linkedin.com/company/ahamove/"
                  target="_blank"
                >
                  <a
                    className="relative inline-block h-6 w-6 bg-transparent"
                    title="LinkedIn"
                  >
                    <Image
                      src="/static/icons/LinkedInDesktop.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.facebook.com/AhamoveVietNam"
                  target="_blank"
                >
                  <a
                    className="relative inline-block h-6 w-6 bg-transparent"
                    title="Facebook"
                  >
                    <Image
                      src="/static/icons/FacebookDesktop.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.youtube.com/channel/UCQ38OzCARV2qCZxmK2XiKJA"
                  target="_blank"
                >
                  <a
                    className="relative inline-block h-6 w-6 bg-transparent"
                    title="Youtube"
                  >
                    <Image
                      src="/static/icons/YoutubeDesktop.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.tiktok.com/@ahamove.official?_d=secCgYIASAHKAESPgo8JCPk1tTNqUv%2FcrgqEKxfidesktopWylVPUXqnp8PNXevHbDGxYaYjz9M9R4NqEQ00ZXkigL5aYlu4FEawCqmNGgA%3D&_r=1&checksum=53d324c5fe3b252911eed1c58653df332e7d7c881ce9b3a18f3b9cd8e972a935&language=vi&sec_uid=MS4wLjABAAAAqHDL7Gyk9GkYZju5XNRAcT0ozhhtL0izo4G9-GpvQlu-tAb4Le6aLZkA8iNLAN5t&sec_user_id=MS4wLjABAAAAwB8nLxIEUUH1oeqceKYFJD1JEWtxmntl5inS2eUpisTrUuV4VgP7cU_8xwmFHarN&share_app_id=1180&share_author_id=7017802434521695259&share_link_id=76A33192-8832-40EE-935F-BBE2E617F834&source=h5_t&tt_from=copy&u_code=dada33bbm0ick8&user_id=6784425419073537026&utm_campaign=client_share&utm_medium=ios&utm_source=copy"
                  target="_blank"
                >
                  <a
                    className="relative inline-block h-6 w-6 bg-transparent"
                    title="Tiktok"
                  >
                    <Image
                      src="/static/icons/TikTokDesktop.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="desktop:hidden flex flex-row space-x-3">
              <div>
                <Link
                  href="https://www.facebook.com/AhamoveVietNam"
                  target="_blank"
                  rel="noreferrer"
                >
                  <a
                    className="relative inline-block h-9 w-9 bg-transparent"
                    title="Facebook"
                  >
                    <Image
                      src="/static/icons/FacebookMobile.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link href="https://www.instagram.com/ahamove/" target="_blank">
                  <a
                    className="relative inline-block h-9 w-9 bg-transparent"
                    title="Instagram"
                  >
                    <Image
                      src="/static/icons/InstagramMobile.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.youtube.com/channel/UCQ38OzCARV2qCZxmK2XiKJA"
                  target="_blank"
                >
                  <a
                    className="relative inline-block h-9 w-9 bg-transparent"
                    title="Youtube"
                  >
                    <Image
                      src="/static/icons/YoutubeMobile.svg"
                      layout="fill"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="desktop:hidden my-4 block w-fit">
            <LanguageSwitch />
          </div>
          <div className="desktop:justify-en desktop:mt-0 desktop:flex desktop:space-x-4 mt-2 flex flex-row justify-start space-x-6">
            <Link href="http://online.gov.vn/Home/WebDetails/49572" passHref>
              <a className="relative inline-block h-14 w-36 bg-transparent">
                <Image
                  src="/static/images/cert-registered.webp"
                  layout="fill"
                  alt=""
                />
              </a>
            </Link>
            <Link href="http://online.gov.vn/Home/AppDetails/168" passHref>
              <a className="relative inline-block h-14 w-36 bg-transparent">
                <Image
                  src="/static/images/cert-notificated.webp"
                  layout="fill"
                  alt=""
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <hr className="text-neutral-15 my-4 h-2" />
          <div className="space-y-1">
            <p className="text-caption12 text-neutral-70 font-semibold">
              Giấy chứng nhận đăng ký doanh nghiệp số 0313506115 cấp lần đầu
              ngày 26/10/2015 tại Sở Kế hoạch đầu tư Thành phố Hồ Chí Minh, cấp
              thay đổi lần thứ 08 ngày 28/05/2019.
            </p>
            <p className="text-caption12 text-neutral-70 font-semibold">
              Văn bản xác nhận thông báo hoạt động Bưu chính số 2418/XN-BTTTT do
              Bộ Thông tin và Truyền thông cấp lần đầu ngày 11/04/2017, cấp điều
              chỉnh lần thứ 1 ngày 24/7/2019.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
