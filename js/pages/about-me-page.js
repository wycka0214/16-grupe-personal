"use strict";
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Newsletter } from '../components/Newsletter.js';

new Header({
    selector: '#main_header'
});
new Footer({
    selector: '#main_footer'
});
new Newsletter({
    selector: '#footer_newsletter',
    insertPosition: 'beforeend'
});