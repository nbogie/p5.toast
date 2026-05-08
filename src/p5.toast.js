//@ts-check
console.log("in p5.toast.js");
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
     * @param {string} bgColour
     */
    fn.demo = function (bgColour) {
        background(bgColour);
        console.log("demo from p5.toast");
        circle(random(width), random(height), random(50, 100));
    };

    /**
     * pop up a notification for a while then remove it
     * @param {string} message
     */
    fn.toast = function (message) {
        console.log("toast from p5.toast: ", message);
        
        const durationMillis = 2000;

        const container = getOrCreateToastContainer();
        const toastElement = createToastElement(message);
        container.appendChild(toastElement);
        function removeToastElement(){            
            container.removeChild(toastElement)
        }
        setTimeout(removeToastElement, durationMillis)
    };

    /**
     * @returns {HTMLElement} the container to which all toasts will be added.
     */
    function getOrCreateToastContainer() {
      const containerId =   "p5ToastContainer";
      let container = document.getElementById(containerId);
        if (!container) {
            console.log("missing container - creating and appending to body");
            container = document.createElement("div");
            container.id = containerId;
            document.body.appendChild(container);
        }
        return container;
    }

    /**
     * 
     * @param {string} message 
     * @returns {HTMLElement}
     */
    function createToastElement(message){
        const divElem = document.createElement("div");
        divElem.textContent = message;
        return divElem;
    }
}

if (typeof p5 !== "undefined") {
    p5.registerAddon(toastAddon);
}

