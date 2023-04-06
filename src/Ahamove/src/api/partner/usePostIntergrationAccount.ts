import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultFormResponse } from '../form/types';
import type { FormPartner } from './type';

export type FormCooperateBody = {
  name: string;
  phone: string;
  email: string;
  city: string;
  number_of_order: string;
  note: string;
  g_recaptcha_response: string;
  business_website: string;
  category: string;
};

export const postIntergrationAccountFn = async (body: FormPartner) => {
  const response = await httpClient.post<null>(
    apiRoutes.partner.zendeskTicket,
    body
  );
  return response.data;
};

export const usePostIntergrationAccount = (
  opts?: UseMutationOptions<null, AxiosError<DefaultFormResponse>, FormPartner>
) =>
  useMutation<null, AxiosError<DefaultFormResponse>, FormPartner>(
    postIntergrationAccountFn,
    opts
  );