require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const router = require("./router/routes");
const connectDB = require("./db/db");

app.use(express.json());
app.use("/", router);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
  });
});
