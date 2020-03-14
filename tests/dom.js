{
    class ManageDomElements{
        constructor(){
            this.dataList = document.querySelector("#datalist");
            this.largeArray = Array.from({length: 300});

            this.initializeClickEvents();
        }

        initializeClickEvents() {
            document.querySelector('#slowVersion').addEventListener('click', this.slowVersion.bind(this));
            document.querySelector('#fastVersion').addEventListener('click', this.fastVersion.bind(this));
            document.querySelector('#fragVersion').addEventListener('click', this.fragmentVersion.bind(this));
        }

        slowVersion(evt) {
            this.dataList.innerHTML = "";
            console.time("slow_render");
            this.largeArray.map(() => {
                this.dataList.innerHTML += `<option>${Math.random()}</option>`;
            });
            console.timeEnd("slow_render");
        }

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

    window.addEventListener("DOMContentLoaded", () => {
        new ManageDomElements();
    });
}