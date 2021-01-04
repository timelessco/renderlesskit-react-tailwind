import * as React from "react";
import { cx } from "@renderlesskit/react";
import { VisuallyHidden } from "reakit";

import theme from "../theme";
import { Box, BoxProps } from "../box";

import { forwardRefWithAs, PropsWithAs } from "../utils/types";

export interface SpinnerProps extends BoxProps {
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string;
  /**
   * How large should the button be?
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * How the spinner should be displayed?
   */
  stroke?: "transparent" | "visible";
}

function SpinnerComponent(
  props: PropsWithAs<SpinnerProps, "div">,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    label = "Loading...",
    size = "md",
    stroke = "transparent",
    className,
    ...rest
  } = props;
  const spinnerStyles = cx(
    theme.spinner.base,
    theme.spinner.size[size],
    theme.spinner.stroke[stroke],
    className,
  );

  return (
    <Box ref={ref} className={spinnerStyles} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Box>
  );
}

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 */
export const Spinner = forwardRefWithAs<SpinnerProps, "div">(SpinnerComponent);
