const { mongo } = require('mongoose');

/* eslint-disable */
require('dotenv').config();

const { NODE_ENV } = process.env;
//@ts-ignore
let mongoURI:string = '';

if (NODE_ENV === 'test') {
	//@ts-ignore
	mongoURI = process.env.DB_CONNECTION_TEST || 'mongodb://localhost/journal-app';
}
else {
	//@ts-ignore
	mongoURI = process.env.DB_CONNECTION || 'mongodb://localhost/journal-app';
}

module.exports = mongoURI;
