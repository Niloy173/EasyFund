/* require packages */
const express = require("express");
const lodash = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const { redirectLoggedIn } = require("../middlewares/common/LoginCheck");

/* user database model */
const { User } = require("../models/UserSchema");
const {
  ProjectVerificationModel,
} = require("../models/ProjectVerificationSchema");

/* app object */
const router = express.Router();

router.get("/", decorateHtmlResponse("login"), redirectLoggedIn, (req, res) => {
  res.render("login");
});

router.post("/", decorateHtmlResponse("login"), (req, res) => {
  let { email, password } = req.body;

  if (email == "" || password == "") {
    res.render("login", {
      message: "Field is empty",
    });
  } else {
    User.find({ email: email })
      .then((data) => {
        if (data.length) {
          // check the verification status
          if (!data[0].verified) {
            res.render("login", {
              message: "Email hasn't been verified.",
            });
          } else {
            const hashedPassword = data[0].password;
            bcrypt
              .compare(password, hashedPassword)
              .then((result) => {
                if (result) {
                  // res.redirect("/")

                  const token = jwt.sign(
                    {
                      useremail: data[0].email,
                      userId: data[0]._id,
                    },
                    process.env.JWT_TOKEN,
                    {
                      expiresIn: process.env.JWT_EXPIRE,
                    }
                  );

                  res.cookie(process.env.COOKIE_NAME, token, {
                    expires: new Date(
                      Date.now() + parseInt(process.env.JWT_EXPIRE)
                    ),
                    httpOnly: true,
                    signed: true,
                  });

                  //create a ownerId in projectVerificaion Schema
                  ProjectVerificationModel.find({ OwnerId: data[0]._id }).then(
                    (userdata) => {
                      if (userdata.length) {
                        console.log("User Exists");
                      } else {
                        const CreateIdentity = new ProjectVerificationModel({
                          OwnerId: data[0]._id,
                        });
                        CreateIdentity.save();

                        res.redirect("/");
                      }
                    }
                  );
                } else {
                  res.render("login", {
                    message: "password is incorrect!",
                  });
                }
              })
              .catch((error) => {
                // console.log(error);
                res.render("login", {
                  message: "An error occured while comparing password",
                });
              });
          }
        } else {
          res.render("login", {
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.render("login", {
          message: "An error occured while checking for exisiting user",
        });
      });
  }
});

module.exports = {
  router,
};
