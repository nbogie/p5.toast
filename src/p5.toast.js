console.log("in p5.toast.js")
/**
 * p5.toast — a minimal toast notification addon for p5.js v2.
 */

/**
 * p5.js v2 addon function. Receives the p5 constructor, an alias for
 * `p5.prototype` (`fn`), and a `lifecycles` object the addon may populate
 * with any of: `presetup`, `postsetup`, `predraw`, `postdraw`, `remove`.
 * @see https://beta.p5js.org/contribute/creating_libraries/
 *
 * @param {typeof import('p5').default} p5
 * @param {any} fn
 * @param {Record<string, Function>} lifecycles
 */
export function toastAddon(p5, fn, lifecycles) {
  /**
   * Demo function
   */
  fn.demo = function () {
    console.log("demo from p5.toast");
    circle(random(width), random(height), random(50, 100));
  };
}

if (typeof p5 !== 'undefined') {
  p5.registerAddon(toastAddon);
}
