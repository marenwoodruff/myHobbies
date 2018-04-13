module.exports = () => {
  seededHobbies: [
    {
      name: "playing guitar",
      description: "6 stringed instrument- nylon vs steel strings, classical vs flamenco, acoustic vs electric",
      difficulty: 3,
      levelOfProfficiency: 3
    }, 
    {
      name: "drawing",
      description: "pencil to paper",
      difficulty: 2,
      levelOfProfficiency: 2
    }
  ]
};

// helper method that doesn't require an instance
// createdAt or updatedAt- gets automatically created or updated when the model is created or updated

/**
  * create or update any database tables
  */