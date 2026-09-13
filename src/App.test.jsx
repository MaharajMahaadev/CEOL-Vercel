import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import App from './App';

vi.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => null,
}));

test('renders the main navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /song recommendation using emotion recognition/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /prediction/i })).toHaveAttribute('href', '/predict');
});
