import { createSelector } from 'reselect';

const selectRepositories = ({ repositories: { listRepositories } }) =>
  listRepositories;
const makeSelectRepositories = () =>
  createSelector(
    selectRepositories,
    ({ data }) => data,
  );
const makeSelectRepositoriesIsLoading = () =>
  createSelector(
    selectRepositories,
    ({ isLoading }) => isLoading,
  );
const makeSelectRepositoriesError = () =>
  createSelector(
    selectRepositories,
    ({ error }) => error,
  );

export default {
  // LIST
  selectRepositories,
  makeSelectRepositories,
  makeSelectRepositoriesIsLoading,
  makeSelectRepositoriesError,
};
