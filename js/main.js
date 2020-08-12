"use strict";
import { Services } from './Services.js';
import { Footer } from './Footer.js';

new Services('#services_list', 'services.json');
new Footer({
    selector: '#main_footer'
});