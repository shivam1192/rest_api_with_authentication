 const router = require("express").Router();
const User= require("../modal/schema")
const bcrypt =require("bcryptjs")

const {validationuser} = require("../validation")

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

 module.exports = router;