const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  userIdValidator,
  updateUserValidator,
  updateAvatarValidator,
} = require('../middlewares/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidator, getUser);
router.patch('/me', updateUserValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
