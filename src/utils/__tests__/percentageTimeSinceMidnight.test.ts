import percentageTimeSinceMidnight from "../percentageTimeSinceMidnight";

describe("percentageTimeSinceMidnight function", () => {
  it("returns the expected values", () => {
    const testDate1 = new Date(2020, 0, 0, 0, 0, 0, 0);
    const testDate2 = new Date(2020, 0, 0, 12, 0, 0, 0);
    const testDate3 = new Date(2020, 0, 0, 23, 59, 59, 999);

    const output1 = percentageTimeSinceMidnight(testDate1);
    const output2 = percentageTimeSinceMidnight(testDate2);
    const output3 = percentageTimeSinceMidnight(testDate3);

    expect(output1).toBe(0);
    expect(output2).toBe(50);
    expect(output3).toBe(99.9999988425926);
  });
});
