"use strict";
import servicesData from '../data/services.js';
import servicesData2 from '../data/services2.js';

import { Ajax } from './Ajax.js';
import { Services } from './Services.js';


const request = new Ajax('services.json');
const services = new Services('#services_list', servicesData);
const services2 = new Services('#services_list_2', servicesData2);