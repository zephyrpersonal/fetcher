import 'isomorphic-fetch'
import defaults from './defaults'
import querystring from 'querystring'

const responseMethods = ['json', 'text', 'blob']

const $fetch = (method, url, opts, data, query) => {
  opts.method = method
  opts.headers = opts.headers || {}

  defaults(opts.headers, {
    'Accept': 'application-json',
    'Content-type': 'application-json'
  })

  const $url = query ? url + '?' + querystring.stringify(query) : url

  if(data) opts.body = JSON.stringify(data)

  opts.responseAs = (opts.responseAs && responseMethods.indexOf(opts.responseAs) > -1) ? opts.responseAs : 'json'

  return fetch($url, opts)
    .then(res => {
      if (res.ok) return res[opts.responseAs]()
      const error = new Error(res.status)
      error.response = res
      throw error
    })
}

export default $fetch
