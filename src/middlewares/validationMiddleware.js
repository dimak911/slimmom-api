const validationBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;

      next(error);
    }

    next();
  };
};

const validationQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      error.status = 400;

      next(error);
    }

    next();
  };
};

module.exports = {
  validationBody,
  validationQuery,
};
