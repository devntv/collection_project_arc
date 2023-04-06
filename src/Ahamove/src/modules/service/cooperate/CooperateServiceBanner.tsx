import Image from 'next/image';

export default function CooperateServiceBanner() {
  return (
    <section
      className="relative overflow-hidden pt-14"
      style={{
        backgroundImage:
          'linear-gradient(77.36deg, #EA5800 -1.14%, #F97F36 104.17%)',
      }}
    >
      <article className="desktop:px-0 mx-auto flex max-w-3xl flex-col justify-between space-y-6 px-4">
        <h2 className=" text-title32 desktop:text-title60 text-center font-bold uppercase text-white">
          Giải pháp ưu việt dành cho mọi doanh nghiệp
        </h2>
        <div className="relative z-20 aspect-[37/20] h-auto bg-transparent">
          <Image
            src="/static/images/service/banner-cooperate-service.webp"
            alt=""
            layout="fill"
          />
        </div>
      </article>
      <div className="bg-secondary-10 desktop:h-52 absolute inset-x-0 bottom-0 h-24 [clip-path:polygon(100%_0,_0_100%,_100%_100%)]"></div>
    </section>
  );
}
