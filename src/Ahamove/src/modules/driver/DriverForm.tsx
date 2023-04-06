import '@/lib/yupPhone';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/router';
import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { FormDriverBody } from '@/api/form/usePostFromDriver';
import { usePostFormDriverMutation } from '@/api/form/usePostFromDriver';
import Button from '@/components/Button';
import { vehicleDriverFormData } from '@/lib/formData';
import useGoogleRecaptcha from '@/lib/useGoogleRecaptcha';
import { citiesData } from './citiesData';
import { districtsData } from './districtsData';
import SuccessSubmittedDriverForm from './SuccessSubmittedDriverForm';

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập mail').email('Mail không hợp lệ'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .phone('VN', 'Số diện thoại không hợp lệ'),
  name: yup.string().required('Vui lòng nhập tên'),
  vehicle: yup.string(),
  city: yup.string().required('Vui lòng chọn thành phố'),
  district: yup.string().required('Vui lòng chọn quận/huyện'),
});

export default function DriverForm(props: HTMLAttributes<HTMLDivElement>) {
  const { loadGoogleReCaptchaScript, submitCaptcha } = useGoogleRecaptcha();
  const postFormDriverMutation = usePostFormDriverMutation();
  const router = useRouter();

  useEffect(() => {
    loadGoogleReCaptchaScript();
  }, [loadGoogleReCaptchaScript]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FormDriverBody>({
    resolver: yupResolver(schema),
  });

  const submitData = (payload: FormDriverBody) => {
    postFormDriverMutation.mutate(payload, {
      onSuccess: () => {
        openModal();
        reset();
      },
      onError: (err) => {
        toast.error(
          err.response?.data.msg || 'Có lỗi xảy ra, vui lòng thử lại sau.'
        );
      },
    });
  };

  const onSubmitHandler = (data: FormDriverBody) => {
    const captcha = submitCaptcha();
    captcha.then((token) => {
      const payload = {
        ...data,
        g_recaptcha_response: token,
        utm_source: `${router.query?.utm_source}` || '',
        utm_content: `${router.query?.utm_content}` || '',
        utm_medium: `${router.query?.utm_medium}` || '',
        utm_campaign: `${router.query?.utm_campaign}` || '',
      };
      submitData(payload);
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  function openModal() {
    setIsOpen(true);
  }

  function checkDistrict(parent_id: number, name_vi_vn_city: string) {
    if (
      citiesData.find((item) => item.id === parent_id) &&
      citiesData.find((item) => item.id === parent_id)?.name_vi_vn ===
        name_vi_vn_city
    )
      return true;
    return false;
  }
  const classSelect =
    'text-neutral-50 text-body16 font-normal bg-white w-full border border-neutral-40 rounded-sm py-2 px-3 form-select focus:ring-primary-40 focus:ring-inset focus:border-white focus-visible:outline-none';
  const classInputText =
    'w-full text-neutral-50 text-body16 font-normal placeholder:text-neutral-50 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-input focus-visible:outline-none';
  return (
    <div
      className={cn(
        'shadow-dropshadow max-w-[550px]  rounded-2xl bg-white p-8',
        props.className
      )}
    >
      <h2 className="text-title24 text-neutral-90 mb-6 font-bold">
        Đăng ký trở thành tài xế Ahamove
      </h2>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        method="post"
        className="space-y-6"
      >
        <div>
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.name,
              'border-neutral-40 border': !errors?.name,
            })}
            placeholder="Họ và tên"
            type="text"
            {...register('name')}
          />
          {errors?.name && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.phone,
              'border-neutral-40 border': !errors?.phone,
            })}
            placeholder="Số điện thoại"
            type="tel"
            {...register('phone')}
          />
          {errors?.phone && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.email,
              'border-neutral-40 border': !errors?.email,
            })}
            placeholder="Email"
            type="text"
            {...register('email')}
          />
          {errors?.email && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="desktop:grid-cols-2 grid grid-cols-1 gap-x-2 gap-y-6">
          <div>
            <select
              className={cn(classSelect, {
                'border-red-40 focus:border-red-40': errors?.city,
                'border-neutral-40 border': !errors?.city,
              })}
              {...register('city')}
              onChange={(e) =>
                setValue('city', e.target.value, {
                  shouldValidate: true,
                })
              }
            >
              <option value="" hidden>
                Thành phố
              </option>
              {citiesData.map((item) => (
                <option key={item.id} value={item.name_vi_vn}>
                  {item.name_vi_vn}
                </option>
              ))}
            </select>
            {errors?.city && (
              <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <select
              className={cn(classSelect, {
                'border-red-40 focus:border-red-40': errors?.district,
                'border-neutral-40 border': !errors?.district,
              })}
              {...register('district')}
              onChange={(e) =>
                setValue('district', e.target.value, {
                  shouldValidate: true,
                })
              }
              disabled={getValues('city') === '' ? true : false}
            >
              <option value="" hidden>
                Quận / Huyện
              </option>
              {getValues('city') !== '' &&
                districtsData.map((item) => {
                  if (checkDistrict(item.parent_id, getValues('city'))) {
                    return (
                      <option key={item.id} value={item.name_vi_vn}>
                        {item.name_vi_vn}
                      </option>
                    );
                  }
                })}
            </select>
            {errors?.district && (
              <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                {errors.district.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <select
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.vehicle,
              'border-neutral-40 border': !errors?.vehicle,
            })}
            {...register('vehicle')}
            onChange={(e) =>
              setValue('vehicle', e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" hidden>
              Loại xe
            </option>
            {vehicleDriverFormData.map((item) => (
              <option value={item.value} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.vehicle && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.vehicle.message}
            </p>
          )}
        </div>
        <Button type="submit" loading={postFormDriverMutation.isLoading}>
          Gửi thông tin{' '}
        </Button>
        <SuccessSubmittedDriverForm isOpen={isOpen} handleClose={closeModal} />
      </form>
    </div>
  );
}
