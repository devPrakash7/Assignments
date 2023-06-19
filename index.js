const express = require("express");
const app = express();
const port = process.env.PORT  || 5001
const mongoose = require("mongoose");


app.use(express.json());
app.use(require("./routes/rout"));

//mongoose connectmongoose
mongoose
.connect("mongodb+srv://root:akki909@cluster0.sm3rshd.mongodb.net/Auth", {

        useNewUrlParser: true,
    })
    .then(() => {
        console.log("running port........");
    })
    .catch((error) => {

        console.log(error);
    });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));