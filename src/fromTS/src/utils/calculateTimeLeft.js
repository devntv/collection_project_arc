export default function calculateTimeLeft(time) {
  const remainingTime = +new Date(time) - +new Date();
  let timeLeft = {};
  if (remainingTime > 0) {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0');
    const minutes = `:${Math.floor((remainingTime / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0')}:`;
    const seconds = Math.floor((remainingTime / 1000) % 60)
      .toString()
      .padStart(2, '0');
    timeLeft = {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return timeLeft;
}
const ONE_DAY = 86400000;
export const remainTime = (time1, time2) => (time1 - time2) / ONE_DAY;

export function calculateTimeLeftWithoutColon(time) {
  const remainingTime = +new Date(time) - +new Date();
  let timeLeft = {};
  if (remainingTime > 0) {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((remainingTime / 1000) % 60)
      .toString()
      .padStart(2, '0');
    timeLeft = {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return timeLeft;
}
