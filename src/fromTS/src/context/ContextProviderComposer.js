/* eslint-disable no-shadow */
import React from 'react';

const ContextProviderComposer = ({ contextProviders, children }) =>
  contextProviders.reduceRight((children, parent) => React.cloneElement(parent, { children }), children);

export default ContextProviderComposer;
