const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const host = "0.0.0.0";
const port = 3000;

server.listen(port, host, () => {
    console.log("\nServer Active!\nListening on port " + port + "...\n");
});