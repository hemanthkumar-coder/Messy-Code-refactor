const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const { port } = require("./config/envConfig");
const { connectToDb } = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "User Management System",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});
app.use("/", userRouter);

app.listen(port, async () => {
  try {
    console.log(`Server Running on http://localhost:${port}/`);
    connectToDb();
  } catch (err) {
    console.log(`Error Connecting to Server ${err.message}`);
  }
});
