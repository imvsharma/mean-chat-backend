var User = require('./user.dao');

exports.signup = function (req, res, next) {
    console.log('req', req.body);
    const password = req.body.password;
    User.hashpassword(password, (err, confirmPassword) => {
        if(err) {
            res.json({
                success: false,
                message: 'Error in hasing password'
            })
        }

        if(confirmPassword) {
            const data = {
                fullname: req.body.fullname,
                email: req.body.email,
                password: confirmPassword
            }

            console.log('final data', data);
            User.create(data, (err, user) => {
                if(err) {
                    res.json({
                        success: false,
                        message: "Error in saving user"
                    })
                }

                res.json({
                    success: true,
                    user: user
                })
            })
        }
    } )

}

exports.login = (req, res, next) => {
    User.getByEmail({email: req.body.email}, (err, user) => {
        console.log("user", user);
        if(err) {
            res.json({
                success: false,
                message: "Error in finding user"
            })
        }

        User.comparePassword(req.body.password, user.password, (err, isMatched) => {
            if(err) {
                res.json({
                    success: false,
                    message: "Error in comparing password"
                })
            }

            if(!isMatched) {
                res.json({
                    success: false,
                    message: "Password is incorrect"
                })
            }

            res.json({
                success: true,
                user: user,
                message: "User successfully login"
            })
        })
    })
}