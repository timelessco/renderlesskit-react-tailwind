import * as React from "react";

import { useSliderDimensions } from "../hooks/useSliderDimensions";
import { render, screen } from "../../utils/testUtils";

beforeEach(() => {
  jest
    .spyOn(window.HTMLDivElement.prototype, "getBoundingClientRect")
    .mockImplementation(() => ({
      width: 100,
      height: 100,
      bottom: 50,
      top: 50,
      left: 50,
      right: 50,
      x: 200,
      y: 200,
      toJSON() {},
    }));
});

const Test = () => {
  const { padding, thumbRef, thumbSize, trackRef } = useSliderDimensions();
  return (
    <>
      <div data-testid="testid-result">
        {padding} {thumbSize.current.width} {thumbSize.current.height}
      </div>
      <div ref={thumbRef}></div>
      <div ref={trackRef}></div>
    </>
  );
};

describe("useSliderDimensions", () => {
  test("should return proper values", () => {
    // TODO properly mock
    render(<Test />);

    expect(screen.getByTestId("testid-result")).toHaveTextContent("0 0 0");
  });
});
