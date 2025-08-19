function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        message: err.message || "Erro interno do servidor",
    });
}

module.exports = errorHandler;