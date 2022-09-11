const { check, validationResult } = require("express-validator");

const { User } = require("../../models/UserSchema");
const createError = require("http-errors");

const doValidatePersonal = [
  check("fullname")
    .isLength({ min: 1, max: 30 })
    .withMessage("fullname is required or lengthy")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("fullname must not contain anything other than alphabet")
    .trim(),

  check("department")
    .isLength({ min: 1 })
    .withMessage("department is required")
    .custom((value) => {
      if (
        ![
          "CSE",
          "EEE",
          "BBA",
          "BBS",
          "BRE",
          "BTHM",
          "BE",
          "CIS",
          "SWE",
          "ESDM",
          "MCT",
          "GED",
          "ITM",
          "ETE",
          "TE",
          "ARCHT",
          "CE",
          "PHARM",
          "NFE",
          "ENG",
          "LLB",
        ].includes(value)
      ) {
        throw createError("please! write a valid department");
      } else {
        return true;
      }
    })
    .trim(),

  check("universityname")
    .isLength({ min: 1 })
    .withMessage("university name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("universityname must not contain anything other than alphabet")
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
        const user = await User.find({
          $and: [{ phone: value }, { role: { $ne: "admin" } }],
        });

        if (Object.keys(user).length > 1) {
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
