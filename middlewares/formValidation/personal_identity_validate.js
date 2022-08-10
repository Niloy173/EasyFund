const { check, validationResult } = require("express-validator");

const { User } = require("../../models/UserSchema");

const doValidatePersonal = [
  check("fullname")
    .isLength({ min: 1, max: 25 })
    .withMessage("fullname is required or lengthy")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("fullname must not contain anything other than alphabet")
    .trim(),

  check("department")
    .isLength({ min: 1 })
    .withMessage("department is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("fullname must not contain anything other than alphabet")
    .trim(),

  check("universityname")
    .isLength({ min: 1 })
    .withMessage("university name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("fullname must not contain anything other than alphabet")
    .trim(),

  check("universityid")
    .isLength({ min: 1 })
    .withMessage("university id is required")
    .trim(),

  check("phone")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage(
      "Mobile number must be a valid Bangladeshi mobile number (+880)"
    )
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });

        if (user.length > 1) {
          throw createError("Mobile already is use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    })
    .trim(),
];

const doValidatePersonalHandler = function (req, res, next) {
  const error = validationResult(req);
  const mappedError = error.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedError,
    });
  }
};

module.exports = {
  doValidatePersonal,
  doValidatePersonalHandler,
};
