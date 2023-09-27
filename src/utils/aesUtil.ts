/**
 * AES加密
 */
//@ts-ignore
import CryptoJS from "crypto-js";

//此处的密钥随机生成，可自行修改
const key = CryptoJS.enc.Utf8.parse("9627F8751BAC3190"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("AE14D873A093C352"); //十六位十六进制数作为密钥偏移量

//解密方法
export const Decrypt = function (val: string) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(val);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

//加密方法
export const Encrypt = function (val: string) {
  const str = CryptoJS.enc.Utf8.parse(val);
  const encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString();
};
