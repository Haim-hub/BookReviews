import express from "express"
import mysql from "mysql"
import cors from "cors"
import bcrypt from "bcrypt"
import session from "express-session"
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express()
app.use(express.json())
const secretKey = process.env.JWT_SECRET;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.ROOT_PASSWORD,
    database: "projects"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello From The Backend")
})


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (token == null) {
        return res.status(401).send('Token is required');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token is invalid or expired');
        }

        req.user = user;
        next(); // Proceed to the next middleware/route handler
    });
};

app.get("/books", (req, res) => {
    const sqlSelect = "SELECT * FROM books"
    db.query(sqlSelect, (err, result) => {
        if(err) console.log(err)
        return res.json(result)
    })
})
    
app.get("/latestBooks", (req, res) => {
    const sqlSelect = "SELECT books.*, authors.name AS author_name FROM books JOIN bookauthor ON books.id = bookauthor.book_id JOIN authors ON bookauthor.author_id = authors.id ORDER BY books.id DESC LIMIT 9"
    db.query(sqlSelect, (err, result) => {
        if(err) console.log(err)
        return res.json(result)
    })
})

app.get("/books/:id", (req, res) => {
    const sqlSelect = "SELECT books.*, authors.name AS author_name FROM books JOIN bookauthor ON books.id = bookauthor.book_id JOIN authors ON bookauthor.author_id = authors.id WHERE books.id = ?"
    db.query(sqlSelect, [req.params.id], (err, result) => {
        if(err) console.log(err)
        return res.json(result)
    })
})    

app.post("/books", authenticateToken, async (req, res) => {

    const sqlInsertBook = "INSERT INTO books (`title`, `cover`, `description`, `review`) VALUES (?)";
    const bookValues = [req.body.title, req.body.cover, req.body.description, req.body.review];
    
    const bookResult = await new Promise((resolve, reject) => {
        db.query(sqlInsertBook, [bookValues], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    const sqlFindAuthor = "SELECT id FROM authors WHERE name = ?";
    const authorValues = [req.body.author];
    
    let authorId;
    const findAuthorResult = await new Promise((resolve, reject) => {
        db.query(sqlFindAuthor, authorValues, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    
    if (findAuthorResult.length > 0) {
        // Author already exists
        authorId = findAuthorResult[0].id;
    } else {
        // Insert new author
        const sqlInsertAuthor = "INSERT INTO authors (`name`) VALUES (?)";
        const authorResult = await new Promise((resolve, reject) => {
            db.query(sqlInsertAuthor, authorValues, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        authorId = authorResult.insertId;
    }
    
    const sqlInsertBookAuthor = "INSERT INTO bookauthor (`book_id`, `author_id`) VALUES (?)";
    const bookAuthorValues = [bookResult.insertId, authorId];
    
    await new Promise((resolve, reject) => {
        db.query(sqlInsertBookAuthor, [bookAuthorValues], (err, result) => {
            if (err) reject(err);
            else return res.json(result)
        });
    });

})

//edit
app.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const { title, description, author_name, cover, review } = req.body;
    console.log(req);
    try {
        // Update the book table
        if(cover === ""){
            await db.query('UPDATE books SET title = ?, description = ?, review = ? WHERE id = ?', [title, description, review, bookId]);
        }
        else{
            await db.query('UPDATE books SET title = ?, description = ?, cover = ?, review = ? WHERE id = ?', [title, description, cover, review, bookId]);
        }
        

        const sqlFindAuthor = "SELECT id FROM authors WHERE name = ?";
        const authorValues = [author_name];
        
        let authorId;
        const findAuthorResult = await new Promise((resolve, reject) => {
            db.query(sqlFindAuthor, authorValues, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (findAuthorResult.length > 0) {
            // Author already exists
            authorId = findAuthorResult[0].id;
        } else {
            // Insert new author
            const sqlInsertAuthor = "INSERT INTO authors (`name`) VALUES (?)";
            const authorResult = await new Promise((resolve, reject) => {
                db.query(sqlInsertAuthor, authorValues, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            authorId = authorResult.insertId;
        }

        // Update the book-author relation
        await db.query('UPDATE bookauthor SET author_id = ? WHERE book_id = ?', [authorId, bookId]);

        res.send('Book updated successfully');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
});

//delete
app.delete("/delete", authenticateToken, async (req, res) => {
    const bookId = req.body.bookId;
    try {
        await db.query('DELETE FROM books WHERE id = ?', [bookId]);
        res.send('Book deleted successfully');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlSelect = "SELECT * FROM users WHERE username = ?"
    const user = await new Promise((resolve, reject) => {
        db.query(sqlSelect, [username], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })

    const match = await bcrypt.compare(password, user[0].password)
    console.log(match)
    if (match){
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET , { expiresIn: '1h' });
        res.send({ token });
    } else {
        res.status(401).json({error: "Auth Failed"})
    }
})


app.listen(3000, () => {
  console.log("Connected to backend")
})