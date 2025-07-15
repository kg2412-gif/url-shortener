const mongoose=require('mongoose');
const entityDb = require('../config/entitydb');
const { number } = require('joi');

const entityURLSchema=mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    short_code:{
        type:String,
        required: true,
        unique:true
    },
    expiration_date:{
        type:Date,
    },
    original_url:{
        type:String,
        required:true
    },
    entity_type:{
        type:String,
        required:true
    },
    entity_id:{
        type:String,
        unique:true,
    },
    product_type:{
        type:String,
        required:false
    },
    extra_params:{
        type:Object,
        required:false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appURL',
        required: true,
        index: true
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
const entityURL=entityDb.model("entityURL",entityURLSchema);

module.exports=entityURL;