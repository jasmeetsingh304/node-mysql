const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    address: {
        type: String
    }
});

mongoose.model('users',employeeSchema,"users")
