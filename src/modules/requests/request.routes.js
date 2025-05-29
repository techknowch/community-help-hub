const express = require("express");
const router = express.Router();

const controller = require("./request.controller");
const { createRequestSchema } = require("./request.validator");
const validate = require("../../middlewares/validate");

router.post("/", validate(createRequestSchema), controller.createRequest);
