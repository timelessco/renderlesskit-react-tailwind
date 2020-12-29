import * as React from "react";
import { Role, RoleProps } from "reakit";

import {
  BoltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "../icons";
import theme from "../theme";
import { Button, ButtonProps } from "../button";
import { createContext, ocx } from "../utils";

import { forwardRefWithAs, PropsWithAs } from "../utils/types";

const STATUSICONS = {
  info: InfoCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
  offline: BoltIcon,
};

export type AlertStatus = "success" | "warning" | "error" | "info" | "offline";

type AlertContext = {
  status: AlertStatus;
};

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`",
});

export type AlertProps = RoleProps & {
  /**
   * The status of the alert
   */
  status?: AlertStatus;
};

function AlertComponent(
  props: PropsWithAs<AlertProps, "div">,
  ref: React.Ref<HTMLDivElement>,
) {
  const { status = "info", className, ...rest } = props;
  const alertStyles = ocx(
    theme.alert.base,
    theme.alert.status[status].base,
    className,
  );

  return (
    <AlertProvider value={{ status }}>
      <Role role="alert" className={alertStyles} ref={ref} {...rest} />
    </AlertProvider>
  );
}

export const Alert = forwardRefWithAs<AlertProps, "div">(AlertComponent);

export type AlertTitleProps = RoleProps & {};

function AlertTitleComponent(
  props: PropsWithAs<AlertTitleProps, "div">,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  const alertTitleStyles = ocx(theme.alert.title, className);

  return <Role className={alertTitleStyles} ref={ref} {...rest} />;
}

export const AlertTitle = forwardRefWithAs<AlertTitleProps, "div">(
  AlertTitleComponent,
);

export type AlertDescriptionProps = RoleProps & {};

function AlertDescriptionComponent(
  props: PropsWithAs<AlertDescriptionProps, "div">,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  const alertDescriptionStyles = ocx(theme.alert.description, className);

  return <Role className={alertDescriptionStyles} ref={ref} {...rest} />;
}

export const AlertDescription = forwardRefWithAs<AlertDescriptionProps, "div">(
  AlertDescriptionComponent,
);

export type AlertActionButtonProps = ButtonProps & {};

function AlertActionButtonComponent(
  props: PropsWithAs<AlertActionButtonProps, "button">,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { status } = useAlertContext();
  const { className, ...rest } = props;
  const alertActionButtonStyles = ocx(
    theme.alert.actionButton,
    theme.alert.status[status].actionButton,
    className,
  );

  return <Button className={alertActionButtonStyles} ref={ref} {...rest} />;
}

export const AlertActionButton = forwardRefWithAs<
  AlertActionButtonProps,
  "button"
>(AlertActionButtonComponent);

export type AlertIconProps = RoleProps & {};

function AlertIconComponent(
  props: PropsWithAs<AlertIconProps, "span">,
  ref: React.Ref<HTMLSpanElement>,
) {
  const { status } = useAlertContext();
  const { className, ...rest } = props;
  const Icon = STATUSICONS[status];
  const alertIconBaseStyles = ocx(theme.alert.icon.base, className);
  const alertIconIconsStyles = ocx(
    theme.alert.icon.base,
    theme.alert.status[status].icon,
    className,
  );

  return (
    <Role as="span" className={alertIconBaseStyles} ref={ref} {...rest}>
      <Icon className={alertIconIconsStyles} />
    </Role>
  );
}

export const AlertIcon = forwardRefWithAs<AlertIconProps, "span">(
  AlertIconComponent,
);