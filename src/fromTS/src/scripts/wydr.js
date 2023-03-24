/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React from 'react';

// if (process.env.NODE_ENV === 'development') {
if (typeof window !== 'undefined') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  // eslint-disable-next-line import/no-unresolved
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
  });
}
// }
