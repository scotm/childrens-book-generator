import { ValidationError } from '@/lib/errors';

export function validateId(idValue: string | undefined) {
  if (!idValue) throw new ValidationError('Invalid story ID');

  const id = Number.parseInt(idValue, 10);
  if (Number.isNaN(id)) throw new ValidationError('Invalid story ID');

  return id;
}
