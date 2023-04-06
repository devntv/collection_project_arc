import '@/lib/yupPhone';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { FormCooperateBody } from '@/api/form/usePostFormCooperate';
import { usePostFormCooperateMutation } from '@/api/form/usePostFormCooperate';
import Button from '@/components/Button';
import {
  areasCustomerFormData,
  categoryCustomerFormData,
  demandCustomerFormData,
  servicesCooperateFormData,
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
  area_of_order: yup
    .string()
    .required('Vui lòng chọn khu vực hoạt động của bạn'),
  demand_of_vehicle: yup.string().required('Vui lòng chọn nhu cầu của bạn'),
  note: yup.string().required('Vui lòng nhập vấn đề của bạn'),
  business_website: yup
    .string()
    .url('Sai định dạng. Vui lòng nhập website')
    .required('Vui lòng nhập website doanh nghiệp'),
  category: yup
    .string()
    .required('Vui lòng chọn ngành hàng kinh doanh của bạn'),
  service: yup
    .string()
    .required('Vui lòng chọn dịch vụ mà bạn mong muốn tư vấn'),
});

export default function CooperateForm(props: HTMLAttributes<HTMLDivElement>) {
  const { loadGoogleReCaptchaScript, submitCaptcha } = useGoogleRecaptcha();
  const postFormCooperateMutation = usePostFormCooperateMutation();

  useEffect(() => {
    loadGoogleReCaptchaScript();
  }, [loadGoogleReCaptchaScript]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormCooperateBody>({
    resolver: yupResolver(schema),
  });

  const submitData = (payload: FormCooperateBody) => {
    postFormCooperateMutation.mutate(payload, {
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

  const onSubmitHandler = (data: FormCooperateBody) => {
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
  const classTextArea =
    'w-full text-neutral-50 text-body16 font-normal placeholder:text-neutral-50 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-textarea focus-visible:outline-none';
  return (
    <div
      className={cn(
        'shadow-dropshadow-form rounded-2xl bg-white p-8',
        props.className
      )}
    >
      <h3 className="text-subtitle20 text-neutral-90 mb-2 font-bold">
        Để lại thông tin ngay
      </h3>
      <p className="text-body16 text-neutral-90 mb-4 font-normal">
        Ahamove sẽ liên hệ hỗ trợ bạn nhanh nhất có thể
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        method="post"
        className="space-y-4"
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
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.service,
              'border-neutral-40 border': !errors?.service,
            })}
            {...register('service')}
            onChange={(e) =>
              setValue('service', e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" hidden>
              Dịch vụ mong muốn tư vấn
            </option>
            {servicesCooperateFormData.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.area_of_order,
              'border-neutral-40 border': !errors?.area_of_order,
            })}
            {...register('area_of_order')}
            onChange={(e) =>
              setValue('area_of_order', e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" hidden>
              Khu vực hoạt động
            </option>
            {areasCustomerFormData.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.area_of_order && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.area_of_order.message}
            </p>
          )}
        </div>
        <div>
          <select
            className={cn(classSelect, {
              'border-red-40 focus:border-red-40': errors?.demand_of_vehicle,
              'border-neutral-40 border': !errors?.demand_of_vehicle,
            })}
            {...register('demand_of_vehicle')}
            onChange={(e) =>
              setValue('demand_of_vehicle', e.target.value, {
                shouldValidate: true,
              })
            }
          >
            <option value="" hidden>
              Nhu cầu
            </option>
            {demandCustomerFormData.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.demand_of_vehicle && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.demand_of_vehicle.message}
            </p>
          )}
        </div>
        <div>
          <textarea
            className={cn(classTextArea, {
              'border-red-40 focus:border-red-40': errors?.note,
              'border-neutral-40 border': !errors?.note,
            })}
            placeholder="Vấn đề bạn đang gặp khó khăn"
            {...register('note')}
          />
          {errors?.note && (
            <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
              {errors.note.message}
            </p>
          )}
        </div>
        <Button type="submit" loading={postFormCooperateMutation.isLoading}>
          Gửi thông tin{' '}
        </Button>
        <SuccessSubmittedForm isOpen={isOpen} handleClose={closeModal} />
      </form>
    </div>
  );
}
