import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, _next) {
  res.send('<h1>LISTA DE USUARIOS</h1>');
});

//module.exports = router;
export default router;
