const mongoose = require('mongoose');



const appDb = mongoose.createConnection(process.env.APP_MONGO_URI);

appDb.on('connected', () => {
  console.log('Connected to App DB');
});

appDb.on('error', (err) => {
  console.error('URL DB connection error:', err.message);
});
module.exports = appDb;
