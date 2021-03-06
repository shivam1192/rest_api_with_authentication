const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

// connect to db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log("you are connected with db")
})

// import module
const authRoute = require("./routes/auth");
const route = require("./routes/routes")
app.use(express.json())
// routes middleware
app.use("/api/user",authRoute);
app.use("/api/post",route)


app.listen(3000,()=>{
    console.log("server running")
});
