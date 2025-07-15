

const AppError=require("../utils/appError");
const errorHandler =(error,req,res,next) => {
    console.log(error);
    if(error.name === "ValidationError"){
        return res.status(400).send({
            type:"ValidationError",
            details: error.details?.[0]?.message ||"Invalid Input",
        });
    }
    
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            errorCode:error.errorCode,
            message: error.message
        });
    }

    return res.status(500).json({
        errorCode: "INTERNAL_SERVER_ERROR",
        message:"Something went Wrong"
    });
};

module.exports=errorHandler;