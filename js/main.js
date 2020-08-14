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




console.log(Newsletter.isValidEmail(), '->', false);
console.log(Newsletter.isValidEmail(58415), '->', false);
console.log(Newsletter.isValidEmail('5151'), '->', false);
console.log(Newsletter.isValidEmail('absdkaskdfakjndfl; ansdfjnasjkdfnkjasndjfknasjkdnfkjasndfjnasjkdfkasndfknaskdjfnasdnfakansddkfnaskjdndfasdf'), '->', false);
console.log(Newsletter.isValidEmail('vardenis.gmail.com'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@@gmail.com'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@pavardenis@gmail.com'), '->', false);
console.log(Newsletter.isValidEmail('@gmail.com'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@a.lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@a1lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@.a1lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@a1..lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis..pavardenis@a1..lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis..pavardenis@a1.lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis..pavardenis@a1.lt'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@a1l.t'), '->', false);
console.log(Newsletter.isValidEmail('vardenis@a1lt.'), '->', false);
console.log(Newsletter.isValidEmail('vardenis<>/*-+@a1.lt'), '->', false);

console.log(Newsletter.isValidEmail('a@a1.lt'), '->', true);
console.log(Newsletter.isValidEmail('vardenis.pavardenis@gmail.lt'), '->', true);
console.log(Newsletter.isValidEmail('vardenis.pavardenis@gmail.com'), '->', true);