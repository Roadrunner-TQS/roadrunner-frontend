module.exports = (req, res, next) => {
    res.header('Content-Range', 'pickUpLocation 0-20/20')
    next()
}