import React from 'react';
import { shallow } from 'enzyme';

import StandardList from '../views/components/StandardList';

describe('StandardList', () => {
  it('should render without children', () => {
    const wrapper = shallow(
      <StandardList history={{}} data={[]}></StandardList>,
    );
    expect(
      wrapper
        .find('Spin')
        .children()
        .children(),
    ).toHaveLength(0);
  });
});
