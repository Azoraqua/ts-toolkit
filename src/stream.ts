import { type BigIntStream, type NumberStream, type Stream } from "./stream.d";

export function stream<T>(...input: T[]): Stream<T>;
export function stream(...input: number[]): NumberStream;
export function stream(...input: bigint[]): BigIntStream;
export function stream<T>(
  ...input: T[]
): Stream<T> | NumberStream | BigIntStream {
  return __createStream(...input);
}

function __createBaseStream<T>(...input: T[]): Stream<T> {
  return {
    __data: input,
  };
}

function __createNumberStream(...input: number[]): NumberStream {
  return {
    ...__createBaseStream(...input),

    sum: () => input.reduce((a, b) => a + b, 0),
    average: () => input.reduce((a, b) => a + b, 0) / input.length,
  };
}

function __createBigIntStream(...input: bigint[]): BigIntStream {
  return {
    ...__createBaseStream(...input),

    sum: () => input.reduce((a, b) => BigInt(a) + BigInt(b), BigInt(0)),
    average: () =>
      input.reduce((a, b) => BigInt(a) + BigInt(b), BigInt(0)) /
      BigInt(input.length),
  };
}

function __createStream<T = never>(
  ...input: T[]
): Stream<T> | NumberStream | BigIntStream {
  if (!input || input.length === 0) {
    return __createStream<never>();
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
