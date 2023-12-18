/**
 * @description 按照一定路径规则批量导入文件
 * @param pathRule eg: pathRule =  './modules/*.ts'
 */
export const importAll = (pathRule = "./modules") => {
  const modules = {};
  const files = require.context(pathRule, false, /\.ts$/);
  files.keys().forEach((key) => {
    // @ts-ignore
    modules[key.replace(/(modules|\/|\.|js)/g, "")] = {
      ...files(key).default,
      namespaced: true,
    };
  });
  return modules
}
