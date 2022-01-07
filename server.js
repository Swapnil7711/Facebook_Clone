import router from "./router"
import express from "express"
import { DB_URL } from "./config"
import { errorHandler } from "./middlewares/errorHandler"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from 'body-parser';
import multer from "multer"
import path from "path"
const app = express()
// make monggose db connection
var upload = multer();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected to Facebook_clone Database")
});

global.appRoot = path.resolve(__dirname);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", router)
app.use('/uploads', express.static('uploads'))





// ...
// Right before your app.listen(), add this:
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running")
    })
}

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`listening at port ${PORT}`))