import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRouters from "./server/routers/index";
import dotenv from "dotenv";
import cors from "cors";

const result = dotenv.config();
if (result.error) {
  console.log(result.error);
}

mainRouters.all("*", cors());

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/", mainRouters);

let db_message = "database connecting";
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
    db_message = "database connected";
  })
  .catch((e) => {
    console.log(e.message);
    db_message = e.message;
  });

const port = process.env.PORT || 5035;
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcom to iCafe Api 1.0.0",
    db_status: mongoose.connection.readyState,
    db_message,
  });
});

app.listen(port, (request, response) => {
  console.log(`Server is running on port ${port}...`);
});
