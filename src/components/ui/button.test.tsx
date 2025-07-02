/** @jsxRuntime classic **/
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('supports asChild to render custom element', () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('triggers onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Push</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Push' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
