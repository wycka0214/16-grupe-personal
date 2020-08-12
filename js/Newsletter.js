import { Ajax } from './Ajax.js';

class Newsletter {
    constructor(params) {
        this.selector = params.selector;
        this.insertPosition = params.insertPosition;
        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            return;
        }
        this.render();
        this.addEvents();
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

        // TODO: validate this.insertPosition

        return true;
    }

    addEvents() {
        // TODO: click ant submit mygtuko
        // TODO: enter input'e
    }

    validateInput() {
        // TODO: validuojame email formata
    }

    displayFormMessage() {
        // TODO: atvaizduoja tiek formos errorus, tiek ir sekminga subscribe ivyki
    }

    sendRequest() {
        // TODO: naudojantis Ajax funkcija, siunciame email i serveri
    }

    render() {
        // TODO: pakeisti i .insertAdjacentHTML()
        this.DOM.innerHTML = `<form class="form">
                                NEWSLETTER FORM
                            </form>`;
    }
}

export { Newsletter };