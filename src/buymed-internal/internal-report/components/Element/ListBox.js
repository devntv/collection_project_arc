import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";


const ListBox = forwardRef(
  function ListBoxBase (props,ref) {
    const { children, ...rest } = props;

    const innerRef = useRef(null);

    useImperativeHandle(ref, () => innerRef.current);

    return (
      <ul
        {...rest}
        ref={innerRef}
        role="list-box"
      >
        {children}
      </ul>
    );
  },
);

export default ListBox;