function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["div[role='region']", shadowSelector, " {outline: none;}"].join('');
}
export default [stylesheet];