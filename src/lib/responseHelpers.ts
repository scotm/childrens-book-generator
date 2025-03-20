import { NextResponse } from 'next/server';
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from './errors';

// Error response helper
export const createErrorResponse = (
  status: number,
  message: string,
  code: string,
  details?: unknown
) => {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
    },
    { status }
  );
};

// Success response helper
export const createSuccessResponse = <T>(data: T) => {
  return NextResponse.json({
    success: true,
    data,
  });
};

// Handle errors and return appropriate responses
export const handleError = (error: unknown) => {
  console.error('Error:', error);

  if (error instanceof ValidationError) {
    return createErrorResponse(400, error.message, error.code, error.details);
  }

  if (error instanceof NotFoundError) {
    return createErrorResponse(404, error.message, error.code);
  }

  if (error instanceof UnauthorizedError) {
    return createErrorResponse(401, error.message, error.code);
  }

  if (error instanceof DatabaseError) {
    return createErrorResponse(
      500,
      error.message,
      error.code,
      error.originalError instanceof Error ? error.originalError.message : undefined
    );
  }

  // Default error handling
  return createErrorResponse(
    500,
    'An unexpected error occurred',
    'INTERNAL_SERVER_ERROR',
    error instanceof Error ? error.message : undefined
  );
};
