// CopyButon.tsx

import React, { useState, useEffect } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

export type CopyButtonProps = {
  checkIcon?: React.ReactNode;
  copyIcon?: React.ReactNode;
  textToCopy: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  copyIcon = <CopyIcon />,
  checkIcon = <CheckIcon />,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy to clipboard", err);
    }
  };

  return (
    <button type="button" aria-label="Copy" onClick={copy} {...props}>
      {isCopied ? checkIcon : copyIcon}
    </button>
  );
};
