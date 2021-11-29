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
    },
},
{
  versionKey:false,
  timestamps:true,
}
)


const Job=mongoose.model("job",jobSchema);

const app=express();

app.use(express.json());


//COMPANY POST
app.post("/comps",async(req,res)=>{
    try{
       const comp=Comp.create(req.body);
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})




//JOBS POST
app.post("/jobs",async(req,res)=>{
    try{
       const job=Job.create(req.body);
       return res.status(201).send(job);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})




// 1  GET BY NAME and SKILL
app.get("/jobs/name&skill",async(req,res)=>{
    try{
       const jobs=await Job.find({$and:[{City:"California"},{Skill:"FrontEnd"}]}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 2 ALL WFH Jobs
app.get("/jobs/wfh",async(req,res)=>{
    try{
       const jobs=await Job.find({WFH:{$eq:"Yes"}}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 3 ALL NOTICE PERIOD ACCEPTABLE JOBS
app.get("/jobs/notice",async(req,res)=>{
    try{
       const jobs=await Job.find({Notice:{$eq:"Yes"}}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})

// 4(a) SORTING JOBS WITH RATING(low to high)
app.get("/jobs/sortLH",async(req,res)=>{
    try{
       const jobs=await Job.find().sort({Rating:1}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 4(b) SORTING JOBS WITH RATING(high to low)
app.get("/jobs/sortHL",async(req,res)=>{
    try{
       const jobs=await Job.find().sort({Rating:-1}).lean().exec();
       return res.status(201).send(jobs);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 5 DETAILS OF COMPANY
app.get("/comps",async(req,res)=>{
    try{
       const comp=await Comp.find().lean().exec();
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})


// 6 COMPANY WITH MOST OPEN JOBS
app.get("/comps/opnjob",async(req,res)=>{
    try{
       const comp=await Comp.find().sort({open_jobs:-1}).limit(1).lean().exec();
       return res.status(201).send(comp);
    }
    catch(e){
      return res.status(500).json({status:e.message});
    }
})



app.listen(1234,async function(){
    await connect();
    console.log("Listening on Port 1234");
})