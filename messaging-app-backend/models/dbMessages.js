import mongoose from "mongoose";

const messagingSchema = new mongoose.Schema({
    message: {type:String},
    name: {type:String, required:true},
    timestamp: {type:String},
    received: {type:Boolean}
})

export default mongoose.model('messagingmessages', messagingSchema)