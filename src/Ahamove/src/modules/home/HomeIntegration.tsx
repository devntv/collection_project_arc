import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

export default function HomeIntegration() {
  return (
    <section className="desktop:py-0 bg-white py-10">
      <div className="max-w-8xl desktop:auto-cols-fr desktop:grid-flow-col desktop:grid-cols-2 desktop:px-8 mx-auto grid auto-rows-fr grid-cols-1 place-content-center items-center gap-12">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/static/images/home/cooporate.webp)' }}
        ></div>
        <article className="desktop:space-y-4 desktop:py-56 mx-auto flex flex-col items-start space-y-6 px-4">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-left font-bold">
            Tích hợp mạnh mẽ để tiến về phía trước
          </h2>
          <p className="text-body14 desktop:text-subtitle18 text-left font-normal text-black">
            Tối ưu quy trình hiện hành và đưa doanh nghiệp của bạn lên một tầm
            cao mới. Quá trình tích hợp không thể dễ dàng hơn khi đã có chúng
            tôi hỗ trợ bạn tối đa.
          </p>
          <Button
            title="Tìm hiểu thêm"
            className="desktop:block mt-2 hidden"
            type="link"
            href="/customer/cooperate/#cooperateForm"
          >
            Tìm hiểu thêm
          </Button>
          <Button
            title="Liên hệ ngay"
            className="desktop:hidden block"
            type="link"
            href="/customer/cooperate/#cooperateForm"
            fullWidth={true}
          >
            Liên hệ ngay
          </Button>
          <MoreInfo
            title="Tìm hiểu về quy trình"
            type="secondary"
            className="desktop:hidden"
            href="/customer/cooperate"
          />
        </article>
      </div>
    </section>
  );
}
