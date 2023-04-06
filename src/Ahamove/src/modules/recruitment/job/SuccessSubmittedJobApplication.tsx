import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

type Props = {
  name: string;
  job: string;
};

export default function SuccessSubmittedJobApplication({ name, job }: Props) {
  const router = useRouter();
  return (
    <div className="min-h-content w-full">
      <article className="shadow-depth4 desktop:p-16 min-h-content relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-8 text-left">
        <div className="relative mx-auto flex h-28 w-28">
          <Image
            src="/static/icons/customer/SendForm.svg"
            layout="fill"
            alt=""
          />
        </div>
        <div className="mt-6">
          <h3 className="text-title32 text-neutral-80 text-center font-bold">
            Ứng tuyển thành công
          </h3>
          <div className="mt-4">
            <p className="text-body16 text-left font-medium text-black">
              Chào {name}, <br />
              Ahamove chân thành cảm ơn Bạn đã nộp hồ sơ ứng tuyển vào vị trí{' '}
              <strong>{job}</strong>
              <br />
              Ahamove sẽ liên hệ với Bạn trong vòng 2-5 ngày nếu CV của Bạn phù
              hợp với vị trí mà Bạn ứng tuyển. Nếu Bạn chưa thấy Ahamove liên hệ
              thì cũng đừng buồn vì hồ sơ của Bạn đã được lưu trữ trong Talent
              Pool của Ahamove, chúng tôi sẽ liên hệ với Bạn ngay khi có vị trí
              phù hợp. <br />
              <br />
              Chúc Bạn có một ngày vui vẻ. Hy vọng chúng ta sẽ sớm có cơ hội gặp
              nhau. <br />
              <br />
              Trân trọng!
            </p>
          </div>
        </div>
        <Button
          title="Quay về trang chủ"
          className="mt-9 px-5"
          type="button"
          onClick={() => router.push('/')}
        >
          Quay về trang chủ
        </Button>
      </article>
    </div>
  );
}
