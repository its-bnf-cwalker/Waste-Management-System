const Register = require("../models/registers.js")

module.exports.updateRegister = async (req, res, next)=>{
    try{
        const updatedReg = await Register.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true});
        res.status(200).json(updatedReg);
    }catch(err){
        next(err)
    }
}

module.exports.deleteRegister = async (req, res, next)=>{
    try{
        await Register.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Your Pickup has been deleted");
    }catch(err){
        next(err)
    }
}

module.exports.getRegister = async (req, res, next)=>{
    try{
        const Registered = await Register.findById(
            req.params.id
        );
        res.status(200).json(Registered)
    }catch(err){
        next(err)
    }
}

module.exports.getRegisters = async (req, res, next)=>{
    try{
        const Registers = await Register.find();
        res.status(200).json(Registers);
    }catch(err){
        next(err)
    }
}