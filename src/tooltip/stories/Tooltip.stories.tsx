import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import {
  storyTemplate,
  createUnionControl,
} from "../../../.storybook/storybookUtils";
import { Button } from "../../button";
import { Tooltip, TooltipProps } from "../Tooltip";
import { ExclamationTriangleIcon } from "../../icons";

export default {
  title: "Tooltip",
  component: Tooltip,
  argTypes: {
    size: createUnionControl(["xs", "sm", "lg"]),
    variant: createUnionControl(["primary", "danger", "ghost"]),
    placement: createUnionControl(["left", "right", "top", "bottom", "auto"]),
  },
} as Meta<TooltipProps>;

const base = storyTemplate<TooltipProps>(
  args => (
    <div
      className="flex items-center justify-center m-auto"
      style={{
        width: "90vw",
        height: "90vh",
      }}
    >
      <Tooltip {...args}>{args.children}</Tooltip>
    </div>
  ),
  {
    size: "sm",
    variant: "danger",
    title: "Do you know this is a tooltip?",
    placement: "bottom",
  },
);

export const Default = base({
  children: <Button>Tooltip</Button>,
});

export const WithIcon = base({
  children: <Button>Tooltip</Button>,
  icon: <ExclamationTriangleIcon />,
});
