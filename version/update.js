const FStream = require("fs");
const path = require("path");
const { currentVersion } = require("./info");
const writeVersion = () => {
  // 写入文件
  FStream.writeFile(
    path.join(__dirname, "../" + process.env.VUE_APP_OUT_PUT_NAME + "/static/version.json"),
    JSON.stringify({
      success: true,
      data: { version: currentVersion },
      code: 200,
      message: "版本获取成功",
    }),
    {},
    function (err) {
      if (err) throw err;
    }
  );
};

writeVersion();
