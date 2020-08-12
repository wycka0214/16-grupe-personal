"use strict";
import { Services } from './Services.js';
import { Footer } from './Footer.js';
import { Newsletter } from './Newsletter.js';

new Services('#services_list', 'services.json');
new Footer({
    selector: '#main_footer'
});
new Newsletter({
    selector: '#footer_newsletter',
    insertPosition: 'beforeend'
});