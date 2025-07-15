module.exports = function validateRequest(schema,property='body'){
    return(req,res,next) => {
        const{error,value} =schema.validate(req[property]);
    if(error){
        error.name= "ValidationError";
        return next(error);
    }
    next();
    };
};