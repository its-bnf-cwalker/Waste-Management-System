
// *****************Register**********************

const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/registers");
const pickup = require("./models/pickup");
require("./db/conn.js");
const {createError} = require("../src/utils/error.js")
const {createPickup, updatePickup, deletePickup, getPickup, getPickups} = require("../src/controllers/pickups.js");
const {authRoute} = require("../src/routes/users.js");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
// const process = require("./.env")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const verify = require("../src/utils/verifyToken.js")
const {updateRegister, deleteRegister, getRegister, getRegisters} = require("../src/controllers/user.js")
const cors = require("cors")
const pickInfo = require("../src/controllers/pickinfo.js")

dotenv.config()


//Cookies
app.use(cookieParser())

// Port no.
const port = 3005;

app.use(cors())




// Statics pages
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path))




// Call of hbs pages
const templates_path = path.join(__dirname, "../templates/views")
app.set("view engine", "hbs");
app.set("views", templates_path)




// partial navbar
const partial_path = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partial_path)






// Json
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});







//----------------Home, Login and Register --------------

app.get("/", (req, res)=>{
    res.render("index")
});

app.get("/register", (req, res)=>{
    res.render("register")
})
app.post("/register", async (req, res)=>{
    try{
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        if(password === confirmpassword){
            res.send({message: "Register successful"})
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const UserRegister = new Register({
                username: req.body.username,
                email: req.body.email,
                tel: req.body.tel,
                password: hash,
                confirmpassword: hash,
            })
            await UserRegister.save()
            res.send({message: "User has been created"})
        }else{
            res.send({message: "password dosen't match"})
        }
    }catch(error){
        // next(error)
        res.send({message: "error"})
    }
})

app.get("/login",  (req, res, next)=>{
    res.render("login")
})

app.post("/login", async(req, res, next) =>{
    try{
        const useremail = await Register.findOne({email:req.body.email})
        if(!useremail){
            res.send({message: "User not registered"})
            next(createError(404, "User not found!"));   
        }
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, useremail.password)
        if(!isPasswordCorrect){
            res.send({message: "User Email or password incorrect"})
            next(createError(400, "Wrong password or useremail"));
        }

        res.send({message: "Login sucessful"})
        const token = jwt.sign({id: useremail._id, isAdmin: useremail.isAdmin}, `${process.env.JWT}`);

        const {confirmpassword, password, isAdmin, ...otherDetails} = useremail._doc;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails});
        
        res.status(200).json(useremail)
        
    }catch(err){
        next(err)
    }
});

app.get("/checkuser/:id", verify.verifyUser, (req, res, next)=>{
    res.send("Hello you are logged in and you can delete your account")
})

app.get("/checkAdmin/:id", verify.verifyAdmin, (req, res, next) =>{
    res.send("Hello Admin")
})

app.get("/checkauthentication", verify.verifyToken, (req, res, next)=>{
    res.send("Hello, U r authenticated")
})







// ------ PICKUP -----

app.get("/pickup", async(req, res)=>{
    res.render("pickup")
})

app.post("/pickup", createPickup);

app.put("/pickup/:id", updatePickup);

app.delete("/pickup/:id", deletePickup);
//verify.verifyUser
app.get("/pickup/find/:id", getPickup);

app.get("/pickups", getPickups);


// -----PICKUP INFO------

app.get("/pickup/info", pickInfo.getAllPickInfo)






//----------Users-------------

app.put("/register/:id", verify.verifyUser, updateRegister);

app.delete("/register/:id", verify.verifyUser, deleteRegister);

app.get("/register/:id", verify.verifyUser, getRegister);

app.get("/registers", verify.verifyAdmin, getRegisters);


// *******************LOGIN*******************************


app.listen(port, ()=>{
    console.log(`servre is running at port no ${port}`);
})