const Express = require('express')
const {Dog, Breed} = require('./db/index');
const path = require('path');


const router = Express.Router();

router.use(Express.static(path.join(__dirname, 'dist'))) // need to serve up the javascript that is created by webpack 

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html')) // Study this line of code
});


router.get('/Dogs', async (req, res, next) => {
  let allDog = await Dog.findAll({
    include: {
      as: 'type',
      model: Breed
    }
  });
  res.send(allDog)
});

router.get('/Breeds', async(req, res, next) => {
  let allBreed = await Breed.findAll({
    include: [{
      model: Dog
    }]
  });
  res.send(allBreed);
});

router.get('/Dogs/:id', async (req, res, next) => {
  let singleDog = await Dog.findById(req.params.id);
  res.send(singleDog);
})

router.get('/Breeds/:id', async(req, res, next) => {
  let singleBreed = await Dog.findById(req.params.id);
  res.send(singleBreed);
})

module.exports = router
