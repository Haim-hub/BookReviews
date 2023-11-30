# BookReviews

A website to both log with books i have read, but also to make reviews of them

## Pages

As of right now there are 8 different pages.

### Home / Books

The home page and the books page are the same page. The books page is the page where you can see all the books in the database. The books are shown in a grid, with the cover of the book, the title, and the author. If you click on a book, you will be taken to the book page.

### Book

The book page is the page where you can see all the information about a book. This page shows the cover, the title, the author, the description, and the review.

### Login

The login page is the page where you can login to the website. Logging in gives access to use the add/delete/edit pages. You will however still be able to see these pages without logging in, but you will not be able to do anything on them.

### Add

The add page is the page where you can add a new book to the database. You can add a title, a cover, a description, and a review. The cover is saved as a base64 string, and the review is saved as HTML.

### Edit

The edit page is the page where you can edit a book in the database. You can edit the title, the cover, the description, and the review. The cover is saved as a base64 string, and the review is saved as HTML.

### Delete

The delete page is the page where you can delete a book from the database. You can delete a book by clicking the delete button.

## Database

The database is a MySQL database, and the tables are described below. The database is made in MySQL because of the good reason "I Wanted To Practice MySQL".
The database is made to be normalized, and the tables are connected with foreign keys.

### Books

| Column      | Type         | Description                        |
| ----------- | ------------ | ---------------------------------- |
| id          | int          | Primary key                        |
| title       | varchar(255) | Title of the book                  |
| cover       | longtext     | The cover saved as a base64 string |
| description | longtext     | Description of the book            |
| review      | longtext     | Review of the book as HTML         |

### Authors

| Column | Type         | Description        |
| ------ | ------------ | ------------------ |
| id     | int          | Primary key        |
| name   | varchar(255) | Name of the author |

### BookAuthor

| Column    | Type | Description                     |
| --------- | ---- | ------------------------------- |
| id        | int  | Primary key                     |
| book_id   | int  | Foreign key to the book table   |
| author_id | int  | Foreign key to the author table |

### Users

| Column   | Type         | Description          |
| -------- | ------------ | -------------------- |
| id       | int          | Primary key          |
| username | varchar(255) | Username of the user |
| password | varchar(255) | Password of the user |

## Backend

The Backend server is a NodeJS server, with Express as the framework. The whole server currently works in one file, but I have plans to split it up into more.
The Endpoints are described here:

| Endpoint     | Method | Description                                |
| ------------ | ------ | ------------------------------------------ |
| /books       | GET    | Returns all books in the database          |
| /books/:id   | GET    | Returns a book with the given id           |
| /books       | POST   | Creates a new book in the database         |
| /books/:id   | PUT    | Updates a book with the given id           |
| /books/:id   | DELETE | Deletes a book with the given id           |
| /LatestBooks | GET    | Returns the 9 latest books in the database |

## Future work

There are a lot of things that can be done to improve this project. Some of the things I have planned are:

- Splitting up the backend server into multiple files
- Cleaning up the frontend code
- Deploying the project to a server
