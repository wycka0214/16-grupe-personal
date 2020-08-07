class Services {
    /**
     * Constructor for Services object
     * @param {string} selector CSS-like selector for finding location for new content rendering
     * @param {Array} data list of objects that defines each service
     */
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
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
        if (!this.isValidSelector()) {
            return;
        }

        this.DOM.innerHTML = `<div class="list">
                                <div class="service">Service 1</div>
                                <div class="service">Service 2</div>
                                <div class="service">Service 3</div>
                            </div>`;
    }
}

export { Services };