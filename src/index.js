/**
 * Wrapper function to implement `dot-string acccess` for target object
 *
 * @param {Object} target
 * @param {boolean} [safeOverJump=false] if true, over jump access allow
 * @return {Proxy} implemented object
 */
export default (target, safeOverJump = false) => {
  return new Proxy(target, {
    get(target, property) {
      return _get(target, property, safeOverJump)
    },
    set(target, property, value) {
      return _set(target, property, value, safeOverJump);
    },
  });

  function _get(target, property, safeOverJump) {
    const keys = property.split(".");
    const lastKey = keys.pop();
    let tmp = target;
    keys.forEach(key => {
      if (safeOverJump && typeof tmp !== "object" || tmp === null) {
        // pass
      } else {
        tmp = tmp[key];
      }
    });

    if (safeOverJump && !tmp) {
      return undefined;
    } else {
      return tmp[lastKey];
    }
  }

  function _set(target, property, value, safeOverJump) {
    const keys = property.split(".");
    const lastKey = keys.pop();
    let tmp = target;
    keys.forEach(key => {
      if (safeOverJump && typeof tmp[key] === "undefined" || tmp[key] === null) {
        tmp[key] = {};
      }
      tmp = tmp[key];
    });
    tmp[lastKey] = value;
    return true;
  }
}
