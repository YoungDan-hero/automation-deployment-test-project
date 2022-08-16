const http = require("http");
const createHandler = require("github-webhook-handler");
const handler = createHandler({
    path: "/webhook",
    secret: "mySecretKiKoHashKey",
});

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 200;
        res.end("no such location");
    });

    console.log("触发了嘻嘻");
}).listen(7777);

handler.on("error", function (err) {
    console.error("Error:", err.message);
});

handler.on("push", function (event) {
    run_cmd("sh", ["./autoBuild.sh"], function (text) {
        console.log(text);
    }); // 执行autoBuild.sh
});

const run_cmd = (cmd, args, callback) => {
    const spawn = require("child_process").spawn;
    const child = spawn(cmd, args);
    const resp = "";

    child.stdout.on("data", function (buffer) {
        resp += buffer.toString();
    });

    child.stdout.on("end", function () {
        callback(resp);
    });
};
