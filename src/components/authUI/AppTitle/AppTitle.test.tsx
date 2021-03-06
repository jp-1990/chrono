import React from "react";
import TestRenderer from "react-test-renderer";
import { cleanup, render } from "@testing-library/react-native";

import AppTitle from "./AppTitle";

describe("<AppTitle />", () => {
  afterEach(cleanup);

  const testProps = {
    title1: "title1",
    title2: "title2",
    subtitle: "subtitle",
  };
  const testRender = TestRenderer.create(<AppTitle {...testProps} />);

  it("renders correctly", () => {
    expect(testRender).toMatchSnapshot();
  });

  it("contains title1 prop", () => {
    const { getByText } = render(<AppTitle {...testProps} />);
    expect(getByText("title1")).toBeTruthy();
  });

  it("contains title2 prop", () => {
    const { getByText } = render(<AppTitle {...testProps} />);
    expect(getByText("title2")).toBeTruthy();
  });

  it("contains subtitle prop", () => {
    const { getByText } = render(<AppTitle {...testProps} />);
    expect(getByText("subtitle")).toBeTruthy();
  });
});
