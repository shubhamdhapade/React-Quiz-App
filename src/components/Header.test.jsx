import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders the quiz title and logo', () => {
    render(<Header />);
    
    expect(screen.getByText(/React Quiz/i)).toBeInTheDocument();
    const logo = screen.getByAltText(/Quiz Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('size-12');
  });
});
