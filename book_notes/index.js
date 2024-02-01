import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;


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



// Get all books 
async function getBooks(){
const result = await db.query("select * from books");
return result.rows;

}

// Get all reviews
async function getReviews(){
    const result = await db.query("select * from reviews");
    return result.rows;
   
}


app.get("/", async(req, res) => {

    try {
     const books = await getBooks();
     const reviews = await getReviews();
    console.log(books);
    console.log(reviews);
     res.render("index.ejs", {
        books: books,
        reviews: reviews
     })
    }catch(err){
        console.log(err);
        res.render("index.ejs", {
            error: "Failure retrieving resource" + err.stack
        })
    };
});



app.post("/addBook", async (req, res) => {
 
   if (req.body.add === "book"){
    res.render("newBook.ejs");
} else {
    const title = req.body.title;
    const author = req.body.author;
    const synopsis = req.body.synopsis;
    const isbn = req.body.isbn;
   
   const result = await db.query("insert into books(title, author, synopsis, isbn) values ($1, $2, $3, $4) returning id", [title, author, synopsis, isbn]);
    const reviewId = result.rows[0].id;
  
   if (reviewId){
        res.redirect("/");
    }
   
}

});


app.post("/addReview", async (req, res)=> {
    console.log(req.body);
    const bookId = req.body.bookId;
    if (bookId) {
        res.render("newReview.ejs", {
            bookId: bookId
        });
    } else {
        console.log(req.body);
        const bookId = parseInt(req.body.bookId);
        const review = req.body.review;
        const rating = parseInt(req.body.rating);
        const reviewId = await db.query("insert into reviews(book_id, review, rating) values($1, $2, $3) returning id", [bookId, review, rating]);
        console.log(reviewId);
        if (reviewId) {
            res.redirect("/")
        }
    }

});


app.post("/editReview", async (req, res) => {

});

app.post("/deleteBook", async (req, res)=> {
const deleteBookId = req.body.deleteBookId;
await db.query("delete from books where id = $1", [deleteBookId]);
res.redirect("/");
});

app.post("/deleteReview", async (req, res)=>{

});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})