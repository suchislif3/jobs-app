import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err?.name === "ValidationError") {
    customError.statusCode = 400;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err?.name === "CastError") {
    customError.statusCode = 400;
    customError.msg = `Invalid id '${err.value}'`;
  }
  if (err?.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
