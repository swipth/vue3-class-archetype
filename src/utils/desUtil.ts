// DES加密模式：CBC模式/ECB模式
//@ts-ignore
import CryptoJS from "crypto-js";
const KEY = "pb!@S@#@";
// CBC模式
// 加密
export const EncryptCBC = (text: string) => {
  // 密钥转成16进制的字符串
  const key = CryptoJS.enc.Utf8.parse(KEY);
  // 加密过程
  const encrypted = CryptoJS.DES.encrypt(text, key, {
    // iv偏移量为key值
    iv: key,
    // 模式为CBC
    mode: CryptoJS.mode.CBC,
    // DES加密padding为Pkcs7
    padding: CryptoJS.pad.Pkcs7,
  });
  // 加密返回为字符串密文(加密经过一次base64加密，结果可看结果)
  return encrypted.toString();
};

// 解密
export const DecryptCBC = (cipherText: string) => {
  const key = CryptoJS.enc.Utf8.parse(KEY);
  const decrypt = CryptoJS.DES.decrypt(cipherText, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // 解密返回转为UTF-8明文(解密也经过一次base64解密)
  return decrypt.toString(CryptoJS.enc.Utf8);
};

// ECB模式
// 加密
export const EncryptECB = (text: string) => {
  //把私钥转换成16进制的字符串
  const key = CryptoJS.enc.Utf8.parse(KEY);
  //模式为ECB padding为Pkcs7
  const encrypted = CryptoJS.DES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

// 解密
export const DecryptECB = (ciphertext: string) => {
  //把私钥转换成16进制的字符串
  const key = CryptoJS.enc.Utf8.parse(KEY);
  //把需要解密的数据从16进制字符串转换成字符byte数组
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    },
    key,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  //以utf-8的形式输出解密过后内容
  return decrypted.toString(CryptoJS.enc.Utf8);
};
