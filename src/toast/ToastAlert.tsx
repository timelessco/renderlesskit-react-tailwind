import * as React from "react";
import { cx } from "@renderlesskit/react";

import { BoxProps } from "../box";
import { Button, ButtonProps } from "../button";
import { useTheme } from "../theme";
import { InfoCircleIcon } from "../icons";
import { Toast, ToastOptions } from "./RenderlessToast/ToastTypes";
import { useShowToast, useToasters } from "./RenderlessToast";

export type ToastContentProps = BoxProps & {
  toast: Toast;
  showAlertContent: boolean;
};

export type ToastTypes = "info" | "success" | "warning" | "error";

type ToastAction =
  | string
  | ({
      label: string;
      handleClick?: (toast?: Toast) => void;
    } & ButtonProps);

type ToastAlertProps = {
  title?: string;
  description?: string;
  actions?: ToastAction[];
  type?: ToastTypes;
  toast?: Toast;
  showAlertContent?: boolean;
};

type ToastActionButtonProps = {
  action?: ToastAction;
  type?: ToastTypes;
  toast?: Toast;
} & ButtonProps;

const ToastActionButton: React.FC<ToastActionButtonProps> = ({
  action,
  type = "info",
  toast,
  ...props
}) => {
  const { removeToast } = useToasters();

  if (!action) return null;

  return typeof action === "string" ? (
    <Button {...props} onClick={() => removeToast(toast?.id)}>
      {action}
    </Button>
  ) : (
    <Button {...props} onClick={() => action?.handleClick?.(toast)} {...action}>
      {action?.label}
    </Button>
  );
};

type ButtonVariants = keyof Renderlesskit.GetThemeValue<"button", "variant">;

export const ToastAlert: React.FC<ToastAlertProps> = ({
  type = "info",
  showAlertContent,
  toast,
  title,
  description,
  actions,
}) => {
  const theme = useTheme();

  if (!title) return null;

  return (
    <div role="alert" className={cx(theme.toast.base, theme.toast[type].base)}>
      <div
        className={cx(
          theme.toast.content.base,
          showAlertContent
            ? theme.toast.content.show
            : theme.toast.content.hide,
        )}
      >
        <div className={theme.toast.icon}>
          <InfoCircleIcon />
        </div>
        <div className={theme.toast.body.base}>
          <div className={theme.toast.body.title}>{title}</div>
          {description ? (
            <div
              className={cx(
                theme.toast.body.description,
                theme.toast[type].body.description,
              )}
            >
              {description}
            </div>
          ) : null}
        </div>
        <div className={theme.toast.actions.base}>
          {actions?.map(action => (
            <ToastActionButton
              size="sm"
              className={
                typeof action === "string"
                  ? cx(
                      theme.toast.actions.button.ghost,
                      theme.toast[type].actions.button.ghost,
                    )
                  : cx(
                      theme.toast.actions.button[
                        action.variant as ButtonVariants
                      ],
                      theme.toast[type].actions.button[
                        action.variant as ButtonVariants
                      ],
                    )
              }
              toast={toast}
              action={action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ToastAlert.displayName = "ToastAlert";

export const useToastType = () => {
  const showToast = useShowToast();

  return React.useCallback(
    (alertProps: ToastAlertProps, options?: ToastOptions) => {
      const toastId = showToast(
        toastOptions => <ToastAlert {...toastOptions} {...alertProps} />,
        options,
      );

      return toastId;
    },
    [showToast],
  );
};
