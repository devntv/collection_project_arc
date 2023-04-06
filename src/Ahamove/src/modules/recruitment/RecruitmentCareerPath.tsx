import Image from 'next/image';
import Button from '@/components/Button';

export default function RecruitmentCareerPath() {
  return (
    <section className=" bg-secondary-20 desktop:block hidden">
      <div className="grid grid-cols-10">
        <div className="relative col-span-3 flex items-center justify-center">
          <div className="relative aspect-[27/20] h-auto w-full">
            <Image
              src="/static/images/recruitment/recruitment-boy.webp"
              alt=""
              layout="fill"
            />
          </div>
        </div>
        <div className="col-span-4 flex flex-col items-center justify-center p-6">
          <h2 className="text-title32 text-secondary-50 max-w-content mb-6 text-center font-bold">
            Con đường sự nghiệp nào tại Ahamove phù hợp với bạn nhất?
          </h2>
          <div>
            <Button title="Gia nhập Ahamove ngay" type="link" href="/about-us">
              Tham gia giải đố về sự nghiệp ngay
            </Button>
          </div>
        </div>
        <div className="relative col-span-3 flex items-center justify-center">
          <div className="relative aspect-[27/20] h-auto w-full">
            <Image
              src="/static/images/recruitment/recruitment-girl.webp"
              alt=""
              layout="fill"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
