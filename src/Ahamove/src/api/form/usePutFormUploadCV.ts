import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export interface FormUploadCVBody {
  file: File;
  dirname: string;
  g_recaptcha_response: string;
}

export type FormUploadCVResponse = {
  url: string;
};

export const putFormUploadCVFn = async (body: FormUploadCVBody) => {
  const { file, dirname } = body;

  const formData = new FormData();

  formData.append('file', file);
  formData.append('dirname', dirname);

  const response = await httpClient.put<FormUploadCVResponse>(
    apiRoutes.form.uploadCV,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    }
  );
  return response.data;
};

export const usePutFormUploadCVMutation = (
  opts?: UseMutationOptions<
    FormUploadCVResponse,
    AxiosError<FormUploadCVResponse>,
    FormUploadCVBody
  >
) =>
  useMutation<
    FormUploadCVResponse,
    AxiosError<FormUploadCVResponse>,
    FormUploadCVBody
  >(putFormUploadCVFn, opts);
