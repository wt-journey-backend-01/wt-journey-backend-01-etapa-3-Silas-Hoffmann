function errorHandler(err, req, res, next) {
    console.error("🔥 Error handled:", err);

    const statusCode = err.status || 500;
    const message = err.message || "Erro interno no servidor";

    res.status(statusCode).json({
        error: true,
        message
    });
}

module.exports = errorHandler;