function IsJsonString(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return true;
    }
  } catch (e) {}
  return false;
}

const TokenPersistor = (function () {
  const serviceName = 'webAuth';
  let state = {};

  state = readAll();

  function write(key, value) {
    state[key] = value;
    writeAll(JSON.stringify(state));
  }
  function read(key) {
    return state[key];
  }
  function remove(key) {
    if (state[key]) {
      delete state[key];
      writeAll(JSON.stringify(state));
    }
  }
  function writeAll(value) {
    localStorage.setItem(serviceName, value);
  }

  function readAll() {
    const state = localStorage.getItem(serviceName);
    if (IsJsonString(state)) return JSON.parse(state);
    else return {};
  }

  function purge() {
    localStorage.removeItem(serviceName);
    state = {};
  }

  return {
    write,
    read,
    remove,
    purge,
  };
})();
export default TokenPersistor;
