import menu from '../../data/main-menu.js';

class Header {
    constructor(params) {
        this.selector = params.selector;
        this.DOM = null;
        this.menuIconsDOM = null;
        this.navBackgroundDOM = null;

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

        return true;
    }

    addEvents() {
        this.menuIconsDOM.addEventListener('click', () => {
            this.DOM.classList.add('expanded');
        });

        this.navBackgroundDOM.addEventListener('click', () => {
            this.DOM.classList.remove('expanded');
        });
    }

    render() {
        let menuHTML = '';
        for (const link of menu) {
            console.log(link);
            menuHTML += `<a ${location.pathname === link.href ? 'class="active"' : ''} href="${location.origin + link.href}">${link.name}</a>`;
        }

        this.DOM.innerHTML = `<div class="row">
                                <div class="col-12">
                                    <img class="logo" src="${location.origin}/img/logo.png" alt="Personal portfolio logo">
                                    <div class="menu-icons">
                                        <i class="fa fa-bars"></i>
                                        <i class="fa fa-times"></i>
                                    </div>
                                    <div class="nav-background"></div>
                                    <nav>${menuHTML}</nav>
                                </div>
                            </div>`;

        this.menuIconsDOM = this.DOM.querySelector('.menu-icons');
        this.navBackgroundDOM = this.DOM.querySelector('.nav-background');
    }
}

export { Header };