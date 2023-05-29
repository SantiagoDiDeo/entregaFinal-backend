import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import passport from "../DB/config/auth.js";
import path from "path";
import sessionRouter from "../routes/sessionRouter.js";
import productRouter from "../routes/productRouter.js";
import cartRouter from "../routes/cartRouter.js";
import chatRouter from "../routes/chatRouter.js";
import * as url from "url";
import MongoStore from "connect-mongo";
import { mongoUrl } from "../environments/env.js";

const __dirname = url.fileURLToPath(new URL("..", import.meta.url));

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`, { extensions: ["css"] }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: mongoUrl,
    }),
    secret: "secreto1",
    cookie: {
      maxAge: 60000,
      secure: false,
    },
    resave: true,
    saveUninitialized: true,
    serverSelectionTimeoutMS: 30000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.set("views", path.join(__dirname, "views", "partials"));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    extname: ".hbs",
    defaultLayout: "main.handlebars",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

//routes
app.use("/", sessionRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/chat", chatRouter);

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/public/index.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "public", "index.js"));
});
export default app;
