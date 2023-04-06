import { loadJS } from './common';

declare global {
  interface Window {
    grecaptcha: {
      ready: (params: () => void) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      execute: any;
    };
  }
}

const useGoogleRecaptcha = () => {
  const loadGoogleReCaptchaScript = () => {
    const src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPCHA_SITE_KEY}`;

    if (window.grecaptcha === undefined) {
      loadJS(src).then(() => {
        console.log('Google recaptcha script loaded!');
      });
    }
  };

  const submitCaptcha = () => {
    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPCHA_SITE_KEY, {
            action: 'submit',
          })
          .then((token: string) => {
            resolve(token);
          })
          .catch((err: Error) => reject(err));
      });
    });
  };

  return {
    loadGoogleReCaptchaScript,
    submitCaptcha,
  };
};

export default useGoogleRecaptcha;