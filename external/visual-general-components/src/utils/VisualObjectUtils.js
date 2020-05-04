/**
 * @author Daniel Falci - 20/09/17
 **/

export function cloneObject(o){
  var _out, v, _key;
  _out = Array.isArray(o) ? [] : {};
  for (_key in o) {
    v = o[_key];
    _out[_key] = (typeof v === "object") ? cloneObject(v) : v;
  }
  return _out;
}
