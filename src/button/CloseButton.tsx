import * as React from "react";
import { CloseIcon } from "../icons";
import { forwardRefWithAs } from "../utils/types";
import { Button, ButtonProps } from "./Button";

export type CloseButtonProps = ButtonProps & {};

export const CloseButton = forwardRefWithAs<
  CloseButtonProps,
  HTMLButtonElement,
  "button"
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <Button
      ref={ref}
      aria-label="Close"
      iconOnly={(children as React.ReactElement) || <CloseIcon />}
      {...rest}
    />
  );
});

CloseButton.displayName = "CloseButton";
