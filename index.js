'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isomorphicFetch = require('isomorphic-fetch');
var querystring = _interopDefault(require('querystring'));

function defaults(target, obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && !target[prop]) {
      target[prop] = obj[prop];
    }
  }
}

var responseMethods = ['json', 'text', 'blob'];

var $fetch = function $fetch(method, url, opts, data, query) {
  opts.method = method;
  opts.headers = opts.headers || {};

  defaults(opts.headers, {
    'Accept': 'application-json',
    'Content-type': 'application-json'
  });

  var $url = query ? url + '?' + querystring.stringify(query) : url;

  if (data) opts.body = JSON.stringify(data);

  opts.responseAs = opts.responseAs && responseMethods.indexOf(opts.responseAs) > -1 ? opts.responseAs : 'json';

  return fetch($url, opts).then(function (res) {
    if (res.ok) return res[opts.responseAs]();
    var error = new Error(res.status);
    error.response = res;
    throw error;
  });
};

var postLikeMethods = ['post', 'put', 'patch', 'delete'];

var fetcher = function fetcher(url) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var $ = function $(u) {
    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    u = url + '/' + u;
    defaults(opts, o);
    return fetcher(u, o);
  };

  $.get = function (query) {
    return $fetch('GET', url, opts, null, query);
  };

  postLikeMethods.forEach(function (method) {
    $[method] = function (data) {
      return $fetch(method.toUpperCase, url, opts, data);
    };
  });

  return $;
};

module.exports = fetcher;
