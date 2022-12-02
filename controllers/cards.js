const Cards = require('../models/card');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Не получилось обработать запрос' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Cards.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Неверный формат переданных данных' });
      } else {
        res.status(500).send({ message: 'Не получилось обработать запрос' });
      }
    });
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат переданных данных' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else {
        res.status(500).send({ message: 'Не получилось обработать запрос' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Cards.findByIdAndRemove(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат переданных данных' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточка с таким номером не найдена' });
      } else {
        res.status(500).send({ message: 'Не получилось обработать запрос' });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат переданных данных' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Такой карточки не существует' });
      } else {
        res.status(500).send({ message: 'Не получилось обработать запрос' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
