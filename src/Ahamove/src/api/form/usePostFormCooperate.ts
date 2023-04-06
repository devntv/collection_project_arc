import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultFormResponse } from './types';

export type FormCooperateBody = {
  name: string;
  phone: string;
  email: string;
  city: string;
  number_of_order: string;
  note: string;
  g_recaptcha_response: string;
  business_website: string;
  number_of_vehicle: string;
  category: string;
};

export const postFormCooperateFn = async (body: FormCooperateBody) => {
  const response = await httpClient.post<DefaultFormResponse>(
    apiRoutes.form.cooperate,
    body
  );
  return response.data;
};

export const usePostFormCooperateMutation = (
  opts?: UseMutationOptions<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormCooperateBody
  >
) =>
  useMutation<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormCooperateBody
  >(postFormCooperateFn, opts);