import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import type { FormJobApplicationBody } from '@/api/form/usePostFormJobApplication';
import { usePostFormJobApplicationMutation } from '@/api/form/usePostFormJobApplication';
import type { FormUploadCVBody } from '@/api/form/usePutFormUploadCV';
import { usePutFormUploadCVMutation } from '@/api/form/usePutFormUploadCV';
import Button from '@/components/Button';
import useGoogleRecaptcha from '@/lib/useGoogleRecaptcha';
import '@/lib/yupPhone';
import SuccessSubmittedJobApplication from './SuccessSubmittedJobApplication';
const jobsFrom = [
  { id: 1, name: 'Fanpage Ahamove' },
  { id: 2, name: 'Linkedin Ahamove' },
  { id: 3, name: 'Facebook - Tin đăng tuyển dụng của HR' },
  { id: 4, name: 'Linkedin - Tin đăng tuyển dụng của HR' },
  { id: 5, name: 'Ybox', value: 'ybox' },
  { id: 6, name: 'Các website tuyển dụng' },
  { id: 7, name: 'Bạn bè giới thiệu' },
  { id: 8, name: 'Ahamover giới thiệu' },
  { id: 9, name: 'Nguồn khác' },
];

const MAX_FILE_SIZE = 1048576 * 2; // 2MB

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập mail').email('Mail không hợp lệ'),
  phone_number: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .phone('VN', 'Số diện thoại không hợp lệ'),
  name: yup.string().required('Vui lòng nhập tên'),
  cv_url: yup.string().required('Vui lòng upload CV'),
});

type Props = {
  jobTitle: string;
  jobID: number;
};

export default function JobApplicationForm({ jobTitle, jobID }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { loadGoogleReCaptchaScript, submitCaptcha } = useGoogleRecaptcha();
  const postFormJobApplicationMutation = usePostFormJobApplicationMutation();
  const putFormUploadCVMutation = usePutFormUploadCVMutation();
  const classSelect =
    'text-neutral-50 text-body16 font-normal bg-white w-full border border-neutral-40 rounded-sm py-2 px-3 form-select focus:ring-primary-40 focus:ring-inset focus:border-white focus-visible:outline-none';
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [name, setName] = useState('');
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
    watch,
  } = useForm<FormJobApplicationBody>({
    resolver: yupResolver(schema),
  });

  const changeUploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const rs = validateUploadFile(event.target.files[0]);

      if (rs) {
        onSubmitFileHandler(event.target.files[0]);
        setErrorMsg('');
      } else {
        setErrorMsg('Kích thước file vượt quá 2MB');
      }
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmitFileHandler = (file: File) => {
    const payloadFile = {
      file: file,
      dirname: 'ahamove.com',
    };
    const captcha = submitCaptcha();
    captcha.then((token) => {
      const payload = {
        ...payloadFile,
        g_recaptcha_response: token,
      };
      if (payload) {
        submitFile(payload);
      }
    });
  };

  const submitFile = (payload: FormUploadCVBody) => {
    putFormUploadCVMutation.mutate(payload, {
      onSuccess: (res) => {
        setValue('cv_url', res.url, {
          shouldValidate: false,
        });
      },
      onError: (err) => {
        toast.error(
          err.response?.data.url || 'Có lỗi xảy ra, vui lòng thử lại sau.'
        );
      },
    });
  };

  const validateUploadFile = (file: File) => {
    if (file) {
      const fileSize = file.size;

      if (fileSize > MAX_FILE_SIZE) {
        return false;
      }

      return true;
    }
  };

  const submitData = (payload: FormJobApplicationBody) => {
    postFormJobApplicationMutation.mutate(payload, {
      onSuccess: () => {
        setName(getValues('name'));
        reset();
        setSuccessSubmit(true);
      },
      onError: (err) => {
        toast.error(
          err.response?.data.msg || 'Có lỗi xảy ra, vui lòng thử lại sau.'
        );
      },
    });
  };

  const onSubmitHandler = (data: FormJobApplicationBody) => {
    const captcha = submitCaptcha();
    captcha.then((token) => {
      const payload = {
        ...data,
        g_recaptcha_response: token,
        job_title: jobTitle,
        parent_id: jobID,
      };
      submitData(payload);
    });
  };
  const classInputText =
    'w-full text-neutral-50 text-body16 font-normal placeholder:text-neutral-50 placeholder:text-base placeholder:font-normal bg-white border border-neutral-40 rounded-sm py-2 px-3 focus:ring-primary-40 focus:ring-inset focus:border-white form-input focus-visible:outline-none';
  return successSubmit ? (
    <SuccessSubmittedJobApplication name={name} job={jobTitle} />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      method="post"
      className="w-full space-y-6"
    >
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
            'border-red-40 focus:border-red-40': errors?.phone_number,
            'border-neutral-40 border': !errors?.phone_number,
          })}
          placeholder="Số điện thoại"
          autoComplete="tel"
          type="tel"
          {...register('phone_number')}
        />
        {errors?.phone_number && (
          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
            {errors.phone_number.message}
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
          autoComplete="email"
          {...register('email')}
        />
        {errors?.email && (
          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <select
          className={cn(classSelect, {
            'border-red-40 focus:border-red-40': errors?.relative,
            'border-neutral-40 border': !errors?.relative,
          })}
          {...register('relative')}
          onChange={(e) => {
            setValue('relative', e.target.value, {
              shouldValidate: true,
            });
          }}
        >
          <option value="" hidden>
            Bạn biết đến vị trí này từ
          </option>
          {jobsFrom.map((item) => (
            <option value={item.name} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors?.relative && (
          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
            {errors.relative.message}
          </p>
        )}
      </div>
      {watch('relative') === 'Nguồn khác' ? (
        <input
          className={cn(classInputText, {
            'border-red-40 focus:border-red-40': errors?.other_relative,
            'border-neutral-40 border': !errors?.other_relative,
          })}
          placeholder="Nguồn nào vậy bạn? Thêm vào đây nhé!"
          type="text"
          {...register('other_relative')}
        />
      ) : watch('relative') === 'Ahamover giới thiệu' ? (
        <div className="space-y-6">
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.referral_staff_id,
              'border-neutral-40 border': !errors?.referral_staff_id,
            })}
            placeholder="Mã nhân viên của Ahamover đó là?"
            type="text"
            {...register('referral_staff_id')}
          />
          <input
            className={cn(classInputText, {
              'border-red-40 focus:border-red-40': errors?.referral_staff_name,
              'border-neutral-40 border': !errors?.referral_staff_name,
            })}
            placeholder="Họ tên Ahamover đó là?"
            type="text"
            {...register('referral_staff_name')}
          />
        </div>
      ) : null}
      <div className="flex flex-col space-y-3">
        <p className="text-body16 text-neutral-60 font-normal">
          Upload CV / Resume (tối đa 2mb)
        </p>
        <div className="flex flex-row items-center space-x-4">
          <button
            className="sapce-x-2 relative flex flex-row items-center justify-center space-x-4 overflow-hidden border border-neutral-50 px-4 py-2"
            aria-label="button"
          >
            <div className="relative h-4 w-4">
              <Image
                src="/static/icons/recruitment/UploadFile.svg"
                alt=""
                layout="fill"
              />
            </div>
            <p className="text-neutral-90 text-body16 font-normal">
              Choose file
            </p>
            <input
              accept=".docx,.doc,.pdf"
              onChange={changeUploadFileHandler}
              type="file"
              className="absolute left-0 top-0 mt-2 scale-150 cursor-pointer opacity-0"
            />
          </button>
          {selectedFile && (
            <p className="text-caption12 text-neutral-60 ml-4 font-normal first-letter:uppercase">
              {selectedFile.name}
            </p>
          )}
        </div>
        {errorMsg !== '' && (
          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
            {errorMsg}
          </p>
        )}
        {errors?.cv_url && (
          <p className="text-caption12 text-red-40 ml-2 font-normal first-letter:uppercase">
            {errors.cv_url.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        loading={postFormJobApplicationMutation.isLoading}
        disabled={errorMsg ? true : false}
      >
        Gửi{' '}
      </Button>
    </form>
  );
}
