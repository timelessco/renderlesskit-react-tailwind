import React from "react";
import {
  cx,
  useSliderState,
  SliderStateReturn,
  SliderInitialState,
} from "@renderlesskit/react";

import { useTheme } from "../index";
import { Box, BoxProps } from "../box";
import { SliderTrack } from "./SliderTrack";
import { SliderThumb } from "./SliderThumb";
import { SliderMinMax } from "./SliderMinMax";
import { useFormControl } from "../form-field";
import { createContext, runIfFn } from "../utils";
import { forwardRefWithAs, RenderProp } from "../utils/types";
import { useSliderDimensions } from "./hooks/useSliderDimensions";

const [SliderStateProvider, useSliderContext] = createContext<
  SliderStateReturn & { isReadOnly?: boolean }
>({
  name: "SliderState",
  strict: false,
});

export { SliderStateProvider };

const [SliderPropsContext, useSliderPropsContext] = createContext<
  Pick<SliderProps, "orientation" | "size" | "origin" | "showMinMax"> & {
    thumbSize: React.MutableRefObject<{
      width: number;
      height: number;
    }>;
  } & { padding: number }
>({
  name: "SliderProps",
  strict: false,
});

export { useSliderContext, useSliderPropsContext };

export type SliderProps = Omit<BoxProps, "onChange"> & {
  isReadOnly?: boolean;
} & SliderInitialState & {
    origin?: number;
    thumbContent?: React.ReactNode | ((value: number[]) => JSX.Element);
    size?: keyof Renderlesskit.GetThemeValue<
      "slider",
      "common"
    >["thumb"]["size"];
    showMinMax?: boolean;
  };

type SliderRenderProps = RenderProp<{
  state: SliderStateReturn;
  trackRef: React.RefObject<HTMLDivElement>;
  thumbRef: React.RefObject<HTMLDivElement>;
}>;

export const Slider = forwardRefWithAs<
  SliderProps & SliderRenderProps,
  HTMLDivElement,
  "div"
>((props, ref) => {
  const {
    orientation = "horizontal",
    thumbContent,
    children,
    origin,
    size = "md",
    className,
    values,
    min,
    max,
    step,
    isDisabled,
    reversed,
    onChange,
    onChangeEnd,
    onChangeStart,
    formatOptions,
    defaultValues,
    showMinMax,
    isReadOnly,
    ...rest
  } = props;

  const theme = useTheme();

  const { readOnly: fieldReadOnly, disabled: fieldDisabled } = useFormControl({
    isReadOnly,
    isDisabled,
  });
  const state = useSliderState({
    ...props,
    orientation,
    isDisabled: fieldReadOnly || fieldDisabled,
  });
  const { thumbSize, padding, thumbRef, trackRef } = useSliderDimensions();

  const sliderWrapperStyles = cx(
    theme.slider.common.wrapper.base,
    theme.slider[orientation].wrapper.base,
    className,
  );

  const contextProps = React.useMemo(
    () => ({ size, orientation, origin, thumbSize, padding, showMinMax }),
    [size, orientation, origin, thumbSize, padding, showMinMax],
  );

  return (
    <SliderPropsContext value={contextProps}>
      <SliderStateProvider value={state}>
        <Box ref={ref} className={sliderWrapperStyles} {...rest}>
          {children ? (
            runIfFn(children, { state, trackRef, thumbRef, showMinMax })
          ) : (
            <>
              <SliderTrack ref={trackRef}>
                <SliderThumb ref={thumbRef}>
                  {thumbContent
                    ? runIfFn(thumbContent, state.values)
                    : thumbContent}
                </SliderThumb>
              </SliderTrack>
              {showMinMax ? <SliderMinMax /> : null}
            </>
          )}
        </Box>
      </SliderStateProvider>
    </SliderPropsContext>
  );
});

Slider.displayName = "Slider";
