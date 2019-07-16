import types from './types';
import { get, getQueryParams } from '../../utils/request';

function listCommits(name, search) {
  return {
    type: types.LIST_COMMITS,
    promise: get(`repos/reactjs/${name}/commits${getQueryParams(search)}`),
  };
}

export default {
  listCommits,
};
