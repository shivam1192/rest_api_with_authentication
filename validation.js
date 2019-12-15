const Joi = require("@hapi/joi")

const validationuser = (data ) => {
    const schema = {
        name: Joi.string().required().max(255).min(6),
        email:  Joi.string().required().min(6).max(255).email(),
        password:  Joi.string().required().min(6).max(255)
    }
     return Joi.validate(data,schema)   
}

const loginuser = (data)=>{
   const schema ={
       email : Joi.string().required().max(255).min(6),
       password:Joi.string().required().max(255).min(6)
   }
   return Joi.validate(data,schema)
}

module.exports.validationuser = validationuser
module.exports.loginuser = loginuser