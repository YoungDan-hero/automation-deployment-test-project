import http from "http";
import createHandler from "github-webhook-handler";
const handler = createHandler({
    path: "/webhook",
    secret: "mySecretKiKoHashKey",
});

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end("no such location");
    });
}).listen(7777);

handler.on("error", function (err) {
    console.error("Error:", err.message);
});

handler.on("push", function (event) {
    console.log(
        "Received a push event for %s to %s",
        event.payload.repository.name,
        event.payload.ref
    );
});
