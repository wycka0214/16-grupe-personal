import { ajax } from "./ajax.js";

class Services {
    /**
     * Constructor for Services object
     * @param {string} selector CSS-like selector for finding location for new content rendering
     * @param {string} dataURL JSON file name to be requested from server's data folder
     * @returns {Services} Returns Services object
     */
    constructor(selector, dataURL) {
        this.selector = selector;
        this.dataURL = dataURL;

        this.DOM = null;
        this.dataServices = null;

        this.init();
    }

    async init() {
        if (!this.isValidSelector()) {
            return;
        }

        this.dataServices = await ajax(this.dataURL);

        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string') {
            console.warn('Selector should be a "string" type.');
            return false;
        }
        if (this.selector === '') {
            console.warn('Selector should not be an empty string.');
            return false;
        }

        this.DOM = document.querySelector(this.selector);
        if (!this.DOM) {
            console.warn('Could not find any element by given selector.');
            return false;
        }

        return true;
    }

    render() {
        let HTML = '';
        for (const service of this.dataServices) {
            HTML += `<div class="service col-12 col-md-6 col-lg-4">
                        <i class="fa fa-${service.icon}"></i>
                        <a href="${service.link}">${service.name}</a>
                        <p>${service.description}</p>
                    </div>`;
        }
        this.DOM.innerHTML = HTML;
    }
}

export { Services };