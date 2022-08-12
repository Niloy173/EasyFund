/* external package*/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal packages
const {
  NotFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorhandler");

/*---------------------------*/
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* cookie parser */
app.use(cookieParser(process.env.COOKIE_SECRET));

/* database connection */
require("./db/connection");

/* variable section */
const staticPath = path.join(__dirname, "/public/");
const templatePath = path.join(__dirname, "/templates/views/");
const port_number = process.env.PORT || 5000; // process.env working through .env file
/*--------------------------*/

/* admin route file require her */
const adminRoute = require("./routes/admin/admin.route");
const projectFromadminRoute = require("./routes/admin/singleStory.route");
const ShowingAllProjectRoute = require("./routes/admin/allProjects.route");

/* all route require object goes here */
const homeRoute = require("./routes/home.route");
const discoverRoute = require("./routes/discover.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const resetPasswordRoute = require("./routes/resetPassword.route");
const generalRoute = require("./routes/formRoute/general.route");
const coverRoute = require("./routes/formRoute/coverPicture.route");
const writeStoryRoute = require("./routes/formRoute/writeStory.route");
const previewRoute = require("./routes/formRoute/preview.route");
const userAccountRoute = require("./routes/userend/account.route");
const personalIdentityRoute = require("./routes/userend/personalIdentity.route");
const mainStoryRoute = require("./routes/mainStory/story.route");
const userProjectRoute = require("./routes/userend/userProject.route");

/* all cageory route file included here */
const BusinessRoute = require("./routes/categories/business.route");
const EngineeringRoute = require("./routes/categories/engineering.route");

/*---------------*/

/* middleware */
app.enable("case sensitive routing");
app.use(express.static(staticPath));
app.use("/article", express.static(`${__dirname}` + "/public/article/"));
app.use("/css", express.static(`${__dirname}` + "/public/css/"));
app.use("/img", express.static(`${__dirname}` + "/public/images/"));
app.use("/js", express.static(`${__dirname}` + "/public/js/"));
app.use(
  "/coverPicture",
  express.static(`${__dirname}` + "/public/coverPicture/")
);
app.use(
  "/profilePicture",
  express.static(`${__dirname}` + "/public/profilePicture/")
);
app.use(
  "/projectAttachment",
  express.static(`${__dirname}` + "/public/attachments/")
);

// for an exmaple if you want to include a css/js/image file in any particular
// ejs file then just use /css/ or /js or /img and then folder/file name ..........
// don't need to use "../../public/css" like we did before
/*-----------*/

/* view engine set up */
app.set("view engine", "ejs");
app.set("views", templatePath);
/*---------*/

/* project related routes */
app.use("/", homeRoute.router); // localhost : 3000/ => it will fetch from home.route.js and execute home.ejs
app.use("/discover", discoverRoute.router);
app.use("/register", registerRoute.router);
app.use("/login", loginRoute.router);
app.use("/resetpassword", resetPasswordRoute.router);
app.use("/general", generalRoute.router);
app.use("/cover", coverRoute.router);
app.use("/story", writeStoryRoute.router);
app.use("/preview", previewRoute.router);
app.use("/user", userAccountRoute.router);
app.use("/personal", personalIdentityRoute.router);
app.use("/project", mainStoryRoute.router);
app.use("/user-project", userProjectRoute.router);
/*-----------------*/

/* category route path goes here */
app.use("/business", BusinessRoute.router);
app.use("/engineering", EngineeringRoute.router);

/* admin route goes here */
app.use("/admin-pannel", adminRoute.router);
app.use("/admin-pannel/project", projectFromadminRoute.router);
app.use("/admin-pannel", ShowingAllProjectRoute.router);

// for the error handler
app.use(NotFoundHandler);
app.use(errorHandler);

app.listen(port_number, () => {
  console.log(`Server is listening to ${port_number}`);
});
