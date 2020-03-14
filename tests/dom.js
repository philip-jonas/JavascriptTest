{
    class ManageDomElements{
        constructor(){
            this.dataList = document.querySelector("#datalist");
            this.largeArray = Array.from({length: 300});

            this.initializeClickEvents();
        }

        /**
         * Initiate the click events.
         */
        initializeClickEvents() {
            this.addEvents('#slowVersion', 'click', this.slowVersion);
            this.addEvents('#fastVersion', 'click', this.fastVersion);
            this.addEvents('#fragVersion', 'click', this.fragmentVersion);
        }

        /**
         * Add element event.
         * @param {String} elementReference 
         * @param {String} event 
         * @param {Function} callback 
         */
        addEvents(elementReference, event, callback) {
            document.querySelector(elementReference).addEventListener(event, callback.bind(this));
        }

        /**
         * Generate the list html using a slow dom minipulator in a loop. Average: 230ms
         * @param {DocumentEvent} evt 
         */
        slowVersion(evt) {
            this.dataList.innerHTML = "";
            console.time("slow_render");

            this.largeArray.map(() => {
                this.dataList.innerHTML += `<option>${Math.random()}</option>`;
            });

            console.timeEnd("slow_render");
        }

        /**
         * Render the select inner html bu joining a string array and appending child node in 1 call. Average: 1.5ms
         * @param {DocumentEvent} evt 
         */
        fastVersion(evt) {
            this.dataList.innerHTML = "";
            console.time("fast_render");
            
            let htmlData = [];
            this.largeArray.map(() => {
                htmlData.push(`<option>${Math.random()}</option>`);
            });
            this.dataList.innerHTML += htmlData.join("");

            console.timeEnd("fast_render");
        }

        /**
         * Render the select inner html using a DocumentFragment which ads no peformance impact to the current client side. Average: 1.5ms
         * @param {DocumentEvent} evt 
         */
        fragmentVersion(evt) {
            this.dataList.innerHTML = "";
            console.time("fragment_render");

            const domFragment = document.createDocumentFragment();
            this.largeArray.map(() => {
                const opt = document.createElement('option');
                opt.innerText = Math.random();
                domFragment.appendChild(opt);
            });
            this.dataList.appendChild(domFragment);

            console.timeEnd("fragment_render");
        }
    }

    // Wait for the dom elements to load before creating the new ManageDomElements class.
    window.addEventListener("DOMContentLoaded", () => {
        new ManageDomElements();
    });
}