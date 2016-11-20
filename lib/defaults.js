export default function defaults(target, obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && !target[prop]) {
      target[prop] = obj[prop]
    }
  }
}
