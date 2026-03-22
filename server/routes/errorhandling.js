const handler = (err, req, res, next) => {
  // Auth errors from express-oauth2-jwt-bearer
  if (err.name === "InvalidRequestError") {
    return res.status(401).json({
      error: "invalid_request",
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "unauthorized",
      message: err.message,
    });
  }

  // Fallback for everything else
  console.error(err);
  res.status(500).json({
    error: "server_error",
    message: "Internal server error",
  });
};

export {handler};
