const { sendError, errEnum } = require('../errors');

module.exports = (schema, path = 'body') => async (req, res, next) => {
  try {
    const validData = await schema.validate(req[path]);
    req.validData = validData;
    return next();
  } catch (error) {
    return sendError(req, res, errEnum.FORM_ERROR, { error: error.message });
  }
};
