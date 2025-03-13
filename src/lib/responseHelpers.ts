import { NextResponse } from 'next/server';

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
