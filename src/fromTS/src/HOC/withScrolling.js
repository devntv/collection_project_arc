import React from 'react';

function debounce(func) {
  let timeout;
  return (...args) => {
    const context = this;

    const lastCall = () => {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(lastCall, 100);
  };
}

function getBrowserScrollTop(nameOfClass) {
  if (nameOfClass) {
    if (document.getElementsByClassName(nameOfClass)[0]) {
      return document.getElementsByClassName(nameOfClass)[0].scrollTop;
    }
  }
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

const withScrolling = (TheComponent) =>
  class IsScrollingComponent extends React.Component {
    constructor(props) {
      super(props);
      const { nameOfClass } = this.props;
      const isScrolledToTop = getBrowserScrollTop(nameOfClass) <= 20;
      const isCloseToTop = getBrowserScrollTop(nameOfClass) <= 200;
      this.state = {
        isScrolling: false,
        lastScrollTop: null,
        direction: null,
        isScrolledToBottom: false,
        isScrolledToTop,
        isCloseToTop,
      };

      if (typeof window !== 'undefined') {
        this.DOMElement = window;
      }
    }

    componentDidMount() {
      if (this.DOMElement) {
        this.DOMElement.addEventListener('scroll', this.setScrollOn, true);
      }
    }

    componentWillUnmount() {
      if (this.DOMElement) {
        this.DOMElement.removeEventListener('scroll', this.setScrollOn, true);
      }
    }

    setScrollOn = () => {
      const { isScrolling, lastScrollTop } = this.state;
      const { nameOfClass } = this.props;

      if (!isScrolling) {
        this.setState({
          isScrolling: true,
          lastScrollTop: getBrowserScrollTop(nameOfClass),
        });
      }
      // If the user scrolled to the bottom of the current element
      if (this.userScrolledToBottom(nameOfClass)) {
        this.setState({ isScrolledToBottom: true });
      } else {
        this.setState({ isScrolledToBottom: false });
      }

      if (getBrowserScrollTop(nameOfClass) <= 200) {
        this.setState({ isCloseToTop: true });
      } else {
        this.setState({ isCloseToTop: false });
      }

      if (getBrowserScrollTop(nameOfClass) <= 20) {
        this.setState({ isScrolledToTop: true });
      } else {
        this.setState({ isScrolledToTop: false });
      }

      if (lastScrollTop) {
        this.detectDirection(lastScrollTop, getBrowserScrollTop(nameOfClass));
        this.setState({ lastScrollTop: null });
      }
      this.setScrollOff();
    };

    setScrollOff = debounce(() => {
      const { isScrolling } = this.state;
      if (isScrolling) {
        this.setState({
          isScrolling: false,
          direction: null,
          lastScrollTop: null,
        });
      }
    });

    userScrolledToBottom = (nameOfClass) => {
      if (nameOfClass) {
        if (document.getElementsByClassName(nameOfClass)[0]) {
          return (
            getBrowserScrollTop(nameOfClass) + document.getElementsByClassName(nameOfClass)[0].clientHeight >=
            document.getElementsByClassName(nameOfClass)[0].scrollHeight - 20
          );
        }
      }
      return getBrowserScrollTop() + window.innerHeight >= document.documentElement.scrollHeight - 20;
    };

    detectDirection(lastScrollTop, nextScrollTop) {
      if (lastScrollTop < nextScrollTop) {
        this.setState({ direction: 'down' });
        return;
      }
      this.setState({ direction: 'up' });
    }

    render() {
      const { isScrolling, direction, isScrolledToBottom, isScrolledToTop, isCloseToTop } = this.state;
      return (
        <TheComponent
          {...this.props}
          isScrolling={isScrolling}
          isScrollingDown={direction === 'down'}
          isScrollingUp={direction === 'up'}
          isScrolledToBottom={isScrolledToBottom}
          isScrolledToTop={isScrolledToTop}
          isCloseToTop={isCloseToTop}
        />
      );
    }
  };

export default withScrolling;
