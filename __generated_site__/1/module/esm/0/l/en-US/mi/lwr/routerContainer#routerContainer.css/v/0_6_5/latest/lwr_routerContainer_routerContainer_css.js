function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return ["span", shadowSelector, " {position: absolute;margin: -1px;border: 0;padding: 0;width: 1px;height: 1px;overflow: hidden;clip: rect(0 0 0 0);text-transform: none;white-space: nowrap;}"].join('');
}
export default [stylesheet];