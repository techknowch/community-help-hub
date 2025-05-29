const Joi = require("joi");

const createRequestSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().valid("Frontend", "Backend", "DevOps", "Design", "Other").required(),
  priority: Joi.string().valid("low", "normal", "high").default("normal")
});

module.exports = {
  createRequestSchema
};
