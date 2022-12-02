const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send('Сервер не найден');
});
router.all('*', (req, res) => {
  res.status(404).send({ message: 'Ничего не найдено. Проверьте путь и метод запроса' });
});

module.exports = router;
