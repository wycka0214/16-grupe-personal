import { ajax } from './Ajax.js';

class Newsletter {
    constructor(params) {
        this.selector = params.selector;
        this.insertPosition = params.insertPosition;
        this.parentDOM = null;
        this.DOM = null;
        this.inputDOM = null;
        this.buttonDOM = null;
        this.messagesDOM = null;

        this.email = '';

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
        // this.buttonDOM.addEventListener('click', this.submitForm.bind(this)); // alternatyva kai baindiname konteksta (en. context binding)
        this.buttonDOM.addEventListener('click', () => {
            this.submitForm();
        });

        this.inputDOM.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.submitForm();
            }
        });
    }

    submitForm() {
        this.email = this.inputDOM.value;
        if (!Newsletter.isValidEmail(this.email)) {
            this.displayFormMessage();
        }

        this.sendRequest();
    }

    static isValidEmail(email) {
        console.log('tikriname:', email);
        /* Kriterijai validziam email adresui:
        1. ilgis - min 7 simboliai (a@a1.lt)
        2. ilgis - max 100
        3. @ === 1
        4. pries @ - bent 1 simbolis
        5. uz @ - min 5 simboliai
        6. taskas - bent vienas uz @
        7. taskas - negali buti pirmas simbolis uz @
        8. taskas - negali buti 2 is eiles (niekur)
        9. taskas - gali buti trecias arba ketvirtas (arciausiai) nuo galo uz @
        10. validus - tik [lotyniskos/angliskos raides, @, ., [0..9]]
        */

        return true;
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

        this.DOM = this.parentDOM.querySelector('.form');
        this.inputDOM = this.DOM.querySelector('input');
        this.buttonDOM = this.DOM.querySelector('.btn');
        this.messagesDOM = this.DOM.querySelector('.messages');
    }
}

export { Newsletter };