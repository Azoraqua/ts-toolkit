import { type Optional } from "./optional.d";

export function ofNullable<T>(value: T | undefined): Optional<T> {
  return { value, present: value !== undefined };
}

export function of<T>(value: T): Optional<T> {
  return { value, present: true };
}

export function empty(): Optional<never> {
  return { value: undefined, present: false };
}
