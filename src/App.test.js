import React from 'react';
import { render, screen, wait, cleanup } from '@testing-library/react';

import App from './App';

afterEach(cleanup);
test('render application', () => {
  render(<App />);
  expect(screen.getByText('Countries')).toBeInTheDocument();
});

test('drop down of countries', async () => {
  const countries = [{ name: 'Aruba', capitalCity: 'Oranjestad', id: 'ABW' }];
  render(<App />);
  await wait(() =>
    expect(screen.getByText('Selected Country')).toBeInTheDocument(),
  );
  countries.forEach((country) => {
    expect(screen.getByTestId('select')).toBeInTheDocument();
  });
});
