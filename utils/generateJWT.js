const jsonwebtoken = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");

const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_priv.pem"), "utf8");

exports.issueJWT = function (userId){

    const _id = userId;
    const expiresIn = "1m";

    const payload = {

        sub: _id,
        iat: Date.now()
    }

    const signedJWT = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });

    return({

        token: "Bearer " + signedJWT,
        expiresIn: expiresIn
    });
}