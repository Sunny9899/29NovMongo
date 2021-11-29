const express=require("express");

const mongoose=require("mongoose");


const connect=()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/data");
}

const jobSchema=new.mongoose.Schema({
    Skill:{type:String, required:true},
    City:{type:String, required:true},
    WFH:{type:String, required:true},
    Notice:{type:String,required:true},
    Rating:{type:Number,required:true},

    company_Id:{
        comp_Name:{type:String,required:true},
        comp_Empnum:{type:Number,required:true},
        open_jobs:{type:Number, required:true},
        comp_optCost:{type:Number, required:true},
    }
},
{
  versionKey:false,
  timestamps:true,
}
)


const Job=mongoose.model("job",jobSchema);

const app=express();

app.use