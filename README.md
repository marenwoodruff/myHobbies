# Sequelize CLI 

### 1. Create ERDS for models
hobbies
   - name (string/varchar(255))
   - description (string/varchar(255))
   - difficulty (float/integer)
   - levelOfProfficiency (float/integer)     
   - hoursPracticed (float/integer)

set up seeds:
#### in db/hobbies_data.js
module.exports = {
  seededHobbies: [
    {
      name: "playing guitar",
      description: "6 stringed instrument- nylon vs steel strings, classical vs flamenco, acoustic vs electric",
      difficulty: 3,
      levelOfProfficiency: 3,
      hoursPracticed: 5
    }, 
    {
      name: "drawing",
      description: "pencil to paper",
      difficulty: 2,
      levelOfProfficiency: 2,
      hoursPracticed: 1
    }
  ]
};

require db in your controller


### 2. install dependencies/get app up and running
express --view=ejs --git myApp
cd myApp
npm install
atom .
npm install express-ejs-layouts
npm install method-override

#### in app.js
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
app.use(ejsLayouts);
app.use(methodOverride('_method'));

update the title on the index controller
add views/layout.ejs, and DRY up the views/index.ejs

add "start:dev": "nodemon ./bin/www"
start the server
go to localhost:3000 to make sure that you didn't break anything

git init...
git commit

### 3. set up my_hobbies_controller.js
touch routes/my_hobbies_controller.js

#### in my_hobbies_controller.js
const express = require('express');
const router = express.Router();

module.exports = router;

#### in app.js
var myHobbiesController = require('./routes/my_hobbies_controller');
app.use('/hobbies', myHobbiesController);

look at postman/browser

git commit...

### 4. set up index route
// index route
router.get('/', (req, res) => {
  res.send('we did it');
});

check that it works in postman

git commit...

### 5. add an index view
mkdir views/myHobbies
touch views/myHobbies/index.ejs

add a dummy h1- <h1>My Hobbies</h1>

#### in hobbies_controller
// index route
router.get('/', (req, res) => {
  // res.send('we did it');
  res.render('myHobbies/index');
});

#### in views/myHobbies/index.ejs
<ul>
  <% hobbies.forEach(hobby => { %>
    <li>
      <h1><%= hobby.name %></h1>
      <h3>description: <%= hobby.description %></h3>
      <p><strong>difficulty:</strong> <%= hobby.difficulty %>, <strong>level of profficiency:</strong> <%=         hobby.levelOfProfficiency %></p>
    </li>
  <% }); %>
</ul>

check in postman/browser

git commit...

### 6. add a show route
router.get('/:id', (req, res) => {
  res.send('we showed it');
});

check in postman/browser

git commit...

### 7. add a show view
touch views/myHobbies/show.ejs

#### in controller
// show route
router.get('/:id', (req, res) => {
  // res.send('we showed it');
  res.render('myHobbies/show', {
    hobby: {
      id: req.params.id,
      name: data[req.params.id].name,
      description: data[req.params.id].description,
      difficulty: data[req.params.id].difficulty,
      levelOfProfficiency: data[req.params.id].levelOfProfficiency,
    }
  });
});

#### in show.ejs
<h1><%= hobby.name %></h1>
<h3>description: <%= hobby.description %></h3>
<br />

<p><strong>difficulty:</strong> <%= hobby.difficulty %>, <strong>level of profficiency:</strong> <%= hobby.levelOfProfficiency %></p>


### 8. add a new route
router.get('/new', (req, res) => {
  res.send('we knew it');
});

check in postman/browser

git commit...

### 9. add a new view
touch views/myHobbies/new.ejs

check that it works in postman

#### in new view
<h1>Add a New Hobby!</h1>

<div class="container>
  <form>
    <div class="form-group">
      <label for="name">Hobby Name</label>
      <input class="form-control" type="text" id="name">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input class="form-control" type="text" id="description">
    </div>

    <div class="form-group">
      <label for="difficulty">Difficulty</label>
      <input class="form-control" type="number" id="difficulty" min="0" max="5" step="0.05">
    </div>

    <div class="form-group">
      <label for="levelOfProfficiency">Level of Profficiency</label>
      <input class="form-control" type="number" id="levelOfProfficiency" min="0" max="5" step="0.05">
    </div>
    
    <div class="form-group">
      <label for="hoursPracticed">Hours Practiced</label>
      <input class="form-control" type="number" id="hoursPracticed" step="0.05">
    </div>

    <div class="form-group">
      <input class="btn btn-outline-info"" type="submit" value="Submit">
    </div>
  </form>
</div>

git commit...

### 10. add in a post route
// create route
router.post('/', (req, res) => {
  var newHobby = {
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    levelOfProfficiency: req.body.levelOfProfficiency
  };

  data.seededHobbies.push(newHobby);
  res.redirect('myHobbies/show');
});

<form action="/hobbies" method="POST">

git commit...

### 11. set up an edit route
// edit route
router.get('/:id/edit', (req, res) => {
  res.send('we do it');
});

check in postman

git commit...

### 12. set up an edit view
touch views/myHobbies/edit.ejs

#### in controller
// edit route
router.get('/:id/edit', (req, res) => {
  // res.send('we do it');

  res.render('myHobbies/edit', {
    hobby: {
      id: req.params.id,
      name: data[req.params.id].name,
      description: data[req.params.id].description,
      difficulty: data[req.params.id].difficulty,
      levelOfProfficiency: data[req.params.id].levelOfProfficiency,
    }
  });
});

#### in edit.ejs
<h1>Edit your '<%= hobby.name %>' Hobby!</h1>

<div>
  <form action="/hobbies/<%= id %>?_method=PUT" method="POST">
    <div class="form-group">
      <label for="name">Hobby Name</label>
      <input class="form-control" type="text" name="name" value="<%= hobby.name %>">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <input class="form-control" type="text" name="description" value="<%= hobby.description %>">
    </div>

    <div class="form-group">
      <label for="difficulty">Difficulty</label>
      <input class="form-control" type="number" name="difficulty" value="<%= hobby.difficulty %>" min="0" max="5" step="0.05">
    </div>

    <div class="form-group">
      <label for="levelOfProfficiency">Level of Profficiency</label>
      <input class="form-control" type="number" name="levelOfProfficiency" value="<%= hobby.levelOfProfficiency %>" min="0" max="5" step="0.05">
    </div>
    
    <div class="form-group">
      <label for="hoursPracticed">Hours Practices</label>
      <input class="form-control" type="number" name="hoursPracticed" value="<%= hobby.hoursPracticed %> step="0.05">
    </div>

    <div class="form-group">
      <input class="btn btn-outline-info margin-top" type="submit" value="Submit">
    </div>
  </form>
</div>

git commit...

### 13. add a PUT route
// update route
router.put('/:id', function(req, res) {
  var hobbyToEdit = data[req.params.id];

  hobbyToEdit.name = req.body.name;
  hobbyToEdit.description = req.body.description;
  hobbyToEdit.difficulty = req.body.difficulty;
  hobbyToEdit.levelOfProfficiency = req.body.levelOfProfficiency;

  res.redirect('/hobbies');
});

### 14. add a delete route
// delete route
router.delete('/:id', (req, res) => {
  // remove the item from the array
  data.splice(req.params.id, 1); 

  // redirect back to index route
  res.redirect('/hobbies'); 
});

#### on the show page
<form action="/hobbies/<%= hobby.id %>?_method=DELETE" method="POST">
  <input class="btn btn-outline-danger sm-margin-top" type="submit" value="Delete Hobby" />
</form>

### 15. install sequelize
npm install --save sequelize
npm install --save pg pg-hstore
npm install --save sequelize-cli
sequelize init
    - models
    - seeders
    - migrations

update config/config.json- add in postgres

### 16. create your hobby model
sequelize model:create --name hobby -- attributes name:string,description:string,difficulty:float,levelOfProfficiency:float,hoursPracticed:float

### 17. add the model to your controller

### 18. update the controller

### 19. add a seeds file + db:migrate


