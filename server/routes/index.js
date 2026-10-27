import express from 'express';

const indexRouter = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
indexRouter.get('/', (req, res) => {
  counter += 1;
  numbers.push(counter);

  res.render('index', {
    title: 'Josue Alcantara',
    counter,
    numbers,
  });
});

export default indexRouter;