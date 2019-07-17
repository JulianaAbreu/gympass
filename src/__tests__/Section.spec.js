import React from 'react';
import { mount } from 'enzyme';

import Section from '../views/components/Section';

describe('Section', () => {
  it('should have a default props', () => {
    expect(Section.defaultProps.isLoading).toBeDefined();
  });

  it('should dont have props undefined or null', () => {
    const content = <p>teste</p>;
    const wrapper = mount(<Section icon="history">{content}</Section>);
    const props = wrapper.props();

    expect(props).not.toBe(null);
    expect(props).not.toBe(undefined);
  });
});
