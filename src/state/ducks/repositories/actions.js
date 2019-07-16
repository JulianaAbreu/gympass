import types from './types';
import { get, getQueryParams } from '../../utils/request';

function listRepositories(search) {
  return {
    type: types.LIST_REPOSITORIES,
    promise: get(`users/reactjs/repos${getQueryParams(search)}`),
  };
}

export default {
  listRepositories,
};
