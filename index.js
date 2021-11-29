const express=require("express");

const mongoose=require("mongoose");


const connect=()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/data");
}



const compSchema=new mongoose.Schema({
        comp_Name:{type:String,required:true},
        comp_Empnum:{type:Number,required:true},
        open_jobs:{type:Number, required:true},
        comp_optCost:{type:Number, required:true},
},
{
  versionKey:false,
  timestamps:true,
}
)

const Comp=mongoose.model("comp",compSchema);


const jobSchema=new mongoose.Schema({
    Skill:{type:String, required:true},
    City:{type:String, required:true},
    WFH:{type:String, required:true},
    Notice:{type:String,required:true},
    Rating:{type:Number,required:true},

    company_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comp",
    required:true,
    }
},
{
  versionKey:false,
  timestamps:true,
}
)


const Job=mongoose.model("job",jobSchema);

const app=express();

app.use(express.json());


//COMPANY

//POST
app.post("/comps",async(req,res)=>{
    try{
       const comp=Comp.create(req.body);
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})




//JOBS

//POST
app.post("/jobs",async(req,res)=>{
    try{
       const job=Job.create(req.body);
       return res.status(201).send(job);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})






app.listen(1234,async function(){
    await connect();
    console.log("Listening on Port 1234");
})