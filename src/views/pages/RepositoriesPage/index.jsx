import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Section from '../../components/Section';
import StandardList from '../../components/StandardList';
import SearchForm from './components/SearchForm';

import {
  repositoriesActions,
  repositoriesSelectors,
} from '../../../state/ducks/repositories';

class RepositoriesListPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,

    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    search: {},
    data: [],
  };

  componentDidMount() {
    this.fetchRepositories();
  }

  fetchRepositories = async () => {
    const {
      actions: { listRepositories },
    } = this.props;
    const { search } = this.state;

    const params = {
      ...search,
    };

    const result = await listRepositories(params);
    const { payload } = result;

    if (!result.error && !isEmpty(payload)) {
      await this.setState({
        data: [...payload],
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
      await this.fetchRepositories();
    });
  };

  getFormRef = (ref) => {
    this.searchForm = ref;
  };

  render() {
    const { isLoading, history } = this.props;
    const { data } = this.state;

    return (
      <Section title="REPOSITORIES" icon="book" isLoading={isLoading}>
        <SearchForm
          ref={this.getFormRef}
          onSubmit={this.handleSubmitFilters}
          loading={isLoading}
        />
        <StandardList data={data} history={history} />
      </Section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  repositories: repositoriesSelectors.makeSelectRepositories(),
  isLoading: repositoriesSelectors.makeSelectRepositoriesIsLoading(),
  error: repositoriesSelectors.makeSelectRepositoriesError(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...repositoriesActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoriesListPage);
