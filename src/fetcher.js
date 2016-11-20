import $fetch from './../lib/fetch'
import defaluts from './../lib/defaults'

const postLikeMethods = ['post', 'put', 'patch', 'delete']

const fetcher = (url, opts = {}) => {
  const $ = (u, o = {}) => {
    u = url + '/' + u
    defaluts(opts, o)
    return fetcher(u, o)
  }

  $.get = (query) => $fetch('GET', url, opts, null, query)

  postLikeMethods.forEach(method => {
    $[method] = (data) => $fetch(method.toUpperCase, url, opts, data)
  })

  return $

}

export default fetcher
