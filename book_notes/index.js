import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
const baseUrl = "https://covers.openlibrary.org/b/";


// Parse req body
app.use(bodyParser.urlencoded({ extended: true}));

// serve static files
app.use(express.static("public"));

// Connect to postgres database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "postirin",
    port: 5432,
});
db.connect();

// Axios to access book covers api
async function fetchBookImage(url){
const img = new Image();
return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.oneerror = e => rej(e);
    img.src = url;
})
};


app.get("/", (req, res) => {

});

app.post("/add", (req, res) => {

});

app.post("/edit", (req, res) => {

});

app.post("/delete", (req, res)=> {

});



app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})