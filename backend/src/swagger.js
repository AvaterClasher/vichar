const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Blog API',
    description: 'API documentation for the Blog API',
  },
  host: 'localhost:5000'
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);