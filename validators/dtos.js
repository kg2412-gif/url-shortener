const Joi=require('joi')

const createUrlSchema = Joi.object({

    short_code:Joi.string().min(11).max(11),
    original_url:Joi.string().uri().required(),
    user_id:Joi.string(),
    custom_alias:Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).message('custom_alias can only contain letters, numbers, underscores, and hyphens').optional()

});

const updateUrlSchema =Joi.object({
    original_url:Joi.string().uri(),
    custom_alias:Joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).message('custom_alias can only contain letters, numbers, underscores, and hyphens').optional()
}).min(1);

const shortCodeCheck = Joi.object({
  short_code: Joi.string().min(3).max(30).required()
});

const createEntitySchema = Joi.object({
    short_code:Joi.string().min(8).max(8),
    original_url:Joi.string().uri().required(),
    entity_type:Joi.string().min(3).max(40).required(),
    entity_id:Joi.string().required()
});

const updateEntitySchema =Joi.object({
    original_url:Joi.string().uri(),
    entity_type:Joi.string().min(3).max(40),
    entity_id:Joi.string()
}).min(1);

const entityShortCheck = Joi.object({
  short_code: Joi.string().min(8).max(8).required()
});

const registerAppSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  base_url: Joi.string().uri().required()
});

module.exports={createUrlSchema,updateUrlSchema, shortCodeCheck, createEntitySchema, entityShortCheck,registerAppSchema};
