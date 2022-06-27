const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require("path");
require("dotenv").config({ path: ".env" });


//app config
const app = express()

//middlware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());



//adminhamaldb
// Configure Mongo
const db = "mongodb://localhost:27017/hamalsignin";

// Connect to Mongo with Mongoose
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

const hamalusers={
  personalnumber: String,
  password: String
};





//reportdb
const dab = "mongodb://localhost:27017/reportDB";

// Connect to Mongo with Mongoose
mongoose.connect(
    dab,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

const reportschema={
  name:Text,
  lastname:Text,
  personalnumber: String,
  cellphone:Number,
  yhida:String,
  typevent:String,
  datevent:Date,
  mikom:String,
  pirot:String
};

const Report=mongoose.model("Report",reportschema);

let reports = [];

app.post("/report", function(req,res){

  const report= new Report({
    name:req.body.name,
    lastname:req.body.lastname,
    personalnumber: req.body.personalnumber,
    cellphone:req.body.cellphone,
    yhida:req.body.yhida,
    typevent:req.body.typevent,
    datevent:req.body.datevent,
    mikom:req.body.mikom,
    pirot:req.body.pirot
  });
  report.save();
  res.redirect("/signin");
});



//reportrekemdb
const dabrek = "mongodb://localhost:27017/reportrekemDB";

// Connect to Mongo with Mongoose
mongoose.connect(
    dabrek,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

const reportrekemschema={
  name:Text,
  lastname:Text,
  personalnumber: String,
  cellphone:Number,
  yhida:String,
  typevent:String,
  datevent:Date,
  mikom:String,
  pirot:String
};

const Reportrekem=mongoose.model("Reportrekem",reportrekemschema);

let reportsrekem = [];

app.post("/reportrekem", function(req,res){

  const reportrekem= new Reportrekem({
    name:req.body.name,
    lastname:req.body.lastname,
    personalnumber: req.body.personalnumber,
    cellphone:req.body.cellphone,
    yhida:req.body.yhida,
    typevent:'רק"מ',
    datevent:req.body.datevent,
    mikom:req.body.mikom,
    pirot:req.body.pirot
  });
  report.save();
  res.redirect("/signin");
});



//user routes 
const authRoutes = require('./routes/authentication/auth');
const userRoutes = require('./routes/authentication/user');

app.use('/api', authRoutes)
app.use('/api', userRoutes)
//general routes
const candidateRoutes = require("./routes/general/candidate");
const candidateineshkolRoutes = require("./routes/general/candidateineshkol");
const candidatepreferenceRoutes = require("./routes/general/candidatepreference");
const candidatepreferencerankingRoutes = require("./routes/general/candidatepreferenceranking");
const eshkolRoutes = require("./routes/general/eshkol");
const finalcandidatepreferenceRoutes = require("./routes/general/finalcandidatepreference");
const finaleshkolRoutes = require("./routes/general/finaleshkol");
const finalunitpreferenceRoutes = require("./routes/general/finalunitpreference");
const jobinmahzorRoutes = require("./routes/general/jobinmahzor");
const jobRoutes = require("./routes/general/job");
const mahzorRoutes = require("./routes/general/mahzor");
const movementRoutes = require("./routes/general/movement");
const populationRoutes = require("./routes/general/population");
const unitRoutes = require("./routes/general/unit");
const unitpreferenceRoutes = require("./routes/general/unitpreference");
const unitpreferencerankingRoutes = require("./routes/general/unitpreferenceranking");

app.use('/api',candidateRoutes)
app.use('/api',candidateineshkolRoutes)
app.use('/api',candidatepreferenceRoutes)
app.use('/api',candidatepreferencerankingRoutes)
app.use('/api',eshkolRoutes)
app.use('/api',finalcandidatepreferenceRoutes)
app.use('/api',finaleshkolRoutes)
app.use('/api',finalunitpreferenceRoutes)
app.use('/api',jobinmahzorRoutes)
app.use('/api',jobRoutes)
app.use('/api',mahzorRoutes)
app.use('/api',movementRoutes)
app.use('/api',populationRoutes)
app.use('/api',unitRoutes)
app.use('/api',unitpreferenceRoutes)
app.use('/api',unitpreferencerankingRoutes)

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'));
    });  
  }

  //listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
