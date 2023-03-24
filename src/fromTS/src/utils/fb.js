/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/**
 *
 * @param {*} noInsertScript
 */

import { FACEBOOK_MESSENGER_ID } from 'sysconfig';

export function init() {
  const chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute('page_id', FACEBOOK_MESSENGER_ID); // TODO: move to args
  chatbox.setAttribute('attribution', 'biz_inbox');

  window.fbAsyncInit = function () {
    if (FB)
      FB.init({
        xfbml: true,
        version: 'v14.0',
      });
  };

  (function (d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

/**
 *
 */
export function cleanup() {
  (function (d, id) {
    const target = d.getElementById(id);
    if (target) {
      target.parentNode.removeChild(target);
    }
  })(document, 'facebook-jssdk');

  delete window.FB;
}
