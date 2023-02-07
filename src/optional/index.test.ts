import { empty, of, ofNullable } from "../index";

it("empty()", () => {
  const o = empty();

  expect(o).toHaveProperty("value", undefined);
  expect(o).toHaveProperty("present", false);
});

it("of(1)", () => {
  expect(of(1).value).toEqual(1);
});

it("ofNullable(undefined)", () => {
  expect(ofNullable(undefined).value).toEqual(undefined);
});
