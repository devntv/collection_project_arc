import '@/lib/yupPhone';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { FormOnWheelBody } from '@/api/form/usePostFormOnWheel';
import { usePostFormOnWheelMutation } from '@/api/form/usePostFormOnWheel';
import Button from '@/components/Button';
import {
  categoryCustomerFormData,
  cityCustomerFormData,
  orderShippingCustomerFormData,
} from '@/lib/formData';
import useGoogleRecaptcha from '@/lib/useGoogleRecaptcha';
import SuccessSubmittedForm from '../SuccessSubmittedForm';

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập mail').email('Mail không hợp lệ'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .phone('VN', 'Số diện thoại không hợp lệ'),
  name: yup.string().required('Vui lòng nhập tên'),
  business_type: yup.string().required('Vui lòng chọn loại hình kinh doanh'),

  category: yup
    .string()
    .required('Vui lòng chọn ngành hàng kinh doanh của bạn'),
  order_shipping: yup.string(),
  city: yup.string(),
  business_website: yup
    .string()
    .url('Sai định dạng. Vui lòng nhập website')
    .when('business_type', {
      is: 'Doanh nghiệp',
      then: yup.string().required('Vui lòng nhập website doanh nghiệp'),
      otherwise: yup.string().notRequired(),
    }),
});

export default function CustomerForm(props: HTMLAttributes<HTMLDivElement>) {
  const { loadGoogleReCaptchaScript, submitCaptcha } = useGoogleRecaptcha();

  useEffect(() => {
    loadGoogleReCaptchaScript();
  }, [loadGoogleReCaptchaScript]);

  const postFormOnWheelMutation = usePostFormOnWheelMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormOnWheelBody>({
    resolver: yupResolver(schema),
    defaultValues: {
      business_type: 'Kinh doanh nhỏ',
    },
    mode: 'onChange',
  });

  const submitData = (payload: FormOnWheelBody) => {
    postFormOnWheelMutation.mutate(payload, {
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

  const onSubmitHandler = (data: FormOnWheelBody) => {
    const captcha = submitCaptcha();
    captcha.then((token) => {
      const payload = {
        ...data,
        g_recaptcha_response: token,
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
  const classSelect =
    'text-neutral-50 text-body16 font-normal bg-white w-full border border-neutral-40 rounded-sm py-2 px-3 form-select focus:ring-primary-40 focus:ring-inset focus:border-white focus-visible:outline-none';
  const classInputText =
    'w-full text-neutral-50 text-body16 font-normal placeholder:text-neutral-50 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-input focus-visible:outline-none';
  const classInputRadio =
    'form-radio w-5 h-5 text-primary-40 focus:ring-primary-40 focus-visible:outline-none checked:bg-none';
  const classLabelRadio = 'font-normal text-base text-neutral-90';
  return (
    <div
      className={cn(
        'shadow-dropshadow-form max-w-[2/5] rounded-2xl bg-white p-8',
        props.className
      )}
    >
      <h3 className="text-subtitle20 text-neutral-90 mb-2 font-bold">
        Đăng ký thông tin để nhận tư vấn
      </h3>
      <p className="text-body16 text-neutral-90 mb-4 font-normal">
        Ahamove sẽ liên hệ hỗ trợ bạn nhanh nhất có thể
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        method="post"
        className="space-y-4"
      >
        <div className="space-y-2">
          <div className="flex space-x-3">
            <input
              {...register('business_type')}
              id="shop"
              value="Kinh doanh nhỏ"
              type="radio"
              className={classInputRadio}
              onChange={(e) =>
                setValue('business_type', e.target.value, {
                  shouldValidate: true,
                })
              }
              defaultChecked
            />
            <label htmlFor="shop" className={classLabelRadio}>
              Kinh doanh nhỏ{' '}
              <span className="text-neutral-50">
                (có 1 cửa hàng hoặc kinh doanh online. Có ứng tiền)
              </span>
            </label>
          </div>

          <div className="flex space-x-3">
            <input
              {...register('business_type')}
              id="enterprise"
              value="Doanh nghiệp"
              type="radio"
              className={classInputRadio}
              onChange={(e) =>
                setValue('business_type', e.target.value, {
                  shouldValidate: true,
                })
              }
            />
            <label htmlFor="enterprise" className={classLabelRadio}>
              Doanh nghiệp{' '}
              <span className="text-neutral-50">
                (trên 2 cửa hàng. Có ứng tiền)
              </span>
            </label>
          </div>
          {errors?.['business_type'] && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors['business_type'].message}
            </p>
          )}
        </div>
        <div>
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.name,
              'border-neutral-40 border': !errors?.name,
            })}
            placeholder="Họ và tên"
            autoComplete="name"
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
            placeholder="SĐT liên hệ"
            autoComplete="tel"
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
            autoComplete="email"
            type="text"
            {...register('email')}
          />
          {errors?.email && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.business_website,
              'border-neutral-40 border': !errors?.business_website,
            })}
            placeholder="Website doanh nghiệp"
            type="text"
            {...register('business_website')}
          />
          {errors?.business_website && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.business_website.message}
            </p>
          )}
        </div>
        <div>
          <select
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.city,
              'border-neutral-40 border': !errors?.city,
            })}
            {...register('city')}
            onChange={(e) =>
              setValue('city', e.target.value, { shouldValidate: true })
            }
          >
            <option value="" hidden>
              Khu vực kinh doanh của bạn
            </option>
            {cityCustomerFormData.map((item) => (
              <option value={item.value} key={item.id}>
                {item.name}
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
            {...register('category')}
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.category,
              'border-neutral-40 border': !errors?.category,
            })}
            onChange={(e) =>
              setValue('category', e.target.value, { shouldValidate: true })
            }
          >
            <option value="" hidden>
              Ngành hàng kinh doanh của bạn?
            </option>
            {categoryCustomerFormData.map((item) => (
              <option value={item.value} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.category && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <select
            {...register('order_shipping')}
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.order_shipping,
              'border-neutral-40 border': !errors?.order_shipping,
            })}
            onChange={(e) =>
              setValue('order_shipping', e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" hidden>
              Nhu cầu giao hàng
            </option>
            {orderShippingCustomerFormData.map((item) => (
              <option value={item.value} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.order_shipping && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.order_shipping.message}
            </p>
          )}
        </div>
        <Button type="submit" loading={postFormOnWheelMutation.isLoading}>
          Đăng ký{' '}
        </Button>
        <SuccessSubmittedForm isOpen={isOpen} handleClose={closeModal} />
      </form>
    </div>
  );