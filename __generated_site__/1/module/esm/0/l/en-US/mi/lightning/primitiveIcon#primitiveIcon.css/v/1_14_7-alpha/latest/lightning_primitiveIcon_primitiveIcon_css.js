function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["_:-ms-lang(x)", shadowSelector, ", svg", shadowSelector, " {pointer-events: none;}"].join('');
}
export default [stylesheet];