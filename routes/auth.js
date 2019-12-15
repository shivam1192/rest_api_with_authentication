 const router = require("express").Router();
const User= require("../modal/schema")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

const {validationuser,loginuser} = require("../validation")

router.post("/register",async(req,res)=>{

    const {error}= validationuser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const repeateemail = await User.findOne({ email: req.body.email})
    if(repeateemail) return res.status(400).send("email already exist")

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashedpassword
    })
    try{
        const savedUser = await user.save()
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

router.post("/login",async(req,res)=>{

      const {error} = loginuser(req.body)
      if(error) return res.status(400).send(error.details[0].message)

      const existemail = await User.findOne({email:req.body.email})
      if(!existemail) return res.status(400).send("email not exist")

       const passwxist = await bcrypt.compare(req.body.password,existemail.password)
       if(!passwxist) return res.status(400).send("password doesn't match")


       const token = jwt.sign({ _id : existemail._id},process.env.TOKEN)
       res.header('auth-token', token).send(token)
    
     })


 module.exports = router;