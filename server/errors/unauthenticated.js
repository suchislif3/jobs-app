import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApi.js";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
