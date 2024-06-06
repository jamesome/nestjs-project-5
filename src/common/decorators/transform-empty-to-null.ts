import { Transform } from 'class-transformer';

export function TransformEmptyToNull() {
  return Transform(({ value }) => {
    if (value.trim() === '') {
      return null;
    }

    return value;
  });
}
