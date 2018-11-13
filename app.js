const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb");
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


const mongoUrl = "mongodb://balundev:ali123123@ds255463.mlab.com:55463/catdb";

mongoose.connect(mongoUrl, {useNewUrlParser: true});

let db = mongoose.connection;
db.on('connected', ()=>{
    console.log("connected to db");
});
/// schema
const catSchema = new mongoose.Schema({
    name:String,
    image:String
});
const Cat = mongoose.model("Cat", catSchema);


db.on('disconnected', ()=>{
    console.log("disconnected from db")
});

app.get('/', (req,res)=>{
    res.render("landing")
});

/// show all cats from DB
app.get('/cats', (req,res)=>{
    Cat.find({},(err,allCats)=>{
        if(err){
            console.log("error find")
        }else{
            console.log(allCats);
            res.render("cats", {cats: allCats})
        }
    });
});
/// add new cat to DB
app.post("/cats", (req,res)=>{

    const newCat = {
        name: req.body.name,
        image: req.body.image
    };
    Cat.create(newCat, (err, cat)=>{
        if(err) console.log("wrong");
        console.log("saved");
        res.redirect('/cats');
    });
});

app.get('/cats/new', (req,res)=>{
    res.render("new")
});

app.listen(3000,()=>{
    console.log('listening to port 3000');
});