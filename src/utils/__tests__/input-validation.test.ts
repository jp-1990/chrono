import validators from "../input-validation";
const { isDefined, isValidCharLength, isValidDateOrder } = validators;

describe("isDefined", () => {
  it("returns true if no items are undefined or null", () => {
    const result = isDefined(["string", 1, {}, []]);
    expect(result).toBe(true);
  });
  it("returns false if any item is undefined", () => {
    const result = isDefined(["string", 1, {}, [], undefined]);
    expect(result).toBe(false);
  });
  it("returns false if any item is null", () => {
    const result = isDefined(["string", 1, {}, [], null]);
    expect(result).toBe(false);
  });
  it("returns true on valid falsy values (e.g. 0, '')", () => {
    const result = isDefined([0, "", -0]);
    expect(result).toBe(true);
  });
});

describe("isValidCharLengh", () => {
  it("returns true when string <= length", () => {
    const result = isValidCharLength("four", 4);
    expect(result).toBe(true);
  });
  it("returns false when string > length", () => {
    const result = isValidCharLength("four", 3);
    expect(result).toBe(false);
  });
});

describe("isValidDateOrder", () => {
  it("returns false when dateB is sooner than dateA", () => {
    const result = isValidDateOrder(
      new Date("10/10/2020"),
      new Date("10/10/2019")
    );
    expect(result).toBe(false);
  });
  it("returns true when dateA is sooner than dateB", () => {
    const result = isValidDateOrder(
      new Date("10/10/2019"),
      new Date("10/10/2020")
    );
    expect(result).toBe(true);
  });
});
