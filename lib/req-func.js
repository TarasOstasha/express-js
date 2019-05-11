module.exports = {
    errorPage(res, error) {
        res.render('error', {
            message: error,
            error: {
                status: 500
            }
        })
    }
}
