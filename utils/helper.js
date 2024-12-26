// function to send a standardized error response
exports.sendError = (res, error, status = 401) => {
    res.status(status).json({ success: false, error });
  };
