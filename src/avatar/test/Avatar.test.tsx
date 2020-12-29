import * as React from "react";
import { Avatar, AvatarBadge } from "../Avatar";
import { render } from "@testing-library/react";
import { testA11y } from "../../utils/testUtils";

describe("<Avatar />", () => {
  expect.assertions(1);

  it("should render Avatar", () => {
    const { asFragment } = render(<Avatar />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with AvatarBadge", () => {
    const { asFragment } = render(
      <Avatar>
        <AvatarBadge>*</AvatarBadge>
      </Avatar>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with AvatarBadge & children", () => {
    const { asFragment } = render(
      <Avatar>
        <p>Some Child Element</p>
        <AvatarBadge>*</AvatarBadge>
      </Avatar>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a name avatar if no src", () => {
    const name = "Dan Abramov";
    const { getByLabelText } = render(<Avatar name="Dan Abramov" />);

    const content = getByLabelText(name);
    expect(content).toHaveTextContent("DA");
  });

  it("renders a custom fallback if src & name both are not provided", () => {
    const fallbackContent = "I'm a fallback";
    const { getByLabelText } = render(
      <Avatar fallback={<div aria-label="fallback">{fallbackContent}</div>} />,
    );

    expect(getByLabelText("fallback")).toHaveTextContent(fallbackContent);
  });

  it("prioritize name between fallback & name", () => {
    const fallbackContent = "I'm a fallback";
    const name = "Anurag Hazra";
    const { queryByLabelText } = render(
      <Avatar
        name={name}
        fallback={<div aria-label="fallback">{fallbackContent}</div>}
      />,
    );

    const content = queryByLabelText(name);
    expect(content).toHaveTextContent("AH");
    expect(queryByLabelText("fallback")).not.toBeInTheDocument();
  });

  // TODO: Test Image load
  test.skip("Avatar onError", async () => {
    const onErrorFn = jest.fn();
    render(<Avatar src="https://somesite.com" onError={onErrorFn}></Avatar>);
    expect(onErrorFn).toBeCalledTimes(1);
  });

  it("should not have a11y violations", async () => {
    await testA11y(<Avatar>Ally</Avatar>);
  });
});