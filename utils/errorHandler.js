// utils/errorHandler.js

function errorHandler(err, req, res, next) {
    console.error("🔥 Erro capturado pelo errorHandler:", err);

    // Se já definimos um status no erro, usa ele.
    const statusCode = err.status || 500;
    const message = err.message || "Erro interno no servidor";

    res.status(statusCode).json({
        error: true,
        message
    });
}

module.exports = errorHandler;