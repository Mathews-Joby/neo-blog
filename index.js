const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const path = require("path");

require('dotenv').config();

const blogRouters = require('./routes/Post');
const passwordReset = require('./routes/PasswordReset')
const userRouters = require('./routes/User');
const categoryRouter = require('./routes/Category');
// const path = require('path/posix');
require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());

//routes
app.get('/data', (req, res) => {
    console.log("A request is seen")
    res.send('hello');
});

app.use('/post', blogRouters);
app.use('/password-reset', passwordReset)
app.use('/user', userRouters);
app.use('/category', categoryRouter);
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get('/', (req, res) => {
    res.send('API Working');
});


const dburi = "mongodb+srv://MathewsGit:AdminAccess1234@cluster0.ha1bc.mongodb.net/neoBlogDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

// database connection setup
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to the database!'))
.catch((err) => console.log('unable to connect to the database! Error: \n' + err));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    },filename:(req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage});
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded.");
})

app.get('/app', (req, res) => {
    console.log("A request is seen")
});
//port listen setup

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}else {
    app.get("*", (req, res) => {
        res.send("Api is running");
    });
}
//for deployment

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on ` + 8000);
});

// exports.app = functions.https.onRequest(app);
