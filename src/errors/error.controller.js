import { envs } from "../config/enviroments/enviroments.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";

const handleCastError22001 = () =>
  new AppError("value too long for type on attribute in database", 400);

const handleCastError23505 = () =>
  new AppError("Duplicate field value: please use another value", 400);

const handleCastError22P02 = () =>
  new AppError("Invalid data type in database", 400);

const handleCastError23503 = () =>
  new AppError("Invalid data type in database", 400);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please login again", 401);

const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (envs.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (envs.NODE_ENV === "production") {
    let error = err;

    if (err.parent?.code === "22001") error = handleCastError22001();
    if (err.parent?.code === "23505") error = handleCastError23505();
    if (err.parent?.code === "22P02") error = handleCastError22P02();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "23503") error = handleCastError23503();
    sendErrorProd(error, res);
  }
};