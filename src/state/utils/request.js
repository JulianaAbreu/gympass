import { isEmpty } from 'lodash';
import { stringify } from 'query-string';
import axios from './axios';
import defaultRequestHandlers from './requestHandlers';

/**
 * Sends GET request to the specified URL.
 *
 * @param {String} url URL to send the GET request.
 */
export const get = (url) =>
  request(url, {
    method: 'GET',
  });

/**
 * Sends request to the specified URL using axios.
 *
 * @param {String} url URL to send the request.
 * @param {Object} requestParams Params to modify the axios request object.
 * @param {Function} requestParams.requestHandler Custom request handler to be used after the request is done. Defaults to the './defaultRequestHandler' export.
 * @param {Object} requestParams.contentType Content-Type of the request. Defaults to 'application-json'.
 */
export const request = (
  url,
  {
    successHandler = defaultRequestHandlers.success,
    errorHandler = defaultRequestHandlers.error,
    contentType = 'application/json',
    ...customOptions
  },
) => {
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const options = {
    ...customOptions,
    headers,
  };

  return axios(url, options)
    .then(successHandler)
    .catch(errorHandler);
};

/**
 * Converts object to query string params
 *
 * @param {Object} params Object containing the params to be transformed in QueryParams
 */
export const getQueryParams = (params) => {
  if (isEmpty(params)) return '';
  const urlParams = stringify(params);
  return `?${urlParams}`;
};
