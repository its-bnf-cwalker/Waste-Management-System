const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://prashant:prashant@cluster0.kl4vozj.mongodb.net/Trashman?retryWrites=true&w=majority",{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify: false,
}).then(() => {
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`${e}`);
})