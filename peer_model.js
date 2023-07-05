const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    peerId:{
        type:String,
        required: true,
        unique:true,
    },
    streamId:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        required: true,
    },
    cam:{
        type:Number,
        required:true,
    },
    mic:{
        type:Number,
        required:true,
    },
});
const userModel = new model("user",userSchema);

module.exports = userModel;