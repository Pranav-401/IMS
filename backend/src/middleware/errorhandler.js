// centralized error handling

const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  // Use the error status if provided (e.g., from unique constraint check in controller)
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message || "Something Went Wrong", // Use the error's message
    error: err.message,
  });
};

export default errorHandling;
