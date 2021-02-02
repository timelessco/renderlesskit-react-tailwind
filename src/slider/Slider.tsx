import React from "react";
import {
  cx,
  useSliderState,
  SliderStateReturn,
  SliderInitialState,
} from "@renderlesskit/react";

import { useTheme } from "..";
import { createContext, runIfFn } from "../utils";
import { SliderTrack } from "./SliderTrack";
import { SliderThumb } from "./SliderThumb";

const percent = (v: number) => `${v}%`;

const [
  SliderStateProvider,
  useSliderContext,
] = createContext<SliderStateReturn>({
  name: "SliderState",
  strict: true,
});

export { useSliderContext };

export const useSliderValues = (props: SliderProps) => {
  const state = useSliderContext();
  const origin = props.origin || 0;
  const { values, getValuePercent, getThumbPercent } = state;

  const isVertical = props.orientation === "vertical";
  const isRange = values.length === 2;
  const isMulti = values.length > 2;
  const isReversed = state.reversed;

  const trackWidth = !isRange
    ? (getValuePercent(Math.max(values[0], origin)) -
        getValuePercent(Math.min(values[0], origin))) *
      100
    : (getThumbPercent(1) - getThumbPercent(0)) * 100;

  const trackLeft = !isRange
    ? getValuePercent(Math.min(values[0], origin)) * 100
    : getThumbPercent(0) * 100;

  const trackRight = !isRange ? "0px" : percent(getThumbPercent(0) * 100);

  return {
    isVertical,
    isRange,
    isMulti,
    isReversed,
    trackWidth: percent(trackWidth),
    trackLeft: percent(trackLeft),
    trackRight,
    getValuePercent,
    getThumbPercent,
    state,
  };
};

export type SliderProps = SliderInitialState & { origin?: number };
type SliderRenderProps = {
  children?:
    | (({ state }: { state: SliderStateReturn }) => JSX.Element)
    | React.ReactNode;
};

export const Slider: React.FC<SliderProps & SliderRenderProps> = ({
  orientation = "horizontal",
  children,
  origin,
  ...props
}) => {
  const theme = useTheme();
  const state = useSliderState({ ...props, orientation });

  return (
    <SliderStateProvider value={state}>
      {children ? (
        runIfFn(children, { state })
      ) : (
        <div
          className={cx(
            theme.slider.common.wrapper.base,
            theme.slider[orientation].wrapper.base,
          )}
        >
          <SliderTrack origin={origin} orientation={orientation} />
          <SliderThumb origin={origin} orientation={orientation} />
        </div>
      )}
    </SliderStateProvider>
  );
};