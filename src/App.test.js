import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, wait, cleanup } from '@testing-library/react';

import App from './App';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders select', () => {
  const { getByTestId } = render(<App />);
  getByTestId('select').value = 'ABW';
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
