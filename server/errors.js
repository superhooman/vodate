const debug = require("debug");

const log = debug("errors");

const errors = {
  NO_IMAGE: {
    error: "request.image",
    code: 400,
  },
  WRONG_AUTH: {
    error: "request.auth",
    code: 403,
  },
  WRONG_SESSION: {
    error: "request.session.wrong",
    code: 403,
  },
  DEFAULT: {
    error: "server.default",
    code: 500,
  },
  FORM_ERROR: {
    error: "request.form",
    code: 400,
  },
  WRONG_ID: {
    error: "request.id",
    code: 400,
  },
};

const errEnum = {
  NO_IMAGE: "NO_IMAGE",
  WRONG_SESSION: "WRONG_SESSION",
  DEFAULT: "DEFAULT",
  FORM_ERROR: "FORM_ERROR",
  WRONG_AUTH: "WRONG_AUTH",
  WRONG_ID: "WRONG_ID"
};

const sendError = (req, res, error = "default", data = {}) => {
  log(`${new Date().getTime()} Error logged:`, req.method, req.path, error);
  const err = errors[error] || errors.DEFAULT;
  res.status(err.code).json({
    ...err,
    ...data,
    success: false,
  });
};

module.exports = {
  errors,
  errEnum,
  sendError,
};
