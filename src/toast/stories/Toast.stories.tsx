import "./style.css";
import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { useToast, ToastProvider } from "@renderlesskit/react";
import { Button, ButtonGroup } from "../../button";
import { Alert } from "../../alert";

export default {
  title: "Toast",
} as Meta;

const heights: number[] = [];

const DEFAULT_PLACEMENTS: Record<string, React.CSSProperties> = {
  "top-left": {
    position: "fixed",
    top: "10px",
    left: "20px",
  },
  "top-center": {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  "top-right": {
    position: "fixed",
    top: "10px",
    right: "20px",
  },
  "bottom-left": {
    position: "fixed",
    bottom: "calc(var(--safe-area-gap, 0px) + 10px)",
    left: "20px",
  },
  "bottom-center": {
    position: "fixed",
    bottom: "calc(var(--safe-area-gap, 0px) + 10px)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-right": {
    position: "fixed",
    bottom: "calc(var(--safe-area-gap, 0px) + 10px)",
    right: "20px",
  },
};

export const Base = () => {
  return (
    <ToastProvider
      autoDismiss={false}
      placement="bottom-center"
      toastContainer={(props: any) => <ToastContainer {...props} />}
      toastWrapper={(props: any) => <ToastWrapper {...props} />}
      toastTypes={{
        neutral: (props: any) => <ToastAlert status="neutral" {...props} />,
        info: (props: any) => <ToastAlert status="info" {...props} />,
        success: (props: any) => <ToastAlert status="success" {...props} />,
        warning: (props: any) => <ToastAlert status="warning" {...props} />,
        error: (props: any) => <ToastAlert status="error" {...props} />,
      }}
    >
      <ToastTriggers />
    </ToastProvider>
  );
};

const ToastTriggers = () => {
  const { showToast } = useToast();

  return (
    <div className="grid min-h-screen place-items-center">
      <div>
        <div>
          <ButtonGroup>
            <Button onClick={() => showToast({ type: "neutral" })}>
              Show Neutral
            </Button>
            <Button onClick={() => showToast({ type: "info" })}>
              Show Info
            </Button>
            <Button onClick={() => showToast({ type: "success" })}>
              Show Success
            </Button>
            <Button onClick={() => showToast({ type: "warning" })}>
              Show Warning
            </Button>
            <Button onClick={() => showToast({ type: "error" })}>
              Show Error
            </Button>
          </ButtonGroup>
        </div>
        <div className="mt-4">
          <ButtonGroup>
            <Button
              onClick={() =>
                showToast({ type: "warning", placement: "top-left" })
              }
            >
              Top Left Toast
            </Button>
            <Button
              onClick={() =>
                showToast({ type: "info", placement: "top-center" })
              }
            >
              Top Center Toast
            </Button>
            <Button
              onClick={() =>
                showToast({ type: "success", placement: "top-right" })
              }
            >
              Top Right Toast
            </Button>
            <Button
              onClick={() =>
                showToast({ type: "warning", placement: "top-left" })
              }
            >
              Bottom Left Toast
            </Button>
            <Button
              onClick={() =>
                showToast({ type: "info", placement: "bottom-center" })
              }
            >
              Bottom Center Toast
            </Button>
            <Button
              onClick={() =>
                showToast({ type: "success", placement: "bottom-right" })
              }
            >
              Bottom Right Toast
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

const ToastContainer = (props: any) => {
  const { placement } = props;
  return (
    <div className="toast-container" style={DEFAULT_PLACEMENTS[placement]}>
      {props.children}
    </div>
  );
};

const ToastWrapper = (props: any) => {
  const { isVisible } = props;

  return (
    <div
      className="toast-wrapper"
      style={isVisible ? { transform: "translate3d(0, 0, 0)", opacity: 1 } : {}}
    >
      {props.children}
    </div>
  );
};

const ToastAlert = (props: any) => {
  const { index, toastsLength, id, hideToast, status } = props;
  const description =
    status === "neutral"
      ? "Mornings contain the secret to an extraordinarily successful life. Learning is a weightless treasure you can always carry easily."
      : "Look for opportunities in every change in your life.";

  const ref = React.useRef<HTMLDivElement>(null);
  const sortedIndex = toastsLength - index;
  const clampedIndex = sortedIndex > 4 ? 4 : sortedIndex;

  React.useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const height = +(el.getAttribute("data-height") || 0) || el.clientHeight;
    el.dataset.height = "" + height;

    // console.log("%c toastsLength", "color: #bfffc8", toastsLength);
    // console.log("%c index", "color: #997326", index);
    // console.log("%c sortedIndex", "color: #e57373", sortedIndex);
    heights[sortedIndex - 1] = height;

    el.dataset.height = "" + height;
    el.style.setProperty("--height", height + "px");
    el.style.setProperty("--front-height", `${heights[0]}px`);

    if (sortedIndex > 1) {
      const hoverOffsetY = heights
        .slice(0, sortedIndex - 1)
        .reduce((res, next) => (res += next), 0);
      el.style.setProperty("--hover-offset-y", `-${hoverOffsetY}px`);
    } else {
      el.style.removeProperty("--hover-offset-y");
    }
  });

  React.useEffect(() => {
    return () => {
      console.log("%c ref.current", "color: #00ff88", ref.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) return;

      heights.splice(sortedIndex - 1, 1);
      console.log("%c heights", "color: #7f7700", heights);
    };
  }, [sortedIndex]);

  return (
    <div
      className={`toast toast-${clampedIndex}`}
      style={{ "--index": clampedIndex } as React.CSSProperties}
      ref={ref}
    >
      <Alert
        status={status}
        title="Quote Toast"
        description={description}
        closable
        onClose={() => hideToast(id)}
      />
    </div>
  );
};
