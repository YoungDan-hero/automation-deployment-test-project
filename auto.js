import http from "http";
import createHandler from 'github-webhook-handler'
import ora from "ora";

const handler = createHandler({
    path: "/webhook",
    secret: "mySecretKiKoHashKey",
});

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 200;
        res.end("no such location");
    });

    console.log("触发了嘻嘻a");
}).listen(7777);

handler.on("error", function (err) {
    console.error("Error:", err.message);
});

handler.on("push", function (event) {
    const loading = ora("正在全力构建项目");
    loading.start();
    run_cmd("sh", ["./auto.sh"], function (text) {
        loading.start();
        console.log("自动构建成功");
    }); // 执行autoBuild.sh
});

const run_cmd = (cmd, args, callback) => {
    const spawn = require("child_process").spawn;
    const child = spawn(cmd, args);
    let resp = "";

    child.stdout.on("data", function (buffer) {
        resp += buffer.toString();
    });

    child.stdout.on("end", function () {
        callback(resp);
    });
};
