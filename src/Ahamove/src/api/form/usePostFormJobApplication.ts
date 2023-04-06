import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultFormResponse } from './types';

export type FormJobApplicationBody = {
  name: string;
  phone_number: string;
  email: string;
  cv_url: string;
  g_recaptcha_response: string;
  job_title: string;
  referral_staff_id: string;
  referral_staff_name: string;
  relative: string;
  parent_id: number;
  other_relative: string;
};
export const postFormJobApplicationFn = async (
  body: FormJobApplicationBody
) => {
  const response = await httpClient.post<DefaultFormResponse>(
    apiRoutes.form.jobApplication,
    body
  );
  return response.data;
};

export const usePostFormJobApplicationMutation = (
  opts?: UseMutationOptions<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormJobApplicationBody
  >
) =>
  useMutation<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormJobApplicationBody
  >(postFormJobApplicationFn, opts);