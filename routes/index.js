const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.all('*', (req, res, next) => {
  next(new Error('Неверный адрес запроса'));
});

module.exports = router;
