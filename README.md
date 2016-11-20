# Fetchman

Simple fetch api for client and node

## install

```bash
npm install fetchman -S
```

## usage

```javascript
var fetchman = require('fetchman')

/**
 * Fetcher
 * @param  {String} url      remote api url
 * @param  {Object} opts     fetch options
 * @return {Function}
 */

var remoteFoo = fetchman('/foo',{token:'bar'})

remoteFoo.get() // also post,put,delete,patch
remoteFoo(1).get() // will fetch resource "/foo/1"
```
