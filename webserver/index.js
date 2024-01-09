const express = require("express");
const cors = require("cors");

const stuffRoutes = require("./routes.js");

const app = express();

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api", stuffRoutes);

app.listen(PORT, () => {
  console.log("Server started ! http://localhost:3001");
  console.log(`Server now listening on ${PORT}`);
});
