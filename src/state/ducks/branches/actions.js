import types from './types';
import { get } from '../../utils/request';

/**
 * Action that dispatches the request to list the branches according to the repository name informed.
 *
 * @param {String} name repository name to list specific branches
 */
function listBranches(name) {
  return {
    type: types.LIST_BRANCHES,
    promise: get(`repos/reactjs/${name}/branches`),
  };
}

export default {
  listBranches,
};
