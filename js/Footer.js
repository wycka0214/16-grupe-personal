class Footer {
    constructor(params) {
        this.selector = params.selector;
        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            return;
        }
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
        this.DOM.innerHTML = `<div class="row">
                                <div class="col-12 col-md-6 col-lg-5">
                                    ABOUT ME
                                </div>
                                <div class="col-12 col-md-6 col-lg-5">
                                    NEWSLETTER
                                </div>
                                <div class="col-12 col-lg-2">
                                    FOLLOW ME
                                </div>
                            </div>`;
    }
}

export { Footer };