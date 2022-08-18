const http = require("http");
const createHandler = require("github-webhook-handler");
const { execSync } = require("child_process");

const handler = createHandler({
    path: "/webhook",
    secret: "mySecretKiKoHashKey",
});

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 200;
        res.end("no such location");
    });
}).listen(7777);

handler.on("error", function (err) {
    console.error("Error:", err.message);
});

handler.on("push", function (event) {
    console.log(event);
});
