import React from "react";
import TestRenderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import SignupButton from "./SignupButton";

describe("<SignupButton />", () => {
  afterEach(cleanup);

  const mockCallback = jest.fn();
  const testProps = { onPress: mockCallback };
  const testRender = TestRenderer.create(<SignupButton {...testProps} />);

  it("renders correctly", () => {
    expect(testRender).toMatchSnapshot();
  });

  it("uses the onPress prop when it is pressed", () => {
    const { getByText } = render(<SignupButton {...testProps} />);
    fireEvent.press(getByText("Sign up"));
    expect(mockCallback.mock.calls.length).toEqual(1);
    mockCallback.mockClear();
  });

  it("does not use the onPress prop when it is not pressed", () => {
    const { getByText } = render(<SignupButton {...testProps} />);
    expect(getByText("Sign up")).toBeTruthy();
    expect(mockCallback.mock.calls.length).toEqual(0);
    mockCallback.mockClear();
  });
});
