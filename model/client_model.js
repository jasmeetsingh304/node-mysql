const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    emailId: {
        type: String
    },
    password:{
        type: String
    },
    token:{
        type: String
    }
});
mongoose.model('client',signupSchema)
