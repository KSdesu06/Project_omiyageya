 module.exports.isAdmin = (req,res, next) => {
    const {role} = req.user

    if (role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            error:{
                message: 'You are not authorized to access this resource. Only administrators are allowed to access this resource.'
            }
        })
    }
 }