const Cards = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Cards.find({}).populate('owners', 'likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Cards.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные карточки');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Не найдена карточка с указанным id');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные карточки'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Не найдена карточка с указанным id'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Cards.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError('Не найдена карточка с указанным id');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Cards.findByIdAndRemove(cardId).then(() => res.status(200).send(card));
      } else {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Не найдена карточка с указанным id');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные карточки'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Не найдена карточка с указанным id'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
