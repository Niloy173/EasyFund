const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const doGeneralValidation = [
  check("date", "Deadline is required").not().isEmpty().trim(),
  // .custom((value) => {
  //   // current date;
  //   let CurrentDateValue = new Date(value).getTime();
  //   let todaysDate = new Date().getTime();

  //   if (CurrentDateValue <= todaysDate) {
  //     throw createError("Date is invalid");
  //   }
  // }),

  check("option", "category is required").not().isEmpty().trim(),

  check("taka", "Amount is required")
    .isFloat({ min: 100, max: 5000 })
    .withMessage("Invalid amount")
    .trim(),
];

const doGeneralValidationHandler = function (req, res, next) {
  const error = validationResult(req);
  const errorArray = error.array();

  if (Object.keys(errorArray).length === 0) {
    next();
  } else {
    res.render("Forms/General", {
      error: errorArray,
    });
  }
};

module.exports = {
  doGeneralValidation,
  doGeneralValidationHandler,
};
