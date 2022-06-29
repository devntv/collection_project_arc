import React from "react";

export function useCoppyClipboard({ time = 700 } = {}) {
  const [isError, setIsError] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [copyDelay, setCopyDelay] = React.useState(null);

  const handleClickCopyClipboard = (vl) => {
    clearTimeout(copyDelay);
    setCopyDelay(setTimeout(() => setCopied(false), time));
    setCopied(vl);
  };

  const copyRes = (vl) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(vl)
        .then(() => handleClickCopyClipboard(true))
        .catch((err) => setIsError(err));
    } else setIsError(new Error("Error: your device is not supported"));
  };

  const resetRes = () => {
    setIsError(null);
    setCopied(false);
    clearTimeout(copyDelay);
  };
  return { copyRes, resetRes, isError, copied };
}
