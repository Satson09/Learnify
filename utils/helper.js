/**
// function to send a standardized error response
exports.sendError = (res, error, status = 401) => {
    res.status(status).json({ success: false, error });
  };
*/

// Function to send a standardized error response
exports.sendError = (res, message, statusCode = 500, error = null) => {
  // Log error details for debugging
  if (error) {
    console.error(`Error: ${message}`);
    console.error(error.stack || error); // Log stack trace or error details
  }

  // Send JSON response to the client
  res.status(statusCode).json({
    success: false,
    message, // Short client-facing error message
    detailedError: process.env.NODE_ENV === 'development' ? error?.message : undefined, // Detailed error in dev mode
    errorCode: error?.name || undefined, // Include error name if available
  });
};

