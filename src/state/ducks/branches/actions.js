import types from './types';
import { get } from '../../utils/request';

function listBranches(name) {
  return {
    type: types.LIST_BRANCHES,
    promise: get(`repos/reactjs/${name}/branches`),
  };
}

export default {
  listBranches,
};
