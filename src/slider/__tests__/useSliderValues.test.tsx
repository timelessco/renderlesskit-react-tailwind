/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { useSliderValues } from "../hooks/useSliderValues";
import { SliderStateProvider } from "../Slider";
import { SliderInitialState, useSliderState } from "@renderlesskit/react";

const createWrapper =
  (props?: SliderInitialState) =>
  ({ children }: { children: any }) => {
    const state = useSliderState(props);
    return <SliderStateProvider value={state}>{children}</SliderStateProvider>;
  };

describe("useSliderValues", () => {
  test("useSliderValues should return proper values", () => {
    const { result } = renderHook(
      () => useSliderValues({ orientation: "horizontal", origin: 0 }),
      { wrapper: createWrapper() },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        isVertical: false,
        isRange: false,
        isMulti: false,
        isReversed: false,
        trackWidth: "50%",
        trackLeft: "0%",
        trackRight: "0px",
      }),
    );
  });
  test("isReverse should be inferred via the useSliderState", () => {
    const { result } = renderHook(
      () => useSliderValues({ orientation: "horizontal", origin: 0 }),
      { wrapper: createWrapper({ reversed: true }) },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        isReversed: true,
      }),
    );
  });
  test("isVertical", () => {
    const { result } = renderHook(
      () => useSliderValues({ orientation: "vertical", origin: 0 }),
      { wrapper: createWrapper() },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        isVertical: true,
      }),
    );
  });
  test("multiple values", () => {
    const { result } = renderHook(
      () => useSliderValues({ orientation: "horizontal" }),
      { wrapper: createWrapper({ defaultValues: [10, 20, 30] }) },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        isMulti: true,
        isRange: false,
      }),
    );
  });
  test("isRange", () => {
    const { result } = renderHook(
      () => useSliderValues({ orientation: "horizontal" }),
      { wrapper: createWrapper({ defaultValues: [10, 20] }) },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        isMulti: false,
        isRange: true,
      }),
    );
  });
});
