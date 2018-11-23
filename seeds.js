const mongoose = require("mongoose");
const Cats = require("./models/cat");
const Comment = require("./models/comment");

let data =[
    {
        name: "first cat",
        image: "https://cdn.pixabay.com/photo/2018/10/05/16/27/cat-3726308_960_720.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis consectetur cupiditate delectus dolorum earum enim esse expedita explicabo, fugiat libero modi natus odio optio quas quisquam repudiandae rerum tempore vel vero! Adipisci aspernatur culpa debitis eaque esse, facilis incidunt iure laudantium maxime minima qui rem tenetur unde vel voluptates."
    },
    {
        name: "second cat",
        image: "https://cdn.pixabay.com/photo/2018/07/22/20/36/cat-3555461_960_720.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis consectetur cupiditate delectus dolorum earum enim esse expedita explicabo, fugiat libero modi natus odio optio quas quisquam repudiandae rerum tempore vel vero! Adipisci aspernatur culpa debitis eaque esse, facilis incidunt iure laudantium maxime minima qui rem tenetur unde vel voluptates."
    },
    {
        name: "third cat",
        image: "https://cdn.pixabay.com/photo/2016/09/18/22/40/cat-1679192_960_720.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis consectetur cupiditate delectus dolorum earum enim esse expedita explicabo, fugiat libero modi natus odio optio quas quisquam repudiandae rerum tempore vel vero! Adipisci aspernatur culpa debitis eaque esse, facilis incidunt iure laudantium maxime minima qui rem tenetur unde vel voluptates."
    }
];

let seedDB = ()=>{
    Comment.remove({},(err)=>{
        if(err) console.log(err);
        console.log("removed camments")
    });
    Cats.remove({},(err)=>{
        if(err){
            console.log(err);
        }
        console.log("cats deleted!");

        data.forEach((seed)=>{
            Cats.create(seed, (err,cats)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("added cats");
                    Comment.create({
                        text: "best cats ever",
                        author: "alan"
                    },(err, comment)=>{
                        if(err){
                            console.log(err);
                        } else {
                            console.log("saved comment");
                            cats.comments.push(comment);
                            cats.save();
                            console.log("created comment")
                        }
                    });
                }
            })
        })
    })
};

module.exports = seedDB;