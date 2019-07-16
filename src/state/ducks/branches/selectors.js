import { createSelector } from 'reselect';

const selectBranches = ({ branches: { listBranches } }) => listBranches;
const makeSelectBranches = () =>
  createSelector(
    selectBranches,
    ({ data }) => data,
  );
const makeSelectBranchesIsLoading = () =>
  createSelector(
    selectBranches,
    ({ isLoading }) => isLoading,
  );
const makeSelectBranchesError = () =>
  createSelector(
    selectBranches,
    ({ error }) => error,
  );

export default {
  // LIST
  selectBranches,
  makeSelectBranches,
  makeSelectBranchesIsLoading,
  makeSelectBranchesError,
};
