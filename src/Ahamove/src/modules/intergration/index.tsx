import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { FormPartner } from '@/api/partner/type';
import { usePostIntergrationAccount } from '@/api/partner/usePostIntergrationAccount';
import Button from '@/components/Button';
import AhamoveBg from '@/components/icons/AhamoveBg';
import Container from '@/components/layouts/Container';
import { typeOfBusiness } from '@/lib/formData';
import useGoogleRecaptcha from '@/lib/useGoogleRecaptcha';
import SuccessSubmittedForm from '../customer/SuccessSubmittedForm';

const schema = yup.object().shape({
  business_legal_name: yup.string().required('Vui lòng nhập tên công ty'),
  business_official_website: yup.string().required('Vui lòng nhập website'),
  trade_name: yup.string().required('Vui lòng nhập tên thương mại'),
  integration_email: yup.string().required('Vui lòng nhập địa chỉ email'),
  integration_mobile_number: yup
    .string()
    .required('Vui lòng nhập số điện thoại'),
});

const Intergration: FC = () => {
  const { loadGoogleReCaptchaScript, submitCaptcha } = useGoogleRecaptcha();
  const postIntergrationAccount = usePostIntergrationAccount();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadGoogleReCaptchaScript();
  }, [loadGoogleReCaptchaScript]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
  } = useForm<FormPartner>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormPartner) => {
    const captcha = submitCaptcha();
    captcha.then((token) => {
      const payload = {
        ...data,
        g_recaptcha_response: token,
      };
      submitData(payload);
    });
  };

  const submitData = (payload: FormPartner) => {
    postIntergrationAccount.mutate(payload, {
      onSuccess: () => {
        setIsOpen(true);
        reset();
      },
      onError: (err) => {
        toast.error(
          err.response?.data.msg || 'Có lỗi xảy ra, vui lòng thử lại sau.'
        );
      },
    });
  };

  const classSelect =
    'text-neutral-40 text-body16 font-normal bg-white w-full border border-neutral-40 rounded-sm py-2 px-3 form-select focus:ring-primary-40 focus:ring-inset focus:border-white focus-visible:outline-none';
  const classInputText =
    'w-full text-neutral-40 text-body16 font-normal placeholder:text-neutral-40 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-input focus-visible:outline-none';
  return (
    <Container>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content flex w-full grow flex-col">
        <section className="bg-secondary-10 overflow-hidden py-12">
          <div className="max-w-8xl desktop:px-8 relative mx-auto w-full px-4">
            <AhamoveBg className="fill-secondary-20 absolute -left-56 -bottom-14" />
            <div className="max-w-8xl desktop:grid-cols-4 mx-auto grid grid-cols-1 gap-6">
              <article className="desktop:flex mx-auto hidden flex-col items-start justify-between">
                <h2 className="text-title32 text-secondary-90 desktop:text-title42 z-30 text-left font-bold">
                  Đăng ký tài khoản tích hợp
                </h2>
              </article>
              <div className="z-30 col-span-3">
                <div
                  className={cn(
                    'shadow-dropshadow-form rounded-2xl bg-white p-8'
                  )}
                >
                  <h2 className="text-title32 desktop:hidden text-secondary-90 desktop:text-title42 z-30 mb-4 text-left font-bold">
                    Đăng ký tài khoản tích hợp
                  </h2>
                  <h3 className="text-subtitle18 text-primary-50 font-medium">
                    Thông tin doanh nghiệp
                  </h3>
                  <p className="text-neutral-40 mb-2 text-sm">
                    Bạn có thể điền thông tin cá nhân nếu không đại diện cho một
                    công ty hoặc một tổ chức
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    method="post"
                    className="space-y-4"
                  >
                    <div className="desktop:grid-cols-2 desktop:gap-x-16 mt-4 grid grid-cols-1 gap-y-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="business_legal_name"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Tên đầy đủ công ty{' '}
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="business_legal_name"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.business_legal_name,
                            'border-neutral-40 border':
                              !errors?.business_legal_name,
                          })}
                          placeholder="Ex: Công ty CP Dịch vụ tức thời"
                          type="text"
                          {...register('business_legal_name')}
                        />
                        {errors?.business_legal_name && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.business_legal_name.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Tên chính thức được đăng ký kinh doanh của công ty
                        </p>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="trade_name"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Tên thương mại
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="trade_name"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.trade_name,
                            'border-neutral-40 border': !errors?.trade_name,
                          })}
                          placeholder="Ex: Ahamove"
                          type="text"
                          {...register('trade_name')}
                        />
                        {errors?.trade_name && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.trade_name.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Tên thương hiệu được sử dụng khi xây dựng hình ảnh
                          trên thị trường
                        </p>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="business_official_website"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Website doanh nghiệp{' '}
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="business_official_website"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.business_official_website,
                            'border-neutral-40 border':
                              !errors?.business_official_website,
                          })}
                          placeholder="Ex: ahamove.com"
                          type="text"
                          {...register('business_official_website')}
                        />
                        {errors?.business_official_website && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.business_official_website.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Website chính thức của doanh nghiêp
                        </p>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="business_type"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Loại hình sử dụng dịch vụ{' '}
                          <span className="text-primary-50">*</span>
                        </label>
                        <select
                          id="business_type"
                          {...register('business_type')}
                          className={cn(classSelect, {
                            'border-red-40 focus:border-red-40':
                              errors?.business_type,
                            'border-neutral-40 border': !errors?.business_type,
                          })}
                          onChange={(e) =>
                            setValue('business_type', e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <option value="" hidden>
                            Ngành hàng kinh doanh của bạn?
                          </option>
                          {typeOfBusiness.map((item) => (
                            <option value={item.value} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors?.business_type && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.business_type.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="integration_email"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Email nhận thông tin tích hợp{' '}
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="integration_email"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.integration_email,
                            'border-neutral-40 border':
                              !errors?.integration_email,
                          })}
                          placeholder="Ex: support@ahamove.com"
                          type="text"
                          {...register('integration_email')}
                        />
                        {errors?.integration_email && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.integration_email.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Email đăng ký sẽ nhận được thông tin API key dùng cho
                          việc tích hợp và trao đổi thông tin qua API. Khuyến
                          khích không sử dụng email cá nhân, tránh việc thay đổi
                          nhân sự phụ trách ảnh hưởng đến vận hành sau này.
                        </p>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="integration_mobile_number"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Số điện thoại đăng ký dịch vụ
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="integration_mobile_number"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.integration_mobile_number,
                            'border-neutral-40 border':
                              !errors?.integration_mobile_number,
                          })}
                          placeholder="Ex: 849xxxxxxx"
                          type="text"
                          {...register('integration_mobile_number')}
                        />
                        {errors?.integration_mobile_number && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.integration_mobile_number.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Hãy cung cấp cho Ahamove các số điện thoại đại diện để
                          đăng ký tài khoản công ty tại Ahamove. Số ĐT này được
                          sử dụng để đăng nhập, cấp quyền, quản lý toàn bộ việc
                          tích hợp và để đăng ký tài khoản Tài xế trên môi
                          trường Staging sử dụng trong quá trình tích hợp (Tối
                          đa 3 số, cách nhau bằng dấu phẩy)
                        </p>
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="business_development_staff"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Họ và tên nhân viên phụ trách
                        </label>
                        <input
                          id="business_development_staff"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.business_development_staff,
                            'border-neutral-40 border':
                              !errors?.business_development_staff,
                          })}
                          placeholder="Business development/Sales Staff"
                          type="text"
                          {...register('business_development_staff')}
                        />
                        {errors?.business_development_staff && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {errors.business_development_staff.message}
                          </p>
                        )}
                        <p className="text-neutral-40 mt-2 text-sm">
                          Ahamove sẽ dùng thông tin này để liên hệ với nhân viên
                          chăm sóc của bạn để có sự hỗ trợ kịp thời. Nếu bạn
                          chưa có nhân viên kinh doanh nào, hãy để trống thông
                          tin, chúng tôi sẽ tìm kiếm một nhân viên phù hợp để hỗ
                          trợ bạn
                        </p>
                      </div>
                    </div>
                    <h3 className="text-subtitle18 text-primary-50 mb-2 font-medium">
                      Thông tin người phụ trách tích hợp ( PIC Tích hợp )
                    </h3>
                    <div className="desktop:grid-cols-2 desktop:gap-x-16 mt-4 grid grid-cols-1 gap-y-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="integration_pic_info.integration_pic_email"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Email của PIC Tích hợp{' '}
                          <span className="text-primary-50">*</span>
                        </label>
                        <input
                          id="integration_pic_info.integration_pic_email"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.integration_pic_info
                                ?.integration_pic_email,
                            'border-neutral-40 border':
                              !errors?.integration_pic_info
                                ?.integration_pic_email,
                          })}
                          placeholder="Business development/Sales Staff"
                          type="text"
                          {...register(
                            'integration_pic_info.integration_pic_email'
                          )}
                        />
                        {errors?.integration_pic_info
                          ?.integration_pic_email && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {
                              errors.integration_pic_info?.integration_pic_email
                                .message
                            }
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="integration_pic_info.extra_information"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Thông tin thêm
                        </label>
                        <textarea
                          id="integration_pic_info.extra_information"
                          className={cn(classInputText, {
                            'border-red-40 focus:border-red-40':
                              errors?.integration_pic_info?.extra_information,
                            'border-neutral-40 border':
                              !errors?.integration_pic_info?.extra_information,
                          })}
                          placeholder="Note"
                          {...register(
                            'integration_pic_info.extra_information'
                          )}
                        />
                        {errors?.integration_pic_info?.extra_information && (
                          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
                            {
                              errors.integration_pic_info?.extra_information
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="py-4 text-right">
                      <Button
                        type="submit"
                        className="desktop:w-1/4 w-full"
                        loading={postIntergrationAccount.isLoading}
                      >
                        Gửi thông tin
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SuccessSubmittedForm
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </Container>
  );
};
export default Intergration;