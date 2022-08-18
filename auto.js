const http = require("http");
const createHandler = require("github-webhook-handler");
const { execSync } = require("child_process");
const fs = require("fs")
const path = require("path")

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

// 递归删除目录
function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            const curPath = path + "/" + file;
            console.log(curPath)
            // if(fs.statSync(curPath).isDirectory()) { // recurse
            //     deleteFolderRecursive(curPath);
            // } else { // delete file
            //     fs.unlinkSync(curPath);
            // }
        });
        // fs.rmdirSync(path);
    }
}


handler.on("push", function (event) {
    const projectDir = path.resolve()
    deleteFolderRecursive(projectDir)
    console.log(projectDir);
});
