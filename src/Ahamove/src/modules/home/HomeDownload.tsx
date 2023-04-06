import DownloadApp from '@/components/DownloadApp';

export default function HomeDownload() {
  return (
    <section className="bg-primary-10 py-16">
      <div className="max-w-8xl desktop:auto-cols-fr desktop:grid-flow-col desktop:grid-cols-2 desktop:px-8 mx-auto grid auto-rows-fr grid-cols-1 place-content-center items-center gap-12">
        <div className="desktop:px-0 mx-auto flex flex-col items-start justify-center px-4">
          <p className="text-title32 text-neutral-90 desktop:text-title42 mb-3 text-left font-bold">
            Cần là có - mọi lúc, mọi nơi theo cách bạn muốn
          </p>
          <p className="text-body14 desktop:text-subtitle18 mb-8 text-left font-normal text-black">
            Tải ứng dụng ngay để tối ưu trải nghiệm
          </p>
          <DownloadApp hasQR={true} />
        </div>
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/static/images/home/download.webp)' }}
        ></div>
      </div>
    </section>
  );
}
