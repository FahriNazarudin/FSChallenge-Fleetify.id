function errorHandler(error, req, res, next) {
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({ message: error.errors[0].message });
    case "NotFound":
      return res.status(404).json({ message: error.message });
    default:
      return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
