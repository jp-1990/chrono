import React from "react";
import TestRenderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import MainButton from "./MainButton";

describe("<MainButton />", () => {
  afterEach(cleanup);

  const mockCallback = jest.fn();
  const testProps = { label: "testing", onPress: mockCallback };
  const testRender = TestRenderer.create(<MainButton {...testProps} />);

  it("renders correctly", () => {
    expect(testRender).toMatchSnapshot();
  });

  it("render contains label prop", () => {
    const { getByText } = render(<MainButton {...testProps} />);
    expect(getByText("testing")).toBeTruthy();
  });

  it("uses the onPress prop when it is pressed", () => {
    const { getByText } = render(<MainButton {...testProps} />);
    fireEvent.press(getByText("testing"));
    expect(mockCallback.mock.calls.length).toEqual(1);
    mockCallback.mockClear();
  });

  it("does not use the onPress prop when it is not pressed", () => {
    const { getByText } = render(<MainButton {...testProps} />);
    expect(getByText("testing")).toBeTruthy();
    expect(mockCallback.mock.calls.length).toEqual(0);
    mockCallback.mockClear();
  });
});
