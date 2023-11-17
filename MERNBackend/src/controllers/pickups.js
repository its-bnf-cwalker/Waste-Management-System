const pickup = require("../models/pickup.js")

module.exports.createPickup = async (req, res, next)=>{
    const newPickup = new pickup(req.body);
    try{
        const savedPick = await newPickup.save();
        res.status(200).json(savedPick)
        
    }catch(err){
        next(err)
    }
}

module.exports.updatePickup = async (req, res, next)=>{
    try{
        const updatedPick = await pickup.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body},
            {new: true});
        res.status(200).json(updatedPick);
    }catch(err){
        next(err)
    }
}

module.exports.deletePickup = async (req, res, next)=>{
    try{
        await pickup.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Your Pickup has been deleted");
    }catch(err){
        next(err)
    }
}

module.exports.getPickup = async (req, res, next)=>{
    try{
        const Pickup = await pickup.findById(
            req.params.id
        );
        res.status(200).json(Pickup)
    }catch(err){
        next(err)
    }
}

module.exports.getPickups = async (req, res, next)=>{
    try{
        const Pickups = await pickup.find();
        res.status(200).json(Pickups);
    }catch(err){
        next(err)
    }
}

// module.exports.PickupType  = async (req, res, next)=>{
//     const 
// }