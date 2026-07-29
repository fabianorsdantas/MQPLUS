// Shared Domain Primitives & Core Interfaces (@mqplus/core)

export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class Entity<T extends BaseEntityProps> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }
}

export type Result<T, E = Error> =
  | { isSuccess: true; value: T }
  | { isSuccess: false; error: E };

export const Result = {
  ok: <T>(value: T): Result<T, never> => ({ isSuccess: true, value }),
  fail: <E>(error: E): Result<never, E> => ({ isSuccess: false, error }),
};
