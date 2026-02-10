const mongoose = require("mongoose");
const schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

//passportLocalMongoose = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose.default)

module.exports = new mongoose.model("User",userSchema);




