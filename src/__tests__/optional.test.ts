import { empty, of, ofNullable } from "../index";

it("empty()", () => {
  const o = empty();

  expect(o).toHaveProperty("value", undefined);
  expect(o).toHaveProperty("present", false);
});

// it("of(1, 2, 3)", () => {
//   expect(stream(1, 2, 3).collect()).toEqual([1, 2, 3]);
// });

// it("ofNullable(undefined)", () => {
//   expect(stream(1n, 2n, 3n).collect()).toEqual([1n, 2n, 3n]);
// });
