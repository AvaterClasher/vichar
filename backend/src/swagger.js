const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Blog API',
    description: 'API documentation for the Blog API',
  },
  schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
  host: process.env.NODE_ENV === 'production' ? 'vichar-qf8u.onrender.com' : `localhost:${process.env.PORT || 5000}`
};

console.log(doc.host)

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);