const crypto = require("crypto");
const fs = require("fs");

const path = require("path");

try{

    const keyPair = crypto.generateKeyPairSync("rsa", {

        modulusLength: 4096,

        publicKeyEncoding: {

            type: "pkcs1",
            format: "pem"
        },

        privateKeyEncoding: {

            type: "pkcs1",
            format: "pem"
        }
    });

    fs.writeFileSync(path.join(__dirname, "..", "id_rsa_pub.pem"), keyPair.publicKey);
    fs.writeFileSync(path.join(__dirname, "..", "/id_rsa_priv.pem"), keyPair.privateKey);

    console.log("\nDebug: Key-Pair Generation Successful!\n");
}

catch(error){
    console.log("\nDebug: Key-Pair Generation Failed!\n" + error + "\n");
    
}