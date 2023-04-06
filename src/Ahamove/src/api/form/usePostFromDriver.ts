import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultFormResponse } from './types';

export type FormDriverBody = {
  name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  vehicle: string;
  utm_source: string;
  utm_content: string;
  utm_medium: string;
  utm_campaign: string;
};

export const postFormDriverFn = async (body: FormDriverBody) => {
  const response = await httpClient.post<DefaultFormResponse>(
    apiRoutes.form.driver,
    body
  );
  return response.data;
};

export const usePostFormDriverMutation = (
  opts?: UseMutationOptions<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormDriverBody
  >
) =>
  useMutation<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormDriverBody
  >(postFormDriverFn, opts);
