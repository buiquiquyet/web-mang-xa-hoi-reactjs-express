const mongoose = require('mongoose');


async function connect () {
   try {
      await  mongoose.connect('mongodb://127.0.0.1:27017/FacebookWeb')
             .then(() =>  console.log('Kết nối thành công!'));
   } catch (error) {
        throw error
   }
}

module.exports = { connect }