const router = require('express').Router();
const userModel = require('./peer_model');

router.post('/streamId', async(req,res)=>{
    const streamId = req.body.streamId;
    const foundUser = await userModel.findOne({streamId:streamId});
    if(!foundUser){
        res.json({success:false, message:'user not found'});
        return ;
    }
    console.log(foundUser);
    res.json({success:true, message:foundUser});
});
router.post('/peerId', async(req,res)=>{
    const peerId = req.body.peerId;
    const foundUser = await userModel.findOne({peerId:peerId});
    if(!foundUser){
        res.json({success:false, message:'user not found'});
        return ;
    }
    console.log(foundUser);
    res.json({success:true, message:foundUser});
});
router.post('/store_peer', async(req,res)=>{
    try{
        const streamId = req.body.streamId;
        const foundUser = await userModel.findOne({streamId:streamId});
        if(foundUser){
            await userModel.findOneAndUpdate({streamId:streamId},req.body);
            res.json({success:true, message:'Account created successfully'});
        }
        else{
            const userData = req.body;
            console.log(userData);
            const newUser = new userModel(userData);
            await newUser.save();
            res.json({success:true, message:'Account created successfully'});
        }
    }
    catch(err){
        res.json({success:false, message:err.message});
    }
});
module.exports = router;