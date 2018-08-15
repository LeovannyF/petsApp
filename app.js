const Express = require('express');
const {syncSeed, Dog, Breed} = require('./db/index');
const router = require('./route');

const app = Express();

app.use('/', require('./route'));


const port = process.env.PORT || 3000;


app.listen(port, ()=>{
  syncSeed()
  console.log(`I am listening on port, ${port}`);
})
