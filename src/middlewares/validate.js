module.exports = (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((d) => d.message)
        });
      }
  
      req.body = value; // Use sanitized value
      next();
    };
  };
  