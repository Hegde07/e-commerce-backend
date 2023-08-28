const express = require("express");
const cors = require("cors");
const server = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const crypto = require("crypto");
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brand");
const usersRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const { User } = require("./model/User");

//middlewares
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
   
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products",isAuth,productsRouter.router);//we can also use jwt tocken
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

//Passport Strategies
passport.use(
  new LocalStrategy(async function (username, password, done) {
    //by default passport uses username
    try {
      const user = await User.findOne({email:username}).exec();
      if (!user) {
        done(null,false,{ message: "No such user email" })
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
         if (!crypto.timingSafeEqual(user.password, hashedPassword))  {
         return done(null,false,{ message: "invalid credentials" })
          }     
           done(null,user);
        });
     
    } catch (err) {
      done(err);
    }
  })
);

//This creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log('serialize',user)
  process.nextTick(function () {
    return cb(null, {id:user.id,role:user.role});
  });
});
//This changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log('de-serialize',user)
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

function isAuth(req,res,done){
  if(req.user){
    done()
  }else{
    res.send(401)
  }
}

server.listen(8080, () => {
  console.log("server started");
});
