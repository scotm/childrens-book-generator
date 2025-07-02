import { describe, expect, it } from 'vitest';
import { validateId } from '@/lib/utils/validateId';
import { ValidationError } from '@/lib/errors';

describe('validateStoryId', () => {
  it('parses a numeric id', () => {
    expect(validateId('5')).toBe(5);
  });

  it('throws for invalid number', () => {
    expect(() => validateId('abc')).toThrow(ValidationError);
  });

  it('throws when missing', () => {
    expect(() => validateId(undefined as unknown as string)).toThrow(ValidationError);
  });
});
