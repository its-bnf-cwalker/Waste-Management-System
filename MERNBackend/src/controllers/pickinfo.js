const pickup = require("../models/pickup.js")

const getAllPickInfo = async(req, res, next)=>{
    let pickinfo;
    try{
        pickinfo = await pickup.find();
    }catch(err){
        console.log(err);
    }

    if(!pickinfo){
        return res.status(404).json({message: "No Pickup has been created"});
    }
    return res.status(200).json({pickinfo});
}

exports.getAllPickInfo = getAllPickInfo;