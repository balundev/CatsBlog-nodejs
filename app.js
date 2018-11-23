const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const Cats = require("./models/cat");
const Comment = require("./models/comment");
const seedDb = require("./seeds");

seedDb();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


const mongoUrl = "mongodb://balundev:ali123123@ds255463.mlab.com:55463/catdb";

mongoose.connect(mongoUrl, {useNewUrlParser: true});

let db = mongoose.connection;
db.on('connected', () => {
    console.log("connected to db");
});


db.on('disconnected', () => {
    console.log("disconnected from db")
});

app.get('/', (req, res) => {
    res.render("landing")
});

/// show all cats from DB
app.get('/cats', (req, res) => {
    Cats.find({}, (err, allCats) => {
        if (err) {
            console.log("error find")
        } else {
            console.log(allCats);
            res.render("cats/index", {cats: allCats})
        }
    });
});
/// add new cat to DB
app.post("/cats", (req, res) => {

    const newCat = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Cats.create(newCat, (err, cat) => {
        if (err) console.log("wrong");
        console.log("saved");
        res.redirect('/cats');
    });
});
// show form
app.get('/cats/new', (req, res) => {
    res.render("cats/new")
});

app.get('/cats/:id', (req, res) => {
    Cats.findById(req.params.id).populate("comments").exec((err, foundCat) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCat);
            res.render("cats/show", {cat: foundCat});
        }
    });
});

app.get('/cats/:id/comment/new', (req, res)=>{
    Cats.findById(req.params.id, (err,cat)=>{
       if(err){
           console.log(err)
       }else {
           res.render("comments/new",{cat: cat} )
       }
    });
});

app.post('/cats/:id/comments', (req, res)=>{
    Cats.findById(req.params.id, (err,cat)=>{
        if(err){
            console.log(err);
            res.redirect("/cats");
        }else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){console.log(err);
                }else {
                    cat.comments.push(comment);
                    cat.save();
                    res.redirect(`/cats/${cat.id}`)
                }
            })
        }
    })
});

app.listen(3000, () => {
    console.log('listening to port 3000');
});