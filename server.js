const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const projectRoutes =
  require("./routes/projectRoutes");

const authRoutes =
  require("./routes/authRoutes");


const app = express();


app.use(cors());

app.use(express.json());


app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/auth",
  authRoutes
);


app.get("/", (req, res) => {

  res.json({
    message:
      "Portfolio Backend is Running"
  });

});


const PORT =
  process.env.PORT || 8000;


const startServer = async () => {

  try {

    await connectDB();

    app.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );

  } catch (error) {

    console.error(
      "Server startup failed:",
      error
    );

  }

};


startServer();