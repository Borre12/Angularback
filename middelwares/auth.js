const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
}

const isNoAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
    } else return next();
}

module.exports = {
    isAuth, isNoAuth
}
