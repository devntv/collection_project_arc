import Image from 'next/image';

export default function AboutUsCeo() {
  return (
    <section className="desktop:pt-16 bg-secondary-40 pt-8">
      <div className="max-w-8xl desktop:px-8 mx-auto">
        <div className="desktop:grid-cols-2 grid grid-cols-1 gap-12">
          <div className="desktop:pt-16 flex flex-col items-start px-4 pb-4">
            <div className="desktop:block relative hidden h-12 w-16 bg-transparent">
              <Image
                src="/static/icons/recruitment/QuoteFill.svg"
                alt=""
                layout="fill"
              />
              <div className="absolute -left-12 -bottom-12 bg-transparent">
                <Image
                  src="/static/icons/recruitment/QuoteOutline.svg"
                  width={89}
                  height={66}
                  alt=""
                />
              </div>
            </div>
            <p className="text-title60 desktop:hidden block font-bold text-white">
              "
            </p>
            <p className="text-title24 desktop:text-title42 desktop:mt-4 z-10 font-bold text-white">
              Trong tổ chức, dù nhỏ hay lớn, đều cần có sự ngăn nắp và minh
              bạch, thì các cá nhân mới có thể làm việc, hợp tác với nhau một
              cách hiệu quả và phát huy tối đa khả năng của mình.
            </p>
            <p className="text-subtitle18 mt-4 font-semibold text-white">
              Phạm Hữu Ngôn - CEO của Ahamove
            </p>
          </div>
          <div className="relative flex items-end justify-center">
            <div className="w-image relative aspect-[301/334] h-auto bg-transparent">
              <Image
                src="/static/images/recruitment/about-us-ceo.webp"
                alt=""
                layout="fill"
                className="z-20"
              />
              <div className="desktop:-right-6 absolute -top-3 right-0">
                <Image
                  src="/static/icons/recruitment/PointCeo.svg"
                  width={285}
                  height={295}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
