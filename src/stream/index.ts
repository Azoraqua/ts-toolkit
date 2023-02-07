import {
  type Consumer,
  type Predicate,
  type Function,
  type Supplier,
  type Optional,
  ofNullable,
} from "../index";

export declare interface Stream<T> {
  map: <U>(fn: Function<T, U>) => NumberStream | BigIntStream | Stream<U>;
  filter: (fn: Predicate<T>) => Stream<T>;
  //   reduce: <U>(fn: Reducer<T, U>) => Stream<U>;
  forEach: (fn: Consumer<T>) => void;

  count: Supplier<number>;
  collect: Supplier<T[]>;

  findFirst: (fn: Predicate<T>) => Optional<T>;
  findAny: (fn: Predicate<T>) => Optional<T[]>;
}

export declare interface GenericStream<T> extends Stream<T> {}

export declare interface NumberStream extends Stream<number> {
  sum: Supplier<number>;
  average: Supplier<number>;
  min: Supplier<number>;
  max: Supplier<number>;
}

export declare interface BigIntStream extends Stream<bigint> {
  sum: Supplier<bigint>;
  average: Supplier<bigint>;
  min: Supplier<bigint>;
  max: Supplier<bigint>;
}

export function stream(): Stream<never>;
export function stream(...input: bigint[]): BigIntStream;
export function stream(...input: number[]): NumberStream;
export function stream<T = never>(...input: T[]): Stream<T>;
export function stream<T>(
  ...input: T[]
): Stream<T> | NumberStream | BigIntStream {
  return __createStream(...input);
}

function __createBaseStream<T>(...input: T[]): Stream<T> {
  return {
    map: <U>(fn: Function<T, U>) => {
      const mapped = input.map(fn);

      if (typeof mapped[0] === "number") {
        return __createNumberStream(...(mapped as number[]));
      } else if (typeof mapped[0] === "bigint") {
        return __createBigIntStream(...(mapped as bigint[]));
      } else {
        return __createBaseStream(...mapped);
      }
    },

    filter: (fn: Predicate<T>) => __createBaseStream(...input.filter(fn)),
    // reduce: <U>(fn: Reducer<T, U>) => __createBaseStream(...input.reduce(fn)),
    forEach: (fn: Consumer<T>) => input.forEach(fn),

    count: () => input.length,
    collect: () => [...input],

    findFirst: (fn: Predicate<T>) => ofNullable(input.find(fn)),
    findAny: (fn: Predicate<T>) => ofNullable(input.filter(fn)),
  };
}

function __createNumberStream(...input: number[]): NumberStream {
  return {
    ...__createBaseStream(...input),

    sum: () => input.reduce((a, b) => a + b, 0),
    average: () => input.reduce((a, b) => a + b, 0) / input.length,
    min: () => input.reduce((a, b) => (b > a ? a : b)),
    max: () => input.reduce((a, b) => (b < a ? a : b)),
  };
}

function __createBigIntStream(...input: bigint[]): BigIntStream {
  return {
    ...__createBaseStream(...input),

    sum: () => input.reduce((a, b) => BigInt(a) + BigInt(b), BigInt(0)),
    average: () =>
      input.reduce((a, b) => BigInt(a) + BigInt(b), BigInt(0)) /
      BigInt(input.length),
    min: () => input.reduce((a, b) => (b > a ? a : b)),
    max: () => input.reduce((a, b) => (b < a ? a : b)),
  };
}

function __createStream<T = never>(
  ...input: T[]
): Stream<T> | NumberStream | BigIntStream {
  if (!input || input.length === 0) {
    return __createBaseStream<never>();
  }

  const t = typeof input[0];

  switch (t) {
    case "number":
      return __createNumberStream(...(input as number[]));
    case "bigint":
      return __createBigIntStream(...(input as bigint[]));
    default:
      return __createBaseStream(...input);
  }
}
