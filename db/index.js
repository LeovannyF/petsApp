const Sequelize = require('sequelize');
const {dogName, dogBreed} = require('./seed');

const conn = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost:5432/pets', {logging:false});

const Dog = conn.define('dog', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

const Breed = conn.define('breed', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

const syncSeed = async () => {
  await conn.sync({force:true});
  const [zeus, hercules, posidon] = await Promise.all(dogName.map(name => {
    return Dog.create({name:name})
  }))
  const [saluki, poodle, lab] = await Promise.all(dogBreed.map(breed => {
    return Breed.create({name:breed})
  }))
zeus.setType(poodle);
hercules.setType(saluki);
posidon.setType(lab);
saluki.addDog(zeus);
saluki.addDog(hercules);
poodle.addDog(zeus);  // how to add to the many to many associations
}

Dog.belongsTo(Breed, { as:'type'})
Breed.belongsToMany(Dog, {through: 'dogBreed'}); // how to set up many to many associations

module.exports = {
  syncSeed,
  Dog,
  Breed
}
