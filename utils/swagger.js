const swaggerJSDoc = require('swagger-jsdoc');
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')
const mongooseToSwagger = require('mongoose-to-swagger');
const URL=require('../models/ShortURL')
const Entity=require('../models/entityURL')

const urlSchema = JSON.parse(JSON.stringify(mongooseToSwagger(URL)));
delete urlSchema.properties._id;
delete urlSchema.properties.__v;

const entitySchema = JSON.parse(JSON.stringify(mongooseToSwagger(Entity)));
delete entitySchema.properties._id;
delete entitySchema.properties.__v;


const createShortURL = {
  type: 'object',
  required: ['original_url'], 
  properties: {
    original_url: {
      type: 'string',
      example: 'https://www.amazon.com'
    },
    custom_alias: {
      type: 'string',
      example: 'tester'
    }
  }
};

const createEntityURL ={
  type: 'object',
  required: ['original_url','entity_type','entity_id'], 
  properties: {
    original_url: {
      type: 'string',
      example: 'https://www.amazon.com'
    },
    entity_type: {
      type: 'string',
      example: 'Electronics'
    },
    entity_id:{
      type: 'string',
      example: '10000000'
    }
  }
};
const App={
  type: 'object',
  required: ['name', 'base_url'],
  properties: {
    name: {
      type: 'string',
      example: 'MyApp'
    },
    base_url: {
      type: 'string',
      format: 'uri',
      example: 'https://myapp.com'
    },
    token: {
      type: 'string',
      example: 'abc123xyz456'
    }
  }
};

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:'CRUD API DOCS',
            version:'1.0.0'            
        },
        components:{
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'custom-token'
                }
            },
            schemas:{
                URL:urlSchema,
                createURL:createShortURL,
                Entity:entitySchema,
                createEntity: createEntityURL,
                App: App
            }
        },
        servers:[
            {
                url:'http://localhost:3000',
            },
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;