import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Section from '../../components/Section';
import StandardList from '../../components/StandardList';

import {
  repositoriesActions,
  repositoriesSelectors,
} from '../../../state/ducks/repositories';

class RepositoriesListPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,

    repositories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {};

  componentDidMount() {
    const {
      actions: { listRepositories },
    } = this.props;
    console.log(this.props);

    listRepositories();
  }

  render() {
    const { repositories, isLoading } = this.props;
    console.log(repositories);

    return (
      <Section title="REPOSITÓRIOS" icon="book" isLoading={isLoading}>
        <StandardList data={repositories} />
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
  actions: bindActionCreators(repositoriesActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoriesListPage);
