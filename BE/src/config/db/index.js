const mongoose = require('mongoose');


async function connect () {
   try {
      const DB_URI = process.env.DATABASE_URL;
      await  mongoose.connect(DB_URI)
             .then(() =>  console.log('Kết nối thành công!'));
   } catch (error) {
        throw error
   }
}

module.exports = { connect }