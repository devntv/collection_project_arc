import apiRoutes from '@/lib/apiRoutes';
import { TELEGRAM_DEPLOY_CHAT_ID } from '@/lib/constants';
import httpClient from '@/lib/httpClient';

export const sendTelegramMessageFn = async (text: string) => {
  const response = await httpClient.get(
    process.env.NEXT_PUBLIC_TELEGRAM_API_URI + apiRoutes.telegram.sendMessage,
    {
      params: {
        chat_id: TELEGRAM_DEPLOY_CHAT_ID,
        text,
        html: 'Markdown',
      },
    }
  );
  return response.data;
};