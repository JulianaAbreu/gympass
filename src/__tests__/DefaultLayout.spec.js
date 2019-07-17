import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import styled from 'styled-components';

import DefaultLayout from '../views/layouts/DefaultLayout';

describe('DefaultLayout', () => {
  it('should be a <h1> element in Header styled component', () => {
    const wrapper = shallow(<DefaultLayout />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should contain a Route element inside Content', () => {
    const Content = styled.main``;
    const wrapper = shallow(
      <Content>
        <Route />
      </Content>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Route)).toHaveLength(1);
  });

  it('should render a DefaultLayout with content', () => {
    const wrapper = shallow(<DefaultLayout />);
    expect(wrapper.find('div').children()).toHaveLength(1);
  });
});
