import types from './types';
import { get, getQueryParams } from '../../utils/request';

/**
 * Action that dispatches the request to list the repositories according to the search params informed.
 *
 * @param {Object} search Object containing the params to search in the back-end
 */
function listRepositories(search) {
  return {
    type: types.LIST_REPOSITORIES,
    promise: get(`users/reactjs/repos${getQueryParams(search)}`),
  };
}

export default {
  listRepositories,
};
