import { stream } from "../index";

it("stream()", () => {
  expect(stream()).toBeDefined();
});

it("stream(1, 2, 3)", () => {
  expect(stream(1, 2, 3).collect()).toEqual([1, 2, 3]);
});

it("stream(1n, 2n, 3n)", () => {
  expect(stream(1n, 2n, 3n).collect()).toEqual([1n, 2n, 3n]);
});

it("stream('a', 'b', 'c')", () => {
  expect(stream("a", "b", "c").collect()).toEqual(["a", "b", "c"]);
});
