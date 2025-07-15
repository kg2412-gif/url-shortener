const mongoose=require('mongoose');
const appDb = require('../config/appdb');
const { required } = require('joi');

const appURLSchema=mongoose.Schema({
    base_url:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        unique:true,
        required:true
    }
}, {
    timestamps:true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;  
            return ret;
        }
    }
});

// const entityURL=mongoose.model("entityURL",entityURLSchema);
const appURL=appDb.model("appURL",appURLSchema);

module.exports=appURL;