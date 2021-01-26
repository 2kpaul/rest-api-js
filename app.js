const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const books = [
    { id: 1, name: 'Book 1', description: 'book description 1' },
    { id: 2, name: 'Book 2', description: 'book description 2' },
    { id: 3, name: 'Book 3', description: 'book description 3' }
];

app.get('/api/books', (req, res) => {
    return res.send(books);
});

app.get('/api/books/:id', (req, res) => {

    const book = books.find(book => book.id === parseInt(req.params.id));

    if (!book) return res.status(404).send('Book id not found');

    return res.send(book);

});

app.post('/api/books', (req, res) => {


    const book = {
        id: books.length + 1,
        name: req.body.name,
        description: req.body.description
    }

    books.push(book);
    return res.send(book);

});

app.put('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));

    if (!book) return res.status(404).send('Book id not found');

    book.name = req.body.name;
    book.description = req.body.description;

    return res.send(book);
});

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));

    if (!book) return res.status(404).send('Book id not found');

    const index = books.indexOf(book);

    books.splice(index, 1);

    return res.send(book);
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

