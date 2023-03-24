/* eslint-disable camelcase */
import { GET } from 'clients';
import { BOT_TELE_CHANNEL_ID, BOT_TELE_ORDER_TOKEN, ENV } from 'sysconfig';

const url = 'https://api.telegram.org/bot[BOT_API_KEY]/sendMessage?chat_id=[MY_CHANNEL_NAME]&message_thread_id=[MY_THREAD_ID]&text=[MY_MESSAGE_TEXT]';
const urlApiTele = url?.replace('[BOT_API_KEY]', BOT_TELE_ORDER_TOKEN);

const sendMessage = ({ channelID = BOT_TELE_CHANNEL_ID, message, message_thread_id }) =>
  GET({
    url: urlApiTele
      ?.replace('[MY_CHANNEL_NAME]', channelID)
      .replace('[MY_MESSAGE_TEXT]', `[${ENV}] ${message}`)
      .replace('[MY_THREAD_ID]', message_thread_id),
    isAuth: false,
  });

const sendMesageBotOrderKh = ({ message }) => sendMessage({ message, message_thread_id: 4 });
const sendMesageBotOrderTh = ({ message }) => sendMessage({ message, message_thread_id: 32 });
const sendMesageError = ({ message }) => sendMessage({ message, message_thread_id: 43 });
const sendMesageBotOrderVn = ({ message }) => sendMessage({ message, message_thread_id: 3 });

// const findThreadId = async () => {
//   for (let i = 200; i < 300; i += 1) {
//     console.log('🚀 ~ file: BotClient.js:24 ~ findThreadId ~ i:', i);
//     await sendMessage({ message: `threadId : ${i}`, message_thread_id: i });
//   }
// };

export default {
  sendMessage,
  sendMesageBotOrderVn,
  sendMesageError,
  sendMesageBotOrderTh,
  sendMesageBotOrderKh,
  // findThreadId,
};
