import "../../../dist/tailwind.css";
import * as React from "react";
import { Button } from "../Button";

import { cleanup, screen } from "@testing-library/react";
import { render, testA11y } from "../../utils/testUtils";
import { generateImage } from "jsdom-screenshot";

jest.setTimeout(10000);

afterEach(cleanup);

describe("Testing Button", () => {
  it("has no visual regressions", async () => {
    render(<Button>Hello World</Button>);

    const screenshot = await generateImage();
    expect(screenshot).toMatchImageSnapshot();
  });

  it("should render properly", () => {
    render(<Button>Hello World</Button>);

    expect(screen.getByRole("button")).toHaveTextContent(/hello world/i);
  });

  it("should not have axe violations", async () => {
    testA11y(<Button>Ally</Button>);
  });
});
