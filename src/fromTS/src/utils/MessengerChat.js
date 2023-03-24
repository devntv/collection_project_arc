/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FACEBOOK_MESSENGER_ID } from 'sysconfig';

/**
 * Utils
 */
const removeElementByIds = (ids) => {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
};

/**
 * Messenger Chat Plugin
 */
class MessengerChat extends Component {
  static propTypes = {
    // appId:                    PropTypes.string.isRequired,
    shouldShowDialog: PropTypes.bool,
    htmlRef: PropTypes.string,
    minimized: PropTypes.bool,
    themeColor: PropTypes.string,
    loggedInGreeting: PropTypes.string,
    loggedOutGreeting: PropTypes.string,
    greetingDialogDisplay: PropTypes.oneOf(['show', 'hide', 'fade']),
    greetingDialogDelay: PropTypes.number,
    autoLogAppEvents: PropTypes.bool,
    xfbml: PropTypes.bool,
    version: PropTypes.string,
    // language:                 PropTypes.string,
    onCustomerChatDialogShow: PropTypes.func,
    onCustomerChatDialogHide: PropTypes.func,
  };

  static defaultProps = {
    shouldShowDialog: false,
    htmlRef: undefined,
    minimized: true,
    themeColor: undefined,
    loggedInGreeting: undefined,
    loggedOutGreeting: undefined,
    greetingDialogDisplay: 'hide',
    greetingDialogDelay: undefined,
    autoLogAppEvents: true,
    xfbml: true,
    version: '4.0',
    onCustomerChatDialogShow: undefined,
    onCustomerChatDialogHide: undefined,
  };

  constructor(props) {
    super(props);

    this.setFbAsyncInit = this.setFbAsyncInit.bind(this);
    this.reloadSDKAsynchronously = this.reloadSDKAsynchronously.bind(this);
    this.loadSDKAsynchronously = this.loadSDKAsynchronously.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.controlPlugin = this.controlPlugin.bind(this);
    this.subscribeEvents = this.subscribeEvents.bind(this);
    this.removeFacebookSDK = this.removeFacebookSDK.bind(this);

    this.state = {
      fbLoaded: false,
      shouldShowDialog: undefined,
    };
  }

  componentDidMount() {
    this.setFbAsyncInit();
    this.reloadSDKAsynchronously();
  }

  componentDidUpdate(prevProps) {
    if (
      // prevProps.appId !== this.props.appId ||
      prevProps.shouldShowDialog !== this.props.shouldShowDialog ||
      prevProps.htmlRef !== this.props.htmlRef ||
      prevProps.minimized !== this.props.minimized ||
      prevProps.themeColor !== this.props.themeColor ||
      prevProps.loggedInGreeting !== this.props.loggedInGreeting ||
      prevProps.loggedOutGreeting !== this.props.loggedOutGreeting ||
      prevProps.greetingDialogDisplay !== this.props.greetingDialogDisplay ||
      prevProps.greetingDialogDelay !== this.props.greetingDialogDelay ||
      prevProps.autoLogAppEvents !== this.props.autoLogAppEvents ||
      prevProps.xfbml !== this.props.xfbml ||
      prevProps.version !== this.props.version ||
      prevProps.language !== this.props.language
    ) {
      this.setFbAsyncInit();
      this.reloadSDKAsynchronously();
    }
  }

  setFbAsyncInit() {
    const { autoLogAppEvents, xfbml, version } = this.props;

    window.fbAsyncInit = () => {
      window.FB.init({
        // appId,
        autoLogAppEvents,
        xfbml,
        version: `v${version}`,
      });

      this.setState({ fbLoaded: true });
    };
  }

  loadSDKAsynchronously() {
    // const { language } = this.props
    /* eslint-disable */
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    /* eslint-enable */
  }

  // eslint-disable-next-line class-methods-use-this
  removeFacebookSDK() {
    removeElementByIds(['facebook-jssdk', 'fb-root']);
    delete window.FB;
  }

  reloadSDKAsynchronously() {
    this.removeFacebookSDK();
    this.loadSDKAsynchronously();
  }

  controlPlugin() {
    const { shouldShowDialog } = this.props;

    if (shouldShowDialog) {
      window.FB.CustomerChat.showDialog();
    } else {
      window.FB.CustomerChat.hideDialog();
    }
  }

  subscribeEvents() {
    const { onCustomerChatDialogShow, onCustomerChatDialogHide } = this.props;

    if (onCustomerChatDialogShow) {
      window.FB.Event.subscribe('customerchat.dialogShow', onCustomerChatDialogShow);
    }

    if (onCustomerChatDialogHide) {
      window.FB.Event.subscribe('customerchat.dialogHide', onCustomerChatDialogHide);
    }
  }

  createMarkup() {
    const { htmlRef, minimized, themeColor, loggedInGreeting, loggedOutGreeting, greetingDialogDisplay, greetingDialogDelay } = this.props;

    const refAttribute = htmlRef !== undefined ? `ref="${htmlRef}"` : '';

    const minimizedAttribute = minimized !== undefined ? `minimized="${minimized}"` : '';

    const themeColorAttribute = themeColor !== undefined ? `theme_color="${themeColor}"` : '';

    const loggedInGreetingAttribute = loggedInGreeting !== undefined ? `logged_in_greeting="${loggedInGreeting}"` : '';

    const loggedOutGreetingAttribute = loggedOutGreeting !== undefined ? `logged_out_greeting="${loggedOutGreeting}"` : '';

    const greetingDialogDisplayAttribute = greetingDialogDisplay !== undefined ? `greeting_dialog_display="${greetingDialogDisplay}"` : '';

    const greetingDialogDelayAttribute = greetingDialogDelay !== undefined ? `greeting_dialog_delay="${greetingDialogDelay}"` : '';

    return {
      __html: `<div
             class="fb-customerchat"
             page_id="${FACEBOOK_MESSENGER_ID}"
             ${refAttribute}
             ${minimizedAttribute}
             ${themeColorAttribute}
             ${loggedInGreetingAttribute}
             ${loggedOutGreetingAttribute}
             ${greetingDialogDisplayAttribute}
             ${greetingDialogDelayAttribute}
           ></div>`,
    };
  }

  render() {
    const { fbLoaded, shouldShowDialog } = this.state;
    const { shouldShowDialogProps } = this.props;

    if (fbLoaded && shouldShowDialog !== shouldShowDialogProps) {
      document.addEventListener(
        'DOMNodeInserted',
        (event) => {
          const element = event.target;
          if (element.className && typeof element.className === 'string' && element.className.includes('fb_dialog')) {
            this.controlPlugin();
          }
        },
        false,
      );
      this.subscribeEvents();
    }
    // Add a random key to rerender. Reference:
    // https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render
    // eslint-disable-next-line react/no-danger
    return <div key={Date()} dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

export default MessengerChat;
