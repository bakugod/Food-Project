const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
    const db = client.db('mytestingdb');

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
      });

      app.get('/meal', (req, res) => {
        db.collection('meal').find().toArray((err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
          } else {
            res.send(result);
          }
        });
      });

    app.post('/notes', (req, res) => {
      const note = { text: req.body };
      db.collection('notes').insertOne(note, (err, result) => {
        if (err) { 
          res.send({ 'error': `An error has occurred ${err}` }); 
        } else {
          res.send(result.ops);
        }
      });
    });
  };