/**
 * Custom error class for database errors
 */
export class DatabaseError extends Error {
  originalError?: unknown;
  code: string;

  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
    this.code = 'DATABASE_ERROR';
    this.originalError = originalError;
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  details?: unknown;
  code: string;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
    this.details = details;
  }
}

/**
 * Custom error class for not found errors
 */
export class NotFoundError extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.code = 'NOT_FOUND';
  }
}

/**
 * Custom error class for unauthorized errors
 */
export class UnauthorizedError extends Error {
  code: string;

  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 'UNAUTHORIZED';
  }
}
