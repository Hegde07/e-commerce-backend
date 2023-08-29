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
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWQzNTY4MjVhNzlmNDlkMWNiN2E3YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MzI2NzUxMH0.01CQ4AmyPm_gQMJXdB-1GsLXC_RLBRrlf5Xf3TnnzdU"
    return token;
  };
