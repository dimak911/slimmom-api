const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const session = require("express-session");

// import routers here
const usersProductsRouter = require("./routes/api/usersProducts");
const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const passport = require("passport");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    secret: "cookie_secret",
    name: "kaas",
    // store: new RedisStore({
    //   host: "127.0.0.1",
    //   port: 6379,
    // }),
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// use routers here
app.use("/api/diary", usersProductsRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
