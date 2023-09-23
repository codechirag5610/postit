const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    try {
        //  finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if password is same
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
            );
            // if it is same, login
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        }
        // else incorrect credentials
        else{
            return next({
                status: 400,
                message: "Invalid Credentials!"
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Credentials!"
        });
    }
    
}


exports.signup = async function(req, res, next){
    try {
        // create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl} = user;
        
        // create a token(signing a token)
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
         
        // process.env.SECRET_KEY
        process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch(err) {
        if (err.code === 11000) {
            err.message = "Sorry, username and/or email already taken"
        }
        return next({
            statue: 400,
            message: err.message
        });
        
        // what kind of error

        // is it certain 
        // respond userame and email already taken 
        // otherwise just send 404 
    }
}