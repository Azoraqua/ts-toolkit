import { type Supplier } from "./index.d";

export declare interface Stream<T> {
  readonly __data: T[];
}

export declare interface NumberStream extends Stream<number> {
  sum: Supplier<number>;
  average: Supplier<number>;
}

export declare interface BigIntStream extends Stream<bigint> {
  sum: Supplier<bigint>;
  average: Supplier<bigint>;
}
