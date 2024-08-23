const errorHandler = (error, req, res, next) => {
    res.status(500).json({ errorMessage: "Internal Server Error"})
}

module.exports = errorHandler;