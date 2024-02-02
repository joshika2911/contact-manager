const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||8000
//schema
const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{timestamp:true
})
const userModel=mongoose.model("user",schemaData);

//create    http://localhost:8000/
app.get('/',async(req,res)=>{
    const data=await userModel.find({})
   res.json({sucess:true, data:data});
})


//create data || save data in mongodb   http://localhost:8000/create
//
app.post("/create",async(req,res)=>{
    console.log(req.body);
    const data= new userModel(req.body);
    await data.save()
    res.send({sucess:true,message:"data saves",data:data})
})
//update data   http://localhost:8000/update
//send {
    // id:""
    // name:"",
    // email:""}

app.put("/update",async(req,res)=>{
    console.log(req.body);
    const{_id,...rest}=req.body
    console.log(rest)
    const data=await userModel.updateOne({_id:_id},rest)
    res.send({sucess:true,message:"data updated",data:data})
})
//delete   http://localhost:8000/delete   
//send id
app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id;
console.log(id);
const data=await userModel.deleteOne({_id:id})
res.send({sucess:true,message:"data deleted",data:data})
})


mongoose.connect("mongodb://127.0.0.1:27017/curdoperation")
.then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
});

app.listen(PORT,()=>{
    console.log("running");
})