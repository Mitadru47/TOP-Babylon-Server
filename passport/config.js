const passport = require("passport");
const User = require("../models/user");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const fs = require("fs");
const path = require("path");

const PUB_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_pub.pem"));

const options = {

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),

    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
}

passport.use("jwt", new JWTStrategy(options, async (payload, done) => {

    try{

        const user = await User.findOne({ _id: payload.sub }).exec();

        if(user)
            done(null, true);

        else
            done(null, false);
    }

    catch(error){
        done(error, false);

    }
}));

module.exports = passport;