import * as React from "react";
import { cx, Progress as RenderlesskitProgress } from "@renderlesskit/react";

import { BoxProps } from "../box";
import { useTheme } from "../theme";
import { useProgressContext } from "./Progress";
import { forwardRefWithAs } from "../utils/types";

export type ProgressBarProps = BoxProps & {};

export const ProgressBar = forwardRefWithAs<
  ProgressBarProps,
  HTMLDivElement,
  "div"
>((props, ref) => {
  const { className, ...rest } = props;
  const theme = useTheme();
  const { state } = useProgressContext();
  const { percent, isIndeterminate } = state;

  return (
    <RenderlesskitProgress
      ref={ref}
      aria-label="progress"
      style={{ width: `${percent}%` }}
      className={cx(
        theme.progress.bar.base,
        !isIndeterminate
          ? theme.progress.bar.normal
          : theme.progress.bar.indeterminate,
        className,
      )}
      {...rest}
    />
  );
});