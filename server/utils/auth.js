const { sendError, errEnum } = require('../errors');

const auth = async (req, res, next) => {
  if (!req.session.user || !req.session.user.id) {
    return sendError(req, res, errEnum.WRONG_SESSION);
  }
  return next();
};

module.exports = auth;
