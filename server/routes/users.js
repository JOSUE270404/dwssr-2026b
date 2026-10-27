import express from 'express';

const usersRouter = express.Router();

let counter = 0;
const numbers = [];

usersRouter.get('/', (req, res) => {
  counter += 1;
  numbers.push(counter);

  res.render('index', {
    title: 'Josue Alcantara',
    counter,
    numbers,
  });
});

export default usersRouter;