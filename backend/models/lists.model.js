const mongoose=require("mongoose");

module.exports=mongoose.model("Lists",new mongoose.Schema({
    name: String,
    description: String,
    user:String,
    created_at: { type: Date, default: Date.now },
    tasks:[
        {
            content: String,
            state: { type: Boolean, default: false},
            created_at: { type: Date, default: Date.now }
        }
    ]
}));