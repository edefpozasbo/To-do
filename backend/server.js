const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/lists",{useNewUrlParser: true });

const bodyparser=require("body-parser");
const cors=require("cors");
const express=require("express");
const app=express();
const listscontroller=require("./controllers/lists.controller");


app.use(cors({origin:"http://localhost:4200"}));
app.use(bodyparser.json())
app.use(listscontroller);

app.listen(3000,()=>{
    console.log("Servidor creado");
});