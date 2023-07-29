const mongoose = require('mongoose');

const connect = async() =>{
    var db = await mongoose.connect("mongodb://127.0.0.1:27017/");
}

module.exports = connect;
