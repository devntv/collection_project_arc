import Image from 'next/image';

export default function AboutUsContent() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="max-w-8xl desktop:px-8 relative mx-auto w-full px-4">
        <article className="desktop:grid-cols-2 desktop:py-16 grid grid-cols-1 gap-12 py-8">
          <p className="text-title24 desktop:font-bold font-semibold text-black">
            Ahamove là thương hiệu giao hàng theo nhu cầu chuyên nghiệp với nền
            tảng công nghệ hiện đại nhất khu vực được tối ưu hoá cho nhu cầu của
            địa phương, đáp ứng mọi nhu cầu vận chuyển của người tiêu dùng và
            chủ doanh nghiệp.
          </p>
          <p className="text-body16 font-medium text-black">
            Thành lập từ năm 2015, Ahamove là dịch vụ giúp hơn 300.000 chủ shop,
            chủ doanh nghiệp ship hàng nội thành tại Hà Nội, TP. HCM và 7 thành
            phố khác với tốc độ nhanh, chi phí hợp lý và đội ngũ shipper hùng
            hậu. Với thế mạnh là đội ngũ kĩ sư công nghệ chuyên giải quyết các
            bài toán khu vực, Ahamove cung cấp cho cả khách hàng và tài xế những
            công cụ giúp tăng năng suất làm việc, tối đa hóa lợi ích như phần
            mềm dịch vụ SaaS quản lý vận hành hay công nghệ bản đồ tối ưu quãng
            đường. Ahamove là mong muốn đơn giản hóa việc giao hàng, giúp các
            chủ cửa hàng vừa và nhỏ tại Việt Nam cũng có thể tận hưởng một dịch
            vụ cao cấp, tiện lợi nhưng với giá cả hợp lý. Ahamove đang giúp hơn
            30.000 tài xế Việt có thu nhập hàng tháng với chính sách phí và
            thưởng hấp dẫn.
          </p>
        </article>
        <div className="desktop:grid-cols-2 desktop:py-16 grid auto-cols-fr grid-cols-1 gap-12 py-8 ">
          <article className="text-title24 desktop:font-bold flex flex-col font-semibold text-black">
            <div className="relative h-[60px] w-[60px]">
              <Image
                src="/static/icons/recruitment/Mission.svg"
                alt=""
                layout="fill"
              />
            </div>
            <h2 className="text-neutral-80 desktop:text-title42 text-title32 mt-6 font-bold">
              Sứ mệnh
            </h2>
            <p className="text-body16 desktop:min-h-[72px] mt-4 font-normal text-black">
              Ahamove là thương hiệu giao hàng theo nhu cầu chuyên nghiệp với
              nền tảng công nghệ hiện đại nhất khu vực được tối ưu hoá cho nhu
              cầu của địa phương, đáp ứng mọi nhu cầu vận chuyển của người tiêu
              dùng và chủ doanh nghiệp.
            </p>
            <div className="relative mt-8 aspect-[13/10] h-auto w-full">
              <Image
                src="/static/images/recruitment/about-us-mission.webp"
                alt=""
                layout="fill"
              />
            </div>
          </article>
          <article className="text-title24 desktop:font-bold flex flex-col justify-start font-semibold text-black">
            <div className="relative h-[60px] w-[60px]">
              <Image
                src="/static/icons/recruitment/Vision.svg"
                alt=""
                layout="fill"
              />
            </div>

            <h2 className="text-neutral-80 desktop:text-title42 text-title32 mt-6 font-bold">
              Tầm nhìn
            </h2>
            <p className="text-body16 desktop:min-h-[72px] mt-4 font-normal text-black">
              Vươn lên hàng đầu trong lĩnh vực ứng dụng công nghệ giao hàng Việt
              Nam và vươn ra khu vực
            </p>
            <div className="relative mt-8 aspect-[13/10] h-auto w-full">
              <Image
                src="/static/images/recruitment/about-us-vision.webp"
                alt=""
                layout="fill"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
