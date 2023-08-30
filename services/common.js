const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWU2ZjNiNWFiNzc3YzVhOTE2NDY2MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkzMzQ3ODEyfQ.lMPYtXyHL_BwvTwsMHKsU2mrLORncJW8-gdoVcJBf8M"
    return token;
  };
