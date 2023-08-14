import axios from "axios";
import CryptoJS from "crypto-js";

const PUBLIC_KEY = "423034a0a7812ad6c8673356cafee359";
const PRIVATE_KEY = "84335385b2cde1ef0b3f4e69263efa13fdb4abff";

const generateHash = () => {
  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
  return {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: hash,
  };
};

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: generateHash(),
});

export default marvelApi;
