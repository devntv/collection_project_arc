import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultFormResponse } from './types';

export type FormOnWheelBody = {
  name: string;
  phone: string;
  email: string;
  number_of_vehicle: string;
  number_of_order: string;
  service: string;
  note: string;
  g_recaptcha_response: string;
  business_website: string;
  category: string;
  business_type: string;
  city: string;
  order_shipping: string;
};

export const postFormOnWheelFn = async (body: FormOnWheelBody) => {
  const response = await httpClient.post<DefaultFormResponse>(
    apiRoutes.form.onwheel,
    body
  );
  return response.data;
};

export const usePostFormOnWheelMutation = (
  opts?: UseMutationOptions<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormOnWheelBody
  >
) =>
  useMutation<
    DefaultFormResponse,
    AxiosError<DefaultFormResponse>,
    FormOnWheelBody
  >(postFormOnWheelFn, opts);
