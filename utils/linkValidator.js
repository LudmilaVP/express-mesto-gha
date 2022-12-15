const BadRequest = require('../errors/BadRequest');
const { linkPattern } = require('./linkPattern');

module.exports = (url) => {
  if (!linkPattern.test(url)) {
    throw new BadRequest('Неверный формат URL');
  }
  return true;
};
