const mongoose = require('mongoose');



const urlDb = mongoose.createConnection(process.env.MONGO_URI);

urlDb.on('connected', () => {
  console.log('Connected to URL DB');
});

urlDb.on('error', (err) => {
  console.error('URL DB connection error:', err.message);
});

module.exports = urlDb;
