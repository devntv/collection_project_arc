import { sendTelegramMessageFn } from '@/api/telegram/sendTelegramMessageFn';

export const sendTelegramMessage = async (bodyMessage: string) => {
  try {
    await sendTelegramMessageFn(bodyMessage);
  } catch (error) {
    console.log(bodyMessage);
    console.log('sendTelegramMessage error', error);
  }
};
