const express            = require('express');
const { MongoClient }    = require('mongodb');
const bodyParser         = require('body-parser');
const app                = express();

const mongoClient        = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

mongoClient.connect((err, database) => {
    if (err) throw err;
    require('./routes/index')(app, database);         
})

function timeStamp(){
    return new Date()
                .toString()
                .slice(16, 24);
}


app.listen(8080);