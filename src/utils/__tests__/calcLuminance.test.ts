import calcLuminance from "../calcLuminance";

describe("luminance", () => {
  it("returns the expected value", () => {
    const red = "rgb(255,0,0)";
    const green = "rgb(0,255,0)";
    const blue = "rgb(0,0,255)";

    const calcRed = calcLuminance(red);
    const calcGreen = calcLuminance(green);
    const calcBlue = calcLuminance(blue);

    expect(calcRed).toBe(0.299);
    expect(calcGreen).toBe(0.587);
    expect(calcBlue).toBe(0.114);
  });
});
