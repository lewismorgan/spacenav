import { render } from '@testing-library/react';
import React from 'react';
import SpacexLaunchInfo from './SpacexLaunchInfo';

describe('<SpacexLaunchInfo />', () => {
  test('renders', () => {
    const { container } = render(<SpacexLaunchInfo />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('renders mission details', () => {
    const details = 'These are the details of the mission';
    const { getByText } = render(<SpacexLaunchInfo details={details} />);

    expect(getByText('Mission')).toBeInTheDocument();
    expect(getByText(details)).toBeInTheDocument();
  });
});
