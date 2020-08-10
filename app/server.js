const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const hospitals = require("./routes/hospitals");
const testcentres = require("./routes/testcentres");

app.use(express.json()); //returns a middleware function: reads request and if there is a json in req body, it will set req.body

app.use(cors());
app.use("/hospital", hospitals);
app.use("/testcentres", testcentres);

//Test server
app.get("/", (req, res) => {
  res.status(200).send("Backend server is running...");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
