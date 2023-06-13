const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener',
      version: '1.0.0',
      description: 'This is an API documentation for the URL shortener API. Created with node.js and express.',
      contact: {
        "name": "James Ochapa",
        "url": "https://github.com/Ocee1",
        "email": "ocjay24@gmail.com",
      },
    },
    
    servers: [
      {
        "url": "http://localhost:4000",
        "description": "Local Server",
      },
      {
        "url": "http://localhost:4000",
        "description": "Production Server",
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
};

module.exports = swaggerDocs;