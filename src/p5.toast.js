/**
 * p5.toast — a minimal toast notification addon for p5.js v2.
 */

/**
 * p5.js v2 addon function, called once at registration time.
 * @see https://beta.p5js.org/contribute/creating_libraries/
 *
 * Use `function()` not `()=>` when attaching to `fn` or `lifecycles`,
 * so `this` binds to the sketch instead of the enclosing scope.
 *
 * @param {typeof import('p5').default} p5  the p5 constructor (class).  (Not the instance.)
 * @param {any} fn  alias for `p5.prototype`; attach methods here to expose
 *   them as globals (global mode) or per-instance (instance mode). p5
 *   invokes them with `this` bound to the running sketch — use it to
 *   reach instance state, e.g. `this.canvas`.
 * @param {Record<string, Function>} lifecycles  populate with any of:
 *   `presetup`, `postsetup`, `predraw`, `postdraw`, `remove`. Each hook
 *   is called with `this` bound to the running sketch.
 */
export function toastAddon(p5, fn, lifecycles) {
    /**
     * pop up a notification for a while then remove it
     * @param {string} message
     */
    fn.toast = function (message, options = {}) {
        const durationMillis = options.duration ?? 2000;
        createGlobalToastStylesIfMissing();
        const container = getOrCreateToastContainer();

        const toastElement = createToastElement(message);

        container.appendChild(toastElement);
        function removeToastElement() {
            container.removeChild(toastElement);
        }
        setTimeout(removeToastElement, durationMillis);
    };

    function createGlobalToastStylesIfMissing() {
        if (!document.getElementById("p5ToastStyles")) {
            const styleElement = document.createElement("style");
            styleElement.id = "p5ToastStyles";
            document.body.appendChild(styleElement);

            const css = `
            .p5Toast { 
                background: #fafafa; 
                color: #303030;
                padding:0.5rem;
                user-select: none;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            #p5ToastContainer { 
                position: absolute; 
                right: 10px; top: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 0.5rem;
                font-family: sans-serif;
                /* don't let the toasts intercept clicks (etc) meant for the canvas */
                pointer-events: none;
            }
            `;
            styleElement.innerHTML = css;
        }
    }
    /**
     * @returns {HTMLElement} the container to which all toasts will be added.
     */
    function getOrCreateToastContainer() {
        const containerId = "p5ToastContainer";
        let container = document.getElementById(containerId);
        if (!container) {
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
     * @todo: keep track of all elements we add so that we can remove them all if the p5 sketch gets removed?
     */
    function createToastElement(message) {
        const divElem = document.createElement("div");
        divElem.classList.add("p5Toast");
        divElem.textContent = message;
        return divElem;
    }
}

if (typeof p5 !== "undefined") {
    p5.registerAddon(toastAddon);
}
