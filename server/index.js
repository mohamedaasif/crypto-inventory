const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes/stocks");

app.use("/api", routes);

app.listen(3001, () => {
  console.log("Running on port 3001");
});
