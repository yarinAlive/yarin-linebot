import request from 'superagent';

import type { Request } from 'superagent';

const ajax = (
  httpMethod: string,
  url: string,
  options: {
    type?: string,
    headers?: any,
    payload?: any,
  },
): Request => {
  let xhr = request(httpMethod, url);

  if (options.type)
    xhr.type(options.type);

  if (options.headers) {
    xhr.set(options.headers);
  }

  if (options.payload) {
    xhr.send(options.payload);
  }

  return xhr
}

export {
  ajax
}
