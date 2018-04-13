const express = require('express');
const router = express.Router();

const data = require('../db/hobbies_data').seededHobbies;
const Hobby = require('../models').hobby;

// index route
router.get('/', (req, res) => {
  // res.send('we did it');

  res.render('hobbies/index', {
    hobbies: data
  });
});

// new route
router.get('/new', (req, res) => {
  // res.send('we knew it');
  
  res.render('hobbies/new');
});

// show route
router.get('/:id', (req, res) => {
  // res.send('we showed it');

  res.render('hobbies/show', {
    hobby: {
      id: req.params.id,
      name: data[req.params.id].name,
      description: data[req.params.id].description,
      difficulty: data[req.params.id].difficulty,
      levelOfProfficiency: data[req.params.id].levelOfProfficiency,
    }
  });
});

// create route
router.post('/', (req, res) => {
  var newHobby = {
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    levelOfProfficiency: req.body.levelOfProfficiency
  };

  data.push(newHobby);
  res.redirect('/hobbies');
});

// edit route
router.get('/:id/edit', (req, res) => {
  // res.send('we do it');
  res.render('hobbies/edit', {
    hobby: {
      id: req.params.id,
      name: data[req.params.id].name,
      description: data[req.params.id].description,
      difficulty: data[req.params.id].difficulty,
      levelOfProfficiency: data[req.params.id].levelOfProfficiency,
    }
  }); 
});

// update route
router.put('/:id', (req, res) => {
  var hobbyToEdit = data[req.params.id];

  hobbyToEdit.name = req.body.name;
  hobbyToEdit.description = req.body.description;
  hobbyToEdit.difficulty = req.body.difficulty;
  hobbyToEdit.levelOfProfficiency = req.body.levelOfProfficiency;

  res.redirect('/hobbies');
});

// delete route
router.delete('/:id', (req, res) => {
  // remove the item from the array
  data.splice(req.params.id, 1); 

  // redirect back to index route
  res.redirect('/hobbies');  
});

module.exports = router;