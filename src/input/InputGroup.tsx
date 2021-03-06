import * as React from "react";
import { cx } from "@renderlesskit/react";

import { useTheme } from "../theme";
import { Box, BoxProps } from "../box";
import { AddonTypes } from "./InputAddons";
import { forwardRefWithAs } from "../utils/types";
import { InputProps, ReactFiberNode } from "./Input";
import { createContext, getValidChildren } from "../utils";
import { useSafeLayoutEffect } from "../hooks";

export type InputGroupContext = InputGroupProps;

const [InputGroupProvider, useInputGroup] = createContext<InputGroupContext>({
  strict: false,
  name: "InputGroupContext",
});

export { useInputGroup };

export type InputGroupProps = BoxProps & InputProps & {};

export const InputGroup = forwardRefWithAs<
  InputGroupProps,
  HTMLDivElement,
  "div"
>((props, ref) => {
  const { className, children, ...rest } = props;
  const context = React.useMemo(() => ({}), []);

  const theme = useTheme();
  const inputGroupStyles = cx(theme.input.group.base, className);
  const validChildren = getValidChildren(children);
  const [clones, setClones] = React.useState<ReactFiberNode[]>([]);

  const inputInlineStyles: Record<string, any> = {};

  function calculateBorderRadius(child: ReactFiberNode) {
    if (child.type.id === AddonTypes.InputGroupPrefix) {
      inputInlineStyles.borderTopLeftRadius = 0;
      inputInlineStyles.borderBottomLeftRadius = 0;
    }

    if (child.type.id === AddonTypes.InputGroupSuffix) {
      inputInlineStyles.borderTopRightRadius = 0;
      inputInlineStyles.borderBottomRightRadius = 0;
    }
  }

  function populateClones() {
    setClones(
      validChildren.map((child: any) => {
        return child.type.id === "Input"
          ? React.cloneElement(child, {
              style: inputInlineStyles,
            })
          : child;
      }),
    );
  }

  // if there are no addons, apply the input styles anyways
  // ie: when both elements are addons
  useSafeLayoutEffect(() => {
    const addons = validChildren.filter((child: any) => {
      calculateBorderRadius(child);

      return [AddonTypes.InputPrefix, AddonTypes.InputSuffix].includes(
        child.type.id,
      );
    });

    if (addons.length === 0) {
      populateClones();
    }
  }, [children]);

  return (
    <InputGroupProvider value={context}>
      <Box
        ref={ref}
        role="group"
        aria-label="Input group"
        className={inputGroupStyles}
        {...rest}
      >
        {clones}
      </Box>
    </InputGroupProvider>
  );
});

InputGroup.displayName = "InputGroup";

export default InputGroup;
