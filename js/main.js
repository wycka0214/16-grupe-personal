"use strict";
import servicesData from '../data/services.js';

import { Ajax } from './Ajax.js';
import { Services } from './Services.js';


const request = new Ajax('services.json');
const services = new Services('#services_list', servicesData);

services.render();