function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("signing out");
}

module.exports = {
  logout,
};
