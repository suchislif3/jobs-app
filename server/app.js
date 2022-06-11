import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

// extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

// swagger
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");

import express from "express";
const app = express();

import connectDB from "./db/connect.js";
import authenticationMiddleware from "./middleware/authentication.js";

// routers
import authRouter from "./routes/auth.route.js";
import jobsRouter from "./routes/jobs.route.js";

// error handler
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Jobs-App API</h1><a href='/api-docs'>Documentation</a>"
  );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get("/ip", (req, res) => res.send(req.ip)); // for finding out the number of proxies between user and server
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

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
