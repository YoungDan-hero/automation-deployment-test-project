import express from "express";
const app = express();
import createHandler from "github-webhook-handler";

const handler = createHandler({
    path: "/webhook",
    secret: "mySecretKiKoHashKey",
});

//接受所有请求方式
app.all("/", (request, response) => {
    //设置响应头允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    //接受所有响应头信息
    response.setHeader("Access-Control-Allow-Headers", "*");

    // handler(request, response, function (err) {

    // });

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

    console.log(1);
});

app.listen(7777, () => {
    console.log("启动");
});
