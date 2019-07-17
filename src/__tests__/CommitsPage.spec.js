/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import configureStore from 'redux-mock-store';

import CommitsTimeline from '../views/pages/CommitsPage/components/CommitsTimeline';
import CommitsPage from '../views/pages/CommitsPage';

const middlewares = [reduxPackMiddleware];
const mockStore = configureStore(middlewares);
const listCommitsMock = jest.fn();
const listBranchesMock = jest.fn();

const store = mockStore({
  commits: {
    listCommits: listCommitsMock,
  },
  branches: { listBranches: listBranchesMock },
  actions: [
    { type: 'commits/LIST_COMMITS' },
    { type: 'branches/LIST_BRANCHES' },
  ],
});

describe('CommitsPage', () => {
  it('should dispatch LIST_COMMITS and LIST_BRANCHES actions', () => {
    const { actions: actionsStore } = store.getState();
    const actions = actionsStore;

    const expectedActions = [
      { type: 'commits/LIST_COMMITS' },
      { type: 'branches/LIST_BRANCHES' },
    ];

    const commits = [{ id: 1, message: 'test message' }];
    const match = { params: { repository: 'reactjs.org' } };
    const branches = [[{ id: 1, name: 'master' }]];
    const isLoading = false;

    const wrapper = shallow(
      <CommitsPage
        match={match}
        commits={commits}
        branches={branches}
        isLoading={isLoading}
        store={store}
      />,
    ).dive();

    expect(actions).toEqual(expectedActions);
  });

  it('should call onLoadMore when click on button', () => {
    const list = [
      {
        name: 'repository-name',
        id: 1,
        commit: {
          author: { id: 0, name: 'reactjs' },
          url: '',
          committer: { date: '2015-03-25' },
        },
      },
    ];
    const initLoading = false;
    const loading = false;
    const onLoadMoreMock = jest.fn();
    const wrapper = mount(
      <CommitsTimeline
        list={list}
        loading={loading}
        initLoading={initLoading}
        onLoadMore={onLoadMoreMock}
      />,
    );
    wrapper.find('button').simulate('click');
    expect(onLoadMoreMock).toHaveBeenCalled();
  });
});
