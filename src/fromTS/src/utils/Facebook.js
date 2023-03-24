import Script from 'next/script';

import { useEffect } from 'react';

import { cleanup, init } from './fb';

export default function Facebook() {
  useEffect(() => {
    init();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
      <div id="fb-root" />

      <div id="fb-customer-chat" className="fb-customerchat" />

      {/* https://nextjs.org/docs/basic-features/script */}

      <Script id="facebook-jssdk" src="https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js" strategy="lazyOnload" />
    </div>
  );
}
