import React from "react";
import { Meta } from "@storybook/react";

import {
  createUnionControl,
  storyTemplate,
} from "../../../.storybook/storybookUtils";

import { Slider, SliderProps } from "../Slider";
import { SliderThumbHandle } from "../../icons/SliderThumbHandle";
import { SliderTrack } from "../SliderTrack";
import { SliderThumb } from "../SliderThumb";

export default {
  title: "Slider",
  component: Slider,
  argTypes: {
    size: createUnionControl(["xs", "sm", "lg"]),
    currentColor: { defaultValue: "" },
  },
} as Meta;

const base = storyTemplate<SliderProps>(args => {
  return (
    <div role="group" aria-labelledby="styled-slider" style={{ width: 200 }}>
      <Slider {...args} />
    </div>
  );
}, {});

export const Default = base({ size: "sm" });
export const Origin = base({ origin: 50 });
export const Range = base({ defaultValues: [30, 70] });

export const ThumbContent = base({
  thumbContent: v => <small className="text-xxs">{v[0]}</small>,
});

export const ThumbIcon = base({
  thumbContent: <SliderThumbHandle />,
});

export const Reversed = base({ reversed: true });

export const Vertical = () => {
  return (
    <div role="group" aria-labelledby="styled-slider" style={{ height: 200 }}>
      <Slider size="lg" orientation="vertical" origin={0} />
    </div>
  );
};

export const Customization = () => {
  return (
    <div role="group" aria-labelledby="styled-slider" style={{ width: 400 }}>
      <Slider size="xs">
        {({ state, trackRef, thumbRef }) => (
          <>
            <span>
              {state.isThumbDragging(0) ? "Dragging" : "Not dragging"}
            </span>
            <SliderTrack ref={trackRef}>
              <SliderThumb ref={thumbRef} />
            </SliderTrack>
          </>
        )}
      </Slider>
    </div>
  );
};

export const LableDesign = storyTemplate<
  SliderProps & { currentColor: string }
>(args => {
  const [value, setValue] = React.useState(50);

  return (
    <div role="group" aria-labelledby="price" style={{ width: 400 }}>
      <div className="flex justify-between pb-2">
        <label>Price (${value})</label>
        <span className={args.currentColor}>0$ - 100$</span>
      </div>
      <Slider
        {...args}
        className={args.currentColor}
        onChange={v => setValue(v[0])}
        values={[value]}
        min={0}
        max={100}
      />
    </div>
  );
})({ currentColor: "text-blue-500", size: "sm" });
