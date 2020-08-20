const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://anirudh-admin:Test123@cluster0.aokrb.mongodb.net/Itemdb?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true });
//mongodb://localhost:27017/Itemdb
const itemSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
    Visibilty:
    { type: String,
      default: 'Yes'
    },
    createdAt:
       {
         type: Date,
         default: Date.now
       }
});
const item =mongoose.model("item",itemSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.listen(8080,function(){
  console.log("server on port 8080 is started");
})
app.get("/",function(req,res){
  //res.send("hello world");
  let today =date.getDate();
  item.find({Visibilty:"Yes"},function(err,output){
    if(err)
    {
      console.log(err);
    }
    else
    {
       console.log(output);

      }
      res.render("home",{day:today,item:output});
    })
});
app.get("/:history",function(req,res){
  let histDate = req.params.history+"T00:00:00.000Z";
  console.log(histDate);
  item.find({"createdAt":{"$gte":new Date(histDate)}},function(err,histout)
{
  if(err){
    console.log(err);
  }
  else{
    console.log(histout);
    res.render("hist",{day:histDate,item:histout});
  }
});
});
app.post("/",function(req,res)
{
  if (req.body.buttonadd ==="1")
  {
  let listValue = req.body.listValue;
  let mongoItem = new item({name:listValue});
  item.insertMany([mongoItem]);
  //console.log(req.body.buttonadd);
  console.log(listValue);
}
else
{
item.findOne(function(err,out){
    if(err)
    {
      console.log(err);
    }
    else
    {
    out.remove();
      }

    }).sort({_id:-1}).limit(1);

}
  res.redirect("/");
});
app.post("/delete",function(req,res){
  console.log(req.body.check);
  let del = req.body.check;
  item.updateOne({_id:del},{Visibilty:"No"},function(err,out){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("deleted");
    }
  });
  res.redirect("/");
});
app.get("/about",function(req,res){
  res.render("about");
})
