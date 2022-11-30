const User = require('../models/user');
const { handleError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
        handleError(err, req, res);
  })
};

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        handleError(err, req, res);
  })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        handleError(err, req, res);
  })
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        handleError(err, req, res);
  })
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        handleError(err, req, res);
  })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};