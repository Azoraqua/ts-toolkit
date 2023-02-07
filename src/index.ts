export declare type Function<T, U> = (input: T) => U;
export declare type Predicate<T> = (input: T) => boolean;
export declare type Consumer<T> = (input: T) => void;
export declare type Supplier<T> = () => T;

export {
  stream,
  type Stream,
  type NumberStream,
  type BigIntStream,
} from "./stream";

export { empty, of, ofNullable, type Optional } from "./optional";
