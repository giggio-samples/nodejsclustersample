module.exports = () => {
  var resolve, reject;
  const p = new Promise((res, rej) =>{
    resolve = res;
    reject = rej;
  });
  setImmediate(() => {
    var valor = 1;
    for (var index = 0; index < 10 * 1000 * 1000; index++) {
      valor += index;
    }
    resolve(valor);
  }, 1000)
  return p;
}