const app=require("express")();
const Lists=require("../models/lists.model");

app.get("/lists", (req,res)=>{
    Lists.find()
    .then(data=>{
        res.json({code:200,data:data});
    }).catch(err=>{
        res.json({code:400,data:err});
    });
});

app.post("/lists", (req,res)=>{
    const lists={
        name: req.body.name,
        description: req.body.description,
        user:req.body.user,
        created_at: new Date(),
        tasks:[]
    };
    Lists.create(lists)
    .then(data=>{
        res.json({code:200,data:data});
    }).catch(err=>{
        res.json({code:400,data:err});
    });
});

app.put("/lists/:id", (req,res)=>{
    const lists={
        name: req.body.name,
        description: req.body.description,
        user:req.body.user,
        tasks:req.body.tasks
    };
    Lists.updateOne({_id:req.params.id},{$set:lists},{new:true})
    .then(data=>{
        res.json({code:200,data:data});
    }).catch(err=>{
        res.json({code:400,data:err});
    });
});

app.delete("/lists/:id", (req,res)=>{
    Lists.deleteOne({_id:req.params.id})
    .then(data=>{
        res.json({code:200,data:data});
    }).catch(err=>{
        res.json({code:400,data:err});
    });
});

module.exports=app;