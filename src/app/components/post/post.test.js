import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('renders page heading', () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Huddl Assignment/i);
  expect(headingElement).toBeInTheDocument();
});
