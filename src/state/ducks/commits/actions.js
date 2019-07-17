import types from './types';
import { get, getQueryParams } from '../../utils/request';

/**
 * Action that dispatches the request to list the commits according to the search params informed.
 *
 * @param {String} name Repository name to list commits specific
 * @param {Object} search Object containing the params to search in the back-end
 */
function listCommits(name, search) {
  return {
    type: types.LIST_COMMITS,
    promise: get(`repos/reactjs/${name}/commits${getQueryParams(search)}`),
  };
}

export default {
  listCommits,
};
