import types from './types';
import { get, getQueryParams } from '../../utils/request';

function listRepositories(query) {
  return {
    type: types.LIST_REPOSITORIES,
    promise: get(`repos${getQueryParams(query)}`),
  };
}

export default {
  listRepositories,
};
