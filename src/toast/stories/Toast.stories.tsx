import "./style.css";
import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { storyTemplate } from "../../../.storybook/storybookUtils";
import { useToast, ToastController } from "@renderlesskit/react";
import { ToastProvider } from "../Toast";
import { Button } from "../../button";

export default {
  title: "Toast",
  component: ToastController,
} as Meta;

const ToastTriggers = () => {
  const { showToast, toasts, removeToast } = useToast();

  return (
    <>
      <button
        onClick={() => {
          Object.values(toasts).forEach(e => {
            removeToast(e.id);
          });
        }}
      >
        Remove all
      </button>
      <Button
        variant="primary"
        onClick={() => {
          showToast({
            placement: "bottom-center",
            type: "success",
            content: `Figma saves your work ${Math.random().toFixed(2)}`,
          });
        }}
      >
        Show toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          showToast({
            type: "error",
            content: `${Math.random().toFixed(2)} emails archived`,
            placement: "bottom-right",
          });
        }}
      >
        Show toast
      </Button>
    </>
  );
};

const base = storyTemplate<any>(
  args => (
    <ToastProvider {...args}>
      <ToastTriggers />
    </ToastProvider>
  ),
  {},
);

export const Default = base({});
