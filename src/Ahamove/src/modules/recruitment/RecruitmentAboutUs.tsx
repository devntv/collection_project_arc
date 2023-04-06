import Image from 'next/image';
import Button from '@/components/Button';

export default function RecruitmentAboutUs() {
  return (
    <section className="desktop:pt-16 bg-primary-10 py-11">
      <div className="max-w-8xl desktop:px-8 mx-auto">
        <div className="desktop:grid-cols-2 grid grid-cols-1 gap-6">
          <div className="desktop:px-0 flex flex-col items-start justify-center px-4">
            <h2 className="text-title24 text-secondary-90 desktop:text-title42 desktop:min-w-full text-left font-bold">
              Ahamove là nơi...
            </h2>
            <p className="text-body16 mb-6 text-left font-normal text-black">
              Ahamove luôn lấy "con người làm trọng tâm". Chúng tôi rất trân
              trọng, đề cao giá trị của mỗi nhân viên; liên tục tạo ra những cơ
              hội để các cá nhân, tập thể gắn kết và phát triển. Chúng tôi xây
              dựng môi trường đầy năng lượng giúp các thành viên tận hưởng niềm
              vui trong công việc và tạo nên kết quả ý nghĩa, cùng nhau!
            </p>
            <div>
              <Button
                title="Gia nhập Ahamove ngay"
                type="link"
                href="/about-us"
              >
                Về chúng tôi
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-image relative aspect-[82/57] h-auto bg-transparent">
              <Image
                src="/static/images/recruitment/recruitment-about-us.webp"
                alt=""
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
