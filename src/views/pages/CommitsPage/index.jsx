import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import {
  branchesActions,
  branchesSelectors,
} from '../../../state/ducks/branches';
import { commitsActions, commitsSelectors } from '../../../state/ducks/commits';

import Section from '../../components/Section';
import CommitsTimeline from './components/CommitsTimeline';
import SearchForm from './components/SearchForm';

class CommitsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    commits: PropTypes.array.isRequired,
    branches: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    count: 1,
    search: {},
  };

  componentDidMount = async () => {
    this.fetchCommits();
    this.fetchBranches();
  };

  fetchBranches = () => {
    const {
      actions: { listBranches },
      match: {
        params: { repository },
      },
    } = this.props;

    listBranches(repository);
  };

  fetchCommits = async () => {
    const {
      actions: { listCommits },
      match: {
        params: { repository },
      },
    } = this.props;
    const { search } = this.state;

    const params = {
      per_page: 20,
      page: 1,
      ...search,
    };

    const result = await listCommits(repository, params);

    if (!isEmpty(result.payload)) {
      this.setState({
        list: [...result.payload],
        data: [...result.payload],
        initLoading: false,
      });
    } else {
      this.setState({
        list: [],
        data: [],
      });
    }
  };

  onLoadMore = async () => {
    const {
      actions: { listCommits },
      match: {
        params: { repository },
      },
    } = this.props;
    const { count, data, search } = this.state;

    const newCount = count + 1;

    await this.setState({
      count: newCount,
      loading: true,
    });

    const params = {
      per_page: 20,
      page: newCount,
      ...search,
    };

    const result = await listCommits(repository, params);
    const { payload } = result;

    if (!isEmpty(result.payload)) {
      await this.setState({
        list: [...data, ...payload],
        loading: false,
      });
    }
  };

  handleSubmitFilters = () => {
    const {
      searchForm: { validateFields },
    } = this;

    validateFields(async (err, values) => {
      await this.setState({
        search: { ...values },
      });
      await this.fetchCommits();
    });
  };

  getFormRef = (ref) => {
    this.searchForm = ref;
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const { commits, branches, isLoading } = this.props;

    return (
      <Section title="COMMITS" isLoading={isLoading}>
        <SearchForm
          branches={branches}
          ref={this.getFormRef}
          onSubmit={this.handleSubmitFilters}
          loading={isLoading}
        />
        <CommitsTimeline
          handleInfiniteOnLoad={this.handleInfiniteOnLoad}
          initLoading={initLoading}
          loading={loading}
          data={commits}
          list={list}
          onLoadMore={this.onLoadMore}
        />
      </Section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  commits: commitsSelectors.makeSelectCommits(),
  isLoading: commitsSelectors.makeSelectCommitsIsLoading(),
  error: commitsSelectors.makeSelectCommitsError(),

  branches: branchesSelectors.makeSelectBranches(),
  isLoadingBranches: branchesSelectors.makeSelectBranchesIsLoading(),
  errorBranches: commitsSelectors.makeSelectCommitsError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { ...commitsActions, ...branchesActions },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommitsPage);
