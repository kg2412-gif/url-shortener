const mongoose=require('mongoose');
const urlDb = require('../config/db');

const ShortURLSchema=mongoose.Schema({
    short_code:{
        type:String,
        required: true,
        unique:true
    },
    original_url:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        unique:true,
    },
    custom_alias:{
        type:String,
        required:false
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

const ShortURL = urlDb.model('ShortURL', ShortURLSchema);

module.exports=ShortURL;