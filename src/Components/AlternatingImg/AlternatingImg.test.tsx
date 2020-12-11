import { render } from '@testing-library/react';
import React from 'react';
import AlternatingImg from './AlternatingImg';

describe('<AlternatingImg />', () => {
  test('renders', () => {
    const { container } = render(<AlternatingImg time={0} alt="" imgs={[]} />);

    expect(container).toBeInTheDocument();
  });

  test('changes images based on a time', async () => {
    const imgs: string[] = ['file://first.png', 'file://second.png'];

    const { getByAltText, findByAltText } = render(
      <AlternatingImg time={1000} alt="Alt" imgs={imgs} />,
    );

    expect(getByAltText('Alt-0')).toBeInTheDocument();
    expect(await findByAltText('Alt-1')).toBeInTheDocument();
  });
});
