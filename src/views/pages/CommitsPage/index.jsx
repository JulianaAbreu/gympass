import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import {
  branchesActions,
  branchesSelectors,
} from '../../../state/ducks/branches';
import { commitsActions, commitsSelectors } from '../../../state/ducks/commits';

import Section from '../../components/Section';
import CommitsTimeline from './components/CommitsTimeline';
import SearchForm from './components/SearchForm';

const LinkRouter = styled(Link)`
  display: flex;
  justify-content: center;
`;

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
    const {
      search: { sha, author, path },
    } = this.state;

    const formattedSearch = {
      sha: !isEmpty(sha) ? sha : null,
      author: !isEmpty(author) ? author : null,
      path: !isEmpty(path) ? path : null,
    };

    const params = {
      per_page: 20,
      page: 1,
      ...formattedSearch,
    };

    const result = await listCommits(repository, params);

    if (!result.error && !isEmpty(result.payload)) {
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

    if (!result.error && !isEmpty(result.payload)) {
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
      <Fragment>
        <LinkRouter to="/">{`<`} Return to repositories list</LinkRouter>
        <Section title="COMMITS" icon="history" isLoading={isLoading}>
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
      </Fragment>
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
