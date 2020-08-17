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
        // console.log('tikriname:', email);

        // 0. tekstas
        if (typeof email !== 'string') {
            console.warn('ERROR: email turi buti tekstinis.');
            return false;
        }

        const emailLength = email.length;

        // 1. ilgis - min 7 simboliai (a@a1.lt)
        if (emailLength < 7) {
            console.warn('ERROR: email ne maziau 7 simboliu.');
            return false;
        }

        // 2. ilgis - max 100
        if (emailLength > 100) {
            console.warn('ERROR: email ne daugiau 100 simboliu.');
            return false;
        }

        // 3. @ === 1
        let etaCount = 0;
        let etaPosition = null;
        for (let i = 0; i < emailLength; i++) {
            if (email[i] === '@') etaCount++;
            if (email[i] === '@' && etaPosition === null) etaPosition = i;
        }
        if (etaCount !== 1) {
            console.warn('ERROR: email tik vienas @ simbolis.');
            return false;
        }

        // 4. pries @ - bent 1 simbolis
        if (email[0] === '@') {
            console.warn('ERROR: email turi tureti local-part (tekstas priesais @ simboli).');
            return false;
        }

        // 5. uz @ - min 5 simboliai
        const symbolsAfterEta = emailLength - etaPosition - 1;
        if (symbolsAfterEta < 5) {
            console.warn('ERROR: email turi tureti domain-part is min 5 simboliu (uz @).');
            return false;
        }

        // 6. taskas - bent vienas uz @
        let dotCount = 0;
        for (let i = 0; i < emailLength; i++) {
            if (email[i] === '.') dotCount++;
        }
        if (dotCount === 0) {
            console.warn('ERROR: email domain-part turi tureti bent viena taska.');
            return false;
        }

        // 7. taskas - negali buti pirmas simbolis uz @
        if (email[etaPosition + 1] === '.') {
            console.warn('ERROR: email domain-part negali prasideti tasku.');
            return false;
        }

        // 8. taskas - negali buti 2 is eiles (niekur)
        if (email.includes('..')) {
            console.warn('ERROR: email negali tureti dvieju is eiles einanciu tasku.');
            return false;
        }

        // 9. taskas - gali buti trecias arba ketvirtas (arciausiai) nuo galo uz @
        if (email[emailLength - 2] === '.' ||
            email[emailLength - 1] === '.') {
            console.warn('ERROR: taskas negali buti paskutinis arba pries paskutinis simbolis.');
            return false;
        }

        // 10. validus - tik [lotyniskos/angliskos raides, @, ., [0..9]]
        const lettersLower = 'qwertyuiopasdfghjklzxcvbnm';
        const lettersUpper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        const numbers = '7894561230';
        const symbols = '@.';
        const whitelist = lettersLower + lettersUpper + numbers + symbols;

        for (const letter of email) {
            if (!whitelist.includes(letter)) {
                console.warn(`ERROR: "${letter}" neleidzimas email adrese.`);
                return false;
            }
        }

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