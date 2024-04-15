let statusCode = 404; // Declare statusCode variable

const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.OriginalURL}`);
    res.status(404);
    next(error);
}
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack,
    })
 }
module.exports = { errorHandler, notFound };