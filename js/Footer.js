import socialsData from '../data/socials.js';
import { renderSocials } from './renderSocials.js';

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
                                    <h3>About Me</h3>
                                    <p>We have tested a number of registry fix and clean utilities and present our top 3 list on our site for your convenience.</p>
                                    <p>Copyright &copy;2020 All rights reserved | This template is made with <i class="fa fa-heart-o"></i> by <a href="#" target="_blank">Colorlib</a></p>
                                </div>
                                <div id="footer_newsletter" class="col-12 col-md-6 col-lg-5">
                                    <h3>About Me</h3>
                                    <p>Stay updated with our latest trends</p>
                                </div>
                                <div class="col-12 col-lg-2">
                                    <h3>Follow me</h3>
                                    <p>Let us be social</p>
                                    <div class="socials">${renderSocials(socialsData)}</div>
                                </div>
                            </div>`;
    }
}

export { Footer };