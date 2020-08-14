import { ajax } from './Ajax.js';

class Newsletter {
    constructor(params) {
        this.selector = params.selector;
        this.insertPosition = params.insertPosition;
        this.parentDOM = null;

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

        this.parentDOM = document.querySelector(this.selector);
        if (!this.parentDOM) {
            console.warn('Could not find any element by given selector.');
            return false;
        }

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
        const positionOptions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
        const HTML = `<form class="form">
                        <input type="email" value="" placeholder="Enter email address">
                        <div class="btn fa fa-long-arrow-right"></div>
                        <div class="messages error"></div>
                    </form>`;

        if (this.insertPosition &&
            positionOptions.includes(this.insertPosition)) {
            this.parentDOM.insertAdjacentHTML(this.insertPosition, HTML);
        } else {
            this.parentDOM.innerHTML += HTML;
        }
    }
}

export { Newsletter };