import '@/lib/yupPhone';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/Button';
const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập mail').email('Mail không hợp lệ'),
});

type Item = {
  email: string;
};

export default function RecruitmentConnect() {
  const classInputText =
    'w-full text-neutral-50 text-body16 font-normal placeholder:text-neutral-50 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-input focus-visible:outline-none h-12';

  const {
    register,
    formState: { errors },
  } = useForm<Item>({
    resolver: yupResolver(schema),
  });
  return (
    <section className=" bg-secondary-30">
      <div className="desktop:grid-cols-10 max-w-8xl mx-auto grid grid-cols-1">
        <div className="relative col-span-2 flex items-center justify-center">
          <div className="rounded-r-3lg border-secondary-50 desktop:block relative hidden h-full w-full border-r-2 bg-transparent"></div>
        </div>
        <div className="desktop:rounded-3lg desktop:from-secondary-70 desktop:to-secondary-50 desktop:bg-gradient-to-r desktop:col-span-6 desktop:py-20 flex flex-col items-center justify-center px-4 py-12">
          <h2 className="text-title24 desktop:text-title32 desktop:text-white text-neutral-90 desktop:w-2/3 mb-4 text-center font-bold">
            Giữ liên lạc với chúng tôi để nhận được thông tin mới nhất
          </h2>
          <form
            method="post"
            className="desktop:w-2/3 desktop:px-0 desktop:flex-row flex w-full flex-col px-4"
          >
            <div className="desktop:mb-0 desktop:mr-4 mb-4 grow">
              <input
                className={cn(classInputText, {
                  'border-red-40 focus:border-red-40': errors?.email,
                  'border-neutral-40 border': !errors?.email,
                })}
                placeholder="Email công việc"
                type="text"
                {...register('email')}
              />
              {errors?.email && (
                <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mx-auto">
              <Button type="submit">Gửi</Button>
            </div>
          </form>
        </div>
        <div className="rounded-l-3lg border-secondary-50 desktop:block relative col-span-2 hidden h-full w-full border-l-2 bg-transparent"></div>
      </div>
    </section>
  );
}
