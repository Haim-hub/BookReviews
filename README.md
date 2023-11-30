# ProjektDatabase

A website to both log with books i have read, but also to make reviews of them

## Database

The database is a MySQL database, and the tables are described below. The database is made to be normalized, and the tables are connected with foreign keys.

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel mi risus. Ut quis tincidunt nulla, at semper sem. Quisque congue enim sed neque varius, a egestas massa ultricies. Pellentesque et arcu dolor. Sed neque lacus, accumsan dapibus massa quis, mollis aliquet massa. Curabitur sapien ante, semper eu gravida sit amet, bibendum sed neque. Nunc nec euismod sapien.
