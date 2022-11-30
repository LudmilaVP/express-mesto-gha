const Cards = require('../models/card');
const { handleError } = require('../utils/errors');

const getCards = (req, res) => {
    Cards.find({})
      .then((cards) => res.status(200).send(cards))
      .catch((err) => {
        handleError(err, req, res);
  })
  };
  
  const createCard = (req, res) => {
    const { name, link } = req.body;
    const owner = req.user._id;
  
    return Cards.create({ name, link, owner })
      .then((card) => res.status(200).send(card))
      .catch((err) => {
        handleError(err, req, res);
  })
  };
  
  const deleteCard = (req, res) => {
    const { cardId } = req.params;
  
    return Cards.findByIdAndRemove(cardId)
      .orFail(() => new Error('NotFound'))
      .then((card) => res.status(200).send(card))
      .catch((err) => {
        handleError(err, req, res);
  })
  };
  
  const likeCard = (req, res) => {
    Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new Error('NotFound'))
      .then((card) => res.status(200).send(card))
      .catch((err) => {
        handleError(err, req, res);
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
        handleError(err, req, res);
      });
  };
  
  module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
  };