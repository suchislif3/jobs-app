import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
dotenv.config();
const app = express();

// connectDB
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/auth.route.js";
import jobsRouter from "./routes/jobs.route.js";

// error handler
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

app.use(express.json());

// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
