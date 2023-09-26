const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoute = require("./routes/auth");

//////
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("LOCAL Connection"))
  .catch((err) => {
    console.error(err);
});
//////

//////
app.use(express.json({limit: '120mb'}));
app.use(express.urlencoded({limit: '120mb'}));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}));
////////////

////////////--
//Routes
app.use("/api/auth", authRoute);
app.use("/", function(req, res){
    //res.send("Hello World");
    res.sendFile(__dirname + "/index.html");
});
/////////////////////////////////////

const port = process.env.PORT || 2525;
app.listen(port, () => {
    console.log(`listneing on port ${port}!`)
});