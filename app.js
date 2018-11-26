const express        = require("express"),
      bodyParser     = require("body-parser"),
      mongoose       = require('mongoose'),
      passport       = require("passport"),
      flash          = require("connect-flash"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override");
      app            = express(),
      User           = require("./models/user"),
      seedDb         = require("./seeds");

const commentRoutes = require("./routes/comments"),
      catsRoutes    = require("./routes/cats"),
      indexRoutes   = require("./routes/index");

// seedDb();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//// passport config
app.use(require("express-session")({
    secret: "cats are the best!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

const mongoUrl = "mongodb://balundev:ali123123@ds255463.mlab.com:55463/catdb";
mongoose.connect(mongoUrl, {useNewUrlParser: true});

let db = mongoose.connection;
///checking db connection
db.on('connected', () => {
    console.log("connected to db");
});
db.on('disconnected', () => {
    console.log("disconnected from db")
});

app.use("/", indexRoutes);
app.use("/cats", catsRoutes);
app.use("/cats/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log('listening to port 3000');
});