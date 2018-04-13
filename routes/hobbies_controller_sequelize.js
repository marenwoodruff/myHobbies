const express = require('express');
const router = express.Router();

const data = require('../db/hobbies_data').seededHobbies;
const Hobby = require('../models').hobby;

// index route
router.get('/', (req, res) => {
  // res.send('we did it');

  Hobby.findAll().then(function(hobbies) {
    res.render('hobbies/index', {
      hobbies: hobbies
    });
  })
});

// new route
router.get('/new', (req, res) => {
  // res.send('we knew it');

  res.render('hobbies/new', {
    // building an instance of hobby
    hobby: Hobby.build()
  });
});

// show route
router.get('/:id', (req, res) => {
  // res.send('we showed it');
  Hobby.findById(req.params.id).then(function(hobby) {
    res.render('hobbies/show', {
      hobby: hobby
    });
  });
});

// create route
router.post('/', (req, res) => {
  // requires an object with properties that map to the properties of the object
  Hobby.create(req.body).then(function(hobby) {
    res.redirect('/hobbies');
  }).catch(function(err) {
    res.status(400).render('error');
  });
});

// edit route
router.get('/:id/edit', (req, res) => {
  // res.send('we do it');
  Hobby.findById(req.params.id).then(function(hobby) {
    res.render('hobbies/edit', {
      hobby: hobby
    });
  });
});

// update route
router.put('/:id', (req, res) => {
  Hobby.findById(req.params.id).then(function(hobby) {
    return hobby.update(req.body); // update method returns a promise
  }).then(function(updatedHobby) { // the hobby parameter is the updated hobby
    res.render('hobbies/show', {
      hobby: updatedHobby
    });
  }).catch(function(err) {
    res.status(400).render('error');
  });
});


// delete route
router.delete('/:id', (req, res) => {
  Hobby.findById(req.params.id).then(function(hobby) {
    return hobby.destroy(); // destroy method is an asynchronous call that returns a promise
  }).then(function() {
    // redirect back to index route
    res.redirect('/hobbies');
  }).catch(function(err) {
    res.status(400).render('error');
  });
});

module.exports = router;