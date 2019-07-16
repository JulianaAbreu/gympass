import { createSelector } from 'reselect';

const selectCommits = ({ commits: { listCommits } }) => listCommits;
const makeSelectCommits = () =>
  createSelector(
    selectCommits,
    ({ data }) => data,
  );
const makeSelectCommitsIsLoading = () =>
  createSelector(
    selectCommits,
    ({ isLoading }) => isLoading,
  );
const makeSelectCommitsError = () =>
  createSelector(
    selectCommits,
    ({ error }) => error,
  );

export default {
  // LIST
  selectCommits,
  makeSelectCommits,
  makeSelectCommitsIsLoading,
  makeSelectCommitsError,
};
