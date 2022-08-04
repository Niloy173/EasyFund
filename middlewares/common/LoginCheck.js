const jwt = require("jsonwebtoken");

const DecodeInformation = (req, res, next) => {
  const token = req.signedCookies[process.env.COOKIE_NAME];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded;

    if (res.locals.html === true) {
      res.locals.userInformation = decoded;
    }
  } catch (error) {
    // console.log("Not Logged In");

    if (res.locals.html === true) {
      res.locals.userInformation = {};
    }
  }

  next();
};

const AuthCheck = (req, res, next) => {
  // // console.log(req.headers);
  // console.log(req.cookies)
  const token = req.signedCookies[process.env.COOKIE_NAME];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decoded;

    if (res.locals.html === true) {
      res.locals.userInformation = decoded;
    }

    next();
  } catch (error) {
    // console.log("Authentication Error");
    res.redirect("/login");
  }
};

const redirectLoggedIn = function (req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    let token = cookies[process.env.COOKIE_NAME];
    if (token) {
      res.redirect("/");
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = {
  redirectLoggedIn,
  AuthCheck,
  DecodeInformation,
};
