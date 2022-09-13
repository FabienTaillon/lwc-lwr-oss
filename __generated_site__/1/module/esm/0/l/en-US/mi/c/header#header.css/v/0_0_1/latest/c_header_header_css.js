function stylesheet(useActualHostSelector, token) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  return [(useActualHostSelector ? ":host {display: flex;flex-direction: column;align-items: center;}" : [hostSelector, " {display: flex;flex-direction: column;align-items: center;}"].join('')), ".uppercase", shadowSelector, " {text-transform: uppercase;}"].join('');
}
export default [stylesheet];