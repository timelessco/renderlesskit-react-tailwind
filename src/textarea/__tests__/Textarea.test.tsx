import React from "react";
import { press, wait } from "reakit-test-utils";
import { render, screen } from "../../utils/testUtils";
import Textarea from "../Textarea";

const getComputedStyleStub: Record<string, any> = {};
function setLayout(
  input: HTMLElement,
  shadow: HTMLElement,
  { getComputedStyle, scrollHeight, lineHeight: lineHeightArg }: any,
) {
  const lineHeight =
    typeof lineHeightArg === "function" ? lineHeightArg : () => lineHeightArg;

  getComputedStyleStub[(input as unknown) as string] = getComputedStyle;

  let index = 0;
  jest.spyOn(shadow, "scrollHeight" as any, "get").mockImplementation(() => {
    index += 1;
    return index % 2 === 1 ? scrollHeight : lineHeight();
  });
}

beforeEach(() => {
  Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
      getPropertyValue: (node: any) => {
        return getComputedStyleStub[node] || {};
      },
    }),
  });
});

beforeEach(() => {
  jest.spyOn(window, "getComputedStyle").mockImplementation(
    // @ts-ignore
    (node: any) => (getComputedStyleStub[node] || {}) as CSSStyleDeclaration,
  );
});

describe("Textarea", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Textarea autoSize />);

    expect(asFragment()).toMatchSnapshot();
  });

  it.skip("should correctly autosize", async () => {
    render(<Textarea autoSize />);

    const shadow = screen.getByTestId("testid-shadow-input");

    setLayout(screen.getByRole("textbox"), shadow, {
      getComputedStyle: {
        "box-sizing": "content-box",
      },
      scrollHeight: 30,
      lineHeight: 15,
    });
    press.Tab();
    expect(screen.getByRole("textbox")).toHaveFocus();
    press.Enter();
    press.Enter();
    console.log(getComputedStyleStub);

    expect(screen.getByRole("textbox")).toHaveStyle({ height: "400px" });
  });
});
