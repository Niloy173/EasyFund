const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = require("url");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

// mongodb user model
const { User } = require("../models/UserSchema");

// mongodb user reset password model
const { ResetPassword } = require("../models/RestPassowordSchema");

// require nodemailer file
const { transporter } = require("../helpers/nodemailer_transporter");

//  unique uid
const { v4: uuidv4 } = require("uuid");

// password handler
const bcrypt = require("bcrypt");

/* app object */
const router = express.Router();

/* routes */
router.get("/", decorateHtmlResponse("reset"), (req, res) => {
  res.render("resetPassword");
});

router.get("/reset/:userId/:resetString", (req, res) => {
  let { userId, resetString } = req.params;

  ResetPassword.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        res.render("confirmResetPassword");
      } else {
        const message =
          "Password already reset recently.please try again later or send another request from forget password";

        res.redirect(
          url.format({
            pathname: "/register/verified/",
            query: {
              error: true,
              message: message,
            },
          })
        );
      }
    })
    .catch((error) => {
      res.json({
        message: "Error occured while finding reset record from database",
      });
    });
});

// Actually reset the password
router.post("/reset/:userId/:resetString", (req, res) => {
  let { password, c_password } = req.body;
  let { userId, resetString } = req.params;

  if (password != c_password) {
    res.render("confirmResetPassword", {
      message: "Password didn't match",
    });
  } else if (password.length < 8) {
    res.render("confirmResetPassword", {
      message: "Password should contain at least 8 character",
    });
  } else {
    ResetPassword.find({ userId })
      .then((result) => {
        if (result.length > 0) {
          // password reset record exists so we proceed

          const { expiresAt } = result[0];
          const hashedResetString = result[0].resetString;

          // checking for expired reset string

          if (expiresAt < Date.now()) {
            ResetPassword.deleteOne({ userId })
              .then(() => {
                const message =
                  "password reset link has been expired.Try again";
                res.redirect(
                  url.format({
                    pathname: "/register/verified/",
                    query: {
                      error: true,
                      message: message,
                    },
                  })
                );
              })
              .catch((error) => {
                // console.log(error);
                res.json({
                  message: "Deleting password reset record failed",
                });
              });
          } else {
            // password reset record hasn't been expired
            // compare the hashed reset string

            bcrypt
              .compare(resetString, hashedResetString)
              .then((result) => {
                if (result) {
                  bcrypt
                    .hash(password, 10)
                    .then((hashedNewPassword) => {
                      // update the user model
                      // go through the password and update it

                      User.updateOne(
                        { _id: userId },
                        { password: hashedNewPassword }
                      )
                        .then(() => {
                          // update completed . Now clear out the reset record.
                          ResetPassword.deleteOne({ userId })
                            .then(() => {
                              // bothe user record and reset record updated
                              console.log("Successfully reset the password");
                              res.redirect("/login"); // go back to login page
                            })
                            .catch((error) => {
                              res.json({
                                message: "Removing record faied to delete",
                              });
                            });
                        })
                        .catch((error) => {
                          const message = "Updating user password failed";

                          res.redirect(
                            url.format({
                              pathname: "/register/verified/",
                              query: {
                                error: true,
                                message: message,
                              },
                            })
                          );
                        });
                    })
                    .catch((error) => {
                      res.json({
                        message: "An error occured while hashing the password",
                      });
                    });
                } else {
                  // exitsing record but incorrect reset string
                  res.json({
                    message: "Invalid password reset details passed",
                  });
                }
              })
              .catch((error) => {
                // console.log(error);
                res.json({
                  message: "Comparing password reset strings failed",
                });
              });
          }
        } else {
          // password reset record doesn't exist
          // well this block doesn't need anymore
          // we will have to examine further for testing
          res.json({
            message: "Password already reset recently.please try again later",
          });
        }
      })
      .catch((error) => {
        res.json({
          message:
            "Checking for existing password reset record failed Due to some error",
        });
      });
  }
});

router.post("/", (req, res) => {
  let { email } = req.body;

  if (email == "") {
    res.render("resetPassword", {
      message: "Field is empty",
    });
    // }
    // else if(email.split("@")[1] != "diu.edu.bd")
    // {

    //   res.render("resetPassword",{

    //     message : "Invaild email address"
    //   })
  } else {
    User.find({ email: email })
      .then((data) => {
        if (data.length > 0) {
          // console.log(data[0])
          // user exists
          // check user has been verified
          if (!data[0].verified) {
            res.render("resetPassword", {
              message: "Email hasn't been verified yet. Check your inbox",
            });
          } else {
            // procced with email to reset password
            sendResetEmail(data[0], res);
          }
        } else {
          res.render("resetPassword", {
            message: `No account found with ${email}`,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.render("resetPassword", {
          message: "An error occured while checking the existing user",
        });
      });
  }
});

const sendResetEmail = ({ _id, email }, res) => {
  const redirectUrl = `${process.env.APP_URL}`;

  const resetString = uuidv4() + _id;

  // clear all existing reset request records
  ResetPassword.deleteMany({ userId: _id })
    .then((result) => {
      // now we send the email
      // mail option
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<h2> Welcome to Easy Fund </h2>
                          <p> Have you lost your password! Don't worry just click the link below to reset.</p>  
                          <p> This link <b>expires in 10 minute</b>.</p>
                          <p> <a href=${
                            redirectUrl +
                            "resetpassword/reset/" +
                            _id +
                            "/" +
                            resetString
                          }> click here </a> to proceed </p>`,
      };

      // hash the resetString
      bcrypt
        .hash(resetString, 10)
        .then((hashedResetString) => {
          // set values in password reset collection
          const newPasswordReset = new ResetPassword({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
          });

          newPasswordReset
            .save()
            .then(() => {
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  // reset email sent and password reset record saved
                  console.log(`Reset email send to ${email}`);
                  res.sendFile(
                    path.join(
                      __dirname,
                      "./../templates/views/message/ImportantMsg.html"
                    )
                  );
                })
                .catch((error) => {
                  // console.log(error);
                  res.render("resetPassword", {
                    message: "Password reset email Failed",
                  });
                });
            })
            .catch((error) => {
              // console.log(error);
              res.render("resetPassword", {
                message:
                  "An error occured while saving the password reset data",
              });
            });
        })
        .catch((error) => {
          // console.log(error);
          res.render("resetPassword", {
            message: "An error occured while hashing the password",
          });
        });
    })
    .catch((error) => {
      // console.log(error);
      res.render("resetPassword", {
        message: "An error occured clearing reset records failed",
      });
    });
};

module.exports = {
  router,
};
