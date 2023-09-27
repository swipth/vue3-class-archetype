window.onload = function () {
  // 验证浏览器版本是否 < IE8
  if (navigator.userAgent.indexOf("MSIE 8.0") > -1 || navigator.userAgent.indexOf("MSIE 7.0") > -1) {
    document.body.innerHTML = "<div style=\"color: #ffffff;text-align: center;background-color: #e6a23c;height: 37px;line-height: 37px\">" +
      "检测到您当前浏览器使用的是IE内核，自2015年3月起，微软已宣布弃用IE，且不再对IE提供任何更新维护，请" +
      "<a target=\"_blank\" style=\"color:blue\" href=\"https://www.google.cn/intl/zh-CN/chrome/\">点击此处</a>" +
      "访问Chrome官网更新浏览器，如果您使用的是双核浏览器,请您切换浏览器内核为极速模式',\n</div>";
  }
};
//  8   Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)
//  7   Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)
//  5   Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)
