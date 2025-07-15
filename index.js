require("dotenv").config();
const connectEntityDB = require('./config/entitydb.js');
const appDb = require('./config/appdb.js');
const express = require("express");
const URLRouter=require("./routes/url.js");
const entityRouter=require("./routes/entity.js");
const appRouter=require("./routes/app.js");
const healthRouter=require("./routes/health.js");
const app = express();
const swaggerUI=require('swagger-ui-express');
const swaggerSpec = require("./utils/swagger.js");
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandler.js")

app.use(cors());

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health',healthRouter);


const port=process.env.PORT||8000;
app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});

//Routes

app.use('/short-url',URLRouter);
app.use('/entity',entityRouter);
app.use('/app',appRouter);

app.use(errorHandler);
