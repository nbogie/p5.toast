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
     * pop up a notification for a while then remove it
     * @param {string} message
     */
    fn.toast = function (message, options={}) {
        
        const durationMillis = options.duration ?? 2000;
        createGlobalToastStylesIfMissing();
        const container = getOrCreateToastContainer();
        
        const toastElement = createToastElement(message);
        
        container.appendChild(toastElement);
        function removeToastElement(){            
            container.removeChild(toastElement)
        }
        setTimeout(removeToastElement, durationMillis)
    };

    function createGlobalToastStylesIfMissing(){
        
        if (!document.getElementById("p5ToastStyles")){
            const styleElement = document.createElement("style");
            styleElement.id = "p5ToastStyles";
            document.body.appendChild(styleElement)
            
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
                align-items: right;
                gap: 0.5rem;
                font-family: sans-serif;
                // don't let the toasts intercept clicks (etc) meant for the canvas
                pointer-events: none;
            };
            `;
            styleElement.innerHTML = css;
        }

    }
    /**
     * @returns {HTMLElement} the container to which all toasts will be added.
     */
    function getOrCreateToastContainer() {
      const containerId =   "p5ToastContainer";
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
    function createToastElement(message){
        const divElem = document.createElement("div");
        divElem.classList.add("p5Toast");
        divElem.textContent = message;
        return divElem;
    }
}

if (typeof p5 !== "undefined") {
    p5.registerAddon(toastAddon);
}

