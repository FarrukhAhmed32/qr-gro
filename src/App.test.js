import { render, screen } from '@testing-library/react';
import App from './App';

test('renders join waitlist header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Join The Waitlist/i);
  expect(headerElement).toBeInTheDocument();
});
