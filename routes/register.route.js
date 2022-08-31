/* require packages */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = require("url");
const fs = require("fs");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

// mongodb user model
const { User } = require("../models/UserSchema");

// mongodb user verification model
const { UserVerification } = require("../models/UserVerification");

// require nodemailer file
const { transporter } = require("../helpers/nodemailer_transporter");

//  unique uid
const { v4: uuidv4 } = require("uuid");

// password handler
const bcrypt = require("bcrypt");

// variable

/* app object */
const router = express.Router();

router.get("/", decorateHtmlResponse("register"), (req, res) => {
  res.render("register");
});

// verified page route
router.get("/verified", (req, res) => {
  res.sendFile(
    path.join(__dirname + "./../templates/views/message/confirmation.html")
  );
});

// verify email route
router.get("/verify/:userId/:uniqueString", (req, res) => {
  let { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hasheduniqueString = result[0].uniqueString;

        // checking for expired unique string
        if (expiresAt < Date.now()) {
          // record has expired so we delete it
          UserVerification.deleteOne({ userId })
            .then((result) => {
              // delete the co-responding user
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expired. Please sign up again. ";
                  // res.redirect(`/register/verified/error=true&message=${message}`);
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
                  let message =
                    "Clearing user with expired unique string failed";
                  // res.redirect(
                  //   url.format({
                  //     pathname: "/register/verified/",
                  //     query: {
                  //       error: true,
                  //       message: message,
                  //     },
                  //   })
                  // );

                  res.json({
                    message,
                  });
                });
            })
            .catch((error) => {
              // console.log(error);
              let message =
                "An error occured while clearing expired user verification record";
              // res.redirect(
              //   url.format({
              //     pathname: "/register/verified/",
              //     query: {
              //       error: true,
              //       message: message,
              //     },
              //   })
              // );

              res.json({
                message,
              });
            });
        } else {
          // valid record exits so we validate the user
          // first compare the hashed unique string

          bcrypt
            .compare(uniqueString, hasheduniqueString)
            .then((result) => {
              if (result) {
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(
                            __dirname,
                            "./../templates/views/message/confirmation.html"
                          )
                        );
                      })
                      .catch((error) => {
                        // console.log(error);
                        let message =
                          "An error occured while finalizing succssful verification.";
                        // res.redirect(
                        //   url.format({
                        //     pathname: "/register/verified/",
                        //     query: {
                        //       error: true,
                        //       message: message,
                        //     },
                        //   })
                        // );

                        res.json({
                          message,
                        });
                      });
                  })
                  .catch((error) => {
                    // console.log(error);
                    let message =
                      "An error occured while updating the user record";
                    // res.redirect(
                    //   url.format({
                    //     pathname: "/register/verified/",
                    //     query: {
                    //       error: true,
                    //       message: message,
                    //     },
                    //   })
                    // );

                    res.json({
                      message,
                    });
                  });
              } else {
                // existing record but incorrect verification details passed
                let message =
                  "Invalid verification details passed. Check your inbox.";
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
              let message = "An error occured while comparing unique strings";
              // res.redirect(
              //   url.format({
              //     pathname: "/register/verified/",
              //     query: {
              //       error: true,
              //       message: message,
              //     },
              //   })
              // );

              res.json({
                message,
              });
            });
        }
      } else {
        let message = encodeURIComponent(
          "Account record doesn't exist or has been verified already. Please sign up or log in. "
        );

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
      // console.log(error);
      let message =
        "An error occured while checkig for existing user verification record";

      res.json({
        message,
      });
    });
});

router.post("/", decorateHtmlResponse("register"), async (req, res) => {
  let { email, password, c_password } = req.body;

  if (email == "" || password == "" || c_password == "") {
    res.render("register", {
      message: "Field is empty",
    });
  } else if (email.split("@")[1] != "diu.edu.bd") {
    res.render("register", {
      message: "Invalid email address",
    });
  } else if (password.length < 8) {
    res.render("register", {
      message: "please provide at least 8 character password",
    });
  } else if (password != c_password) {
    res.render("register", {
      message: "password didn't match properly",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const SingleUser = await User.findOne({ email: email });

      if (SingleUser) {
        res.render("register", {
          message: `User already exists.please check your email`,
        });
      } else {
        const newUser = new User({
          email: email,
          password: hashedPassword,
          verified: false,
          InformationCollected: false,
          profileImage: {
            data: fs.readFileSync(
              path.join(__dirname + "/../public/images/nophoto.png")
            ),
            contentType: "png",
          },
        });

        const result = await newUser.save();

        //  console.log(result)
        sendVerificationEmail(result, res);
      }
    } catch (error) {
      // console.log(error);
      res.render("register", {
        message: "unexpected error occured",
      });
    }
  }
});

const sendVerificationEmail = ({ _id, email }, res) => {
  // url to be used in the email
  const currenturl = `${process.env.APP_URL}`;

  const uniqueString = uuidv4() + _id;

  // mail option
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `<h2> Welcome to Easy Fund </h2>
                   <p> verify your email address to complete the signup and login into your account</p>  
                   <p> This link expires in <b>1 hour </b></p>
                   <p> <a href=${
                     currenturl + "register/verify/" + _id + "/" + uniqueString
                   }> click here </a> to proceed </p>`,
  };

  // hash the unique string
  bcrypt
    .hash(uniqueString, 10)
    .then((hashedString) => {
      // set values in varification collection
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000, // changed to 1 hour
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              // Go to the page to show important message
              res.sendFile(
                path.join(
                  __dirname + "./../templates/views/message/ImportantMsg.html"
                )
              );
              console.log(`Email send to ${email}`);
            })
            .catch((error) => {
              // console.log(error);

              let message =
                "Verification email failed! Please try again later.";

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
        .catch(() => {
          res.json({
            message:
              "An error occured while saving verification email data! Please try again later.",
          });
        });
    })
    .catch(() => {
      res.json({
        message:
          "An error occured while hashing email data! Please try again later.",
      });
    });
};

module.exports = {
  router,
};
