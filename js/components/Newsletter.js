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
        const validationResult = Newsletter.isValidEmail(this.email);
        if (!validationResult.valid) {
            return this.displayFormMessage(validationResult.messages, 'error');
        } else {
            this.clearFormMessage();
        }

        this.sendRequest();
    }

    static isValidEmail(email) {
        let valid = true;
        let messages = [];

        // 0. tekstas
        if (typeof email !== 'string') {
            return {
                valid: false,
                messages: ['Email turi buti tekstinis']
            }
        }

        const emailLength = email.length;

        // 1. ilgis - min 7 simboliai (a@a1.lt)
        if (emailLength < 7) {
            messages.push('email ne maziau 7 simboliu.');
            valid = false;
        }

        // 2. ilgis - max 100
        if (emailLength > 100) {
            messages.push('email ne daugiau 100 simboliu.');
            valid = false;
        }

        // 3. @ === 1
        let etaCount = 0;
        let etaPosition = null;
        for (let i = 0; i < emailLength; i++) {
            if (email[i] === '@') etaCount++;
            if (email[i] === '@' && etaPosition === null) etaPosition = i;
        }
        if (etaCount !== 1) {
            messages.push('email tik vienas @ simbolis.');
            valid = false;
        }

        // 4. pries @ - bent 1 simbolis
        if (email[0] === '@') {
            messages.push('email turi tureti local-part (tekstas priesais @ simboli).');
            valid = false;
        }

        // 5. uz @ - min 5 simboliai
        const symbolsAfterEta = emailLength - etaPosition - 1;
        if (symbolsAfterEta < 5) {
            messages.push('email turi tureti domain-part is min 5 simboliu (uz @).');
            valid = false;
        }

        // 6. taskas - bent vienas uz @
        let dotCount = 0;
        for (let i = 0; i < emailLength; i++) {
            if (email[i] === '.') dotCount++;
        }
        if (dotCount === 0) {
            messages.push('email domain-part turi tureti bent viena taska.');
            valid = false;
        }

        // 7. taskas - negali buti pirmas simbolis uz @
        if (email[etaPosition + 1] === '.') {
            messages.push('email domain-part negali prasideti tasku.');
            valid = false;
        }

        // 8. taskas - negali buti 2 is eiles (niekur)
        if (email.includes('..')) {
            messages.push('email negali tureti dvieju is eiles einanciu tasku.');
            valid = false;
        }

        // 9. taskas - gali buti trecias arba ketvirtas (arciausiai) nuo galo uz @
        if (email[emailLength - 2] === '.' ||
            email[emailLength - 1] === '.') {
            messages.push('taskas negali buti paskutinis arba pries paskutinis simbolis.');
            valid = false;
        }

        // 10. validus - tik [lotyniskos/angliskos raides, @, ., [0..9]]
        const lettersLower = 'qwertyuiopasdfghjklzxcvbnm';
        const lettersUpper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        const numbers = '7894561230';
        const symbols = '@.';
        const whitelist = lettersLower + lettersUpper + numbers + symbols;

        for (const letter of email) {
            if (!whitelist.includes(letter)) {
                messages.push(`ERROR: "${letter}" neleidzimas email adrese.`);
                valid = false;
            }
        }

        return { valid, messages, email };
    }

    clearFormMessage() {
        this.messagesDOM.classList.remove('show');
        this.messagesDOM.innerHTML = '';
    }

    displayFormMessage(messages, messagesType = 'error') {
        // TODO: atvaizduoja tiek formos errorus, tiek ir sekminga subscribe ivyki

        let HTML = '';
        for (const msg of messages) {
            HTML += `<li>${msg}</li>`;
        }
        this.messagesDOM.innerHTML = HTML;
        this.messagesDOM.classList.add('show');

        switch (messagesType) {
            case 'error':
                this.messagesDOM.classList.add('error');
                break;

            case 'success':
                this.messagesDOM.classList.remove('error');
                break;

            default:
                throw 'ERROR: nenumatytas zinuciu tipas.';
        }
    }

    sendRequest() {
        // const email = this.inputDOM.value;

        // TODO: naudojantis Ajax funkcija, siunciame email i serveri
        const submitSuccess = true;
        if (submitSuccess) {
            this.displayFormMessage(['Subscribed successfully!'], 'success');
        } else {
            this.displayFormMessage(['You already subscribed!'], 'error');
        }
    }

    render() {
        const positionOptions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
        const HTML = `<form class="form">
                        <input type="email" value="" placeholder="Enter email address">
                        <div class="btn fa fa-long-arrow-right"></div>
                        <ol class="messages error"></ol>
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