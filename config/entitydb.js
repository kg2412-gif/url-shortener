const mongoose = require('mongoose');


const entityDb = mongoose.createConnection(process.env.ENTITY_MONGO_URI);

entityDb.on('connected', () => {
  console.log('Connected to Entity DB');
});

entityDb.on('error', (err) => {
  console.error('URL DB connection error:', err.message);
});
module.exports = entityDb;
