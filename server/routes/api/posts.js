const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Hämta inlägg 
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


// Publciera inlägg
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Radera inlägg
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

// Uppdatera inlägg
router.put('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.updateOne({ _id: new mongodb.ObjectID(req.params.id) }, { $set: { text: req.body.text } });

    res.status(201).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://projekt_js:Password@cluster0-uqbw8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

    return client.db('projekt_js').collection('posts');
}


module.exports = router;